import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity, Modal, Pressable, Share } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview'
import "@ethersproject/shims"
import { BigNumber, ethers, providers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route } from "react-router-native";
import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';
import JWT from 'expo-jwt';
import * as Haptics from 'expo-haptics';
import { Copy } from "react-native-feather";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LogOut from './LogOut'
import Send from './Send'


const Wallet = ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();
    const [ wallet, setWallet ] = useState("⌛");
    const [ address, setAddress ] = useState("⌛");
    const [ balance, setBalance ] = useState("⌛");
    const [ mnemonic, setMnemonic ] = useState("⌛");
    useEffect(() => {
        const retrieve_connect = async () => {
            const result = await SecureStore.getItemAsync("pKey");
            if (result) {
                const decoded = await JWT.decode(result, "1239SEH9S8FH9S8EFSUEFBSIUFENEIU");
                if (!decoded ) {
                    navigation.push('SignUp')
                }
                console.log(decoded);
                setAddress(decoded.address);
                setWallet(decoded.privateKey);
                setMnemonic(decoded.mnemonicPhrase);
            } else {
                navigation.push('SignUp')
            }
            const connection = new ethers.getDefaultProvider('kovan');
            // ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/aw_ATN5yoZ578XsQUVEhaevmchG9e_iT');
            const decode = await JWT.decode(result,"1239SEH9S8FH9S8EFSUEFBSIUFENEIU")
            if (!decode) {
                navigation.push('SignUp');
            }
            const wallet = new ethers.Wallet(decode.privateKey);   
            const signer = wallet.connect(connection);
            const addy = await signer.getAddress();
            const balance = await signer.getBalance();
            setBalance(ethers.utils.formatEther(balance._hex));
            setAddress(addy);
        }
        const save = async () => {
            await SecureStore.setItemAsync("key", "test 123")
        }
        save();
        retrieve_connect();
    }, [])
    const copyToClipboard = () => {
        Clipboard.setString(address);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      };
      // only for beta testing.
      const copyPrivateKey = () => {
        Clipboard.setString(wallet);
      };
      // Share Button
      const onShare = async () => {
        try {
          const result = await Share.share({message:address});
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    return (
        <View style={styles.container}>
            {/* <Text>Below is your Address.</Text> */}
                <Button onPress={copyToClipboard} title={`${address.substring(0, 15)}..`} />
                <TouchableOpacity>
                <Text style={styles.TextCopy}  onPress={onShare}><Copy /> Share Address </Text>
                </TouchableOpacity>
            {/* <Text>Below is your PrivateKey</Text>
            <TouchableOpacity onPress={copyPrivateKey}>
            <Text>{JSON.stringify(wallet)}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text>{JSON.stringify(mnemonic)}</Text>
            </TouchableOpacity> */}
            <Text>Balance:</Text>
            <TouchableOpacity>
            <Text>{balance} ETH </Text>
            </TouchableOpacity>
            <Link to="/LogOut">Delete Token</Link>
            <Link to="/Send">Send</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextCopy: {
        fontSize: 20
    },
    text: {
        color: 'red',
    },
    address: {
        color: 'blue',
        fontWeight:"bold"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
  });

export default Wallet
