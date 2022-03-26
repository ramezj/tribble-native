import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity, Modal, Pressable, Share, FlatList, Linking, ScrollView } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import { Touchable } from 'react-native-web';


const Wallet = ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();
    const [ wallet, setWallet ] = useState("⌛");
    const [ address, setAddress ] = useState("⌛");
    const [ balance, setBalance ] = useState("⌛");
    const [ mnemonic, setMnemonic ] = useState("⌛");
    const [ transactions, setTransactions ] = useState();
    const [ transactionTrue, setTransactionTrue ] = useState(false);
    console.log(transactions)
    useEffect(async () => {
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
            const response = await fetch(`https://api-kovan.etherscan.io/api?module=account&action=txlist&address=${addy}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=2KQ9YKPQ1VG4E5FE4PUG7E5CHJWIVK2D43`)
            const res = await response.json();
            const transactions = await res.result;
            setTransactions(res.result)
            setTransactionTrue(true);
            console.log(transactions);
            console.log(transactionTrue)
            setBalance(ethers.utils.formatEther(balance._hex));
            setAddress(addy);
        }
        const save = async () => {
            await SecureStore.setItemAsync("key", "test 123")
        }
        save();
        console.log(address);
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
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
            {/* <Text>Below is your PrivateKey</Text>
            <TouchableOpacity onPress={copyPrivateKey}>
            <Text>{JSON.stringify(wallet)}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text>{JSON.stringify(mnemonic)}</Text>
            </TouchableOpacity> */}
            {/* <View style={styles.thirdContainer}>
            <Button style={styles.ButtonText} onPress={copyToClipboard} title={`${address.substring(0, 15)}..`} />
            <Text>Balance:</Text>
            <TouchableOpacity>
            <Text>{balance} ETH </Text>
            </TouchableOpacity>
            <Link to="/LogOut">Delete Token</Link>
            <Link to="/Send">Send</Link> */}
            {/* { transactions.map(transaction => <Text key={transaction}>{transaction.hash}</Text>)} */}
            {/* <Link to={`https://kovan.etherscan.io/tx/${transaction.hash}`}>{transaction.hash}</Link> */}
            {/* </View>
            <View style={styles.fourthContainer}>
            <TouchableOpacity  onPress={onShare}>
            <LinearGradient colors={['#ee0979','#ff6a00']} start={[0.0, 0.0]} end={[1.0, 1.0]} style={styles.button}>
            <Text style={styles.TextCopy}>Share Address </Text>
            </LinearGradient>
            </TouchableOpacity>
            </View> */}
            <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
    <View style={styles.topView}> 
     <Text>{"\n"}</Text>
     <Text>{"\n"}</Text>
      <Button style={styles.ButtonText} onPress={copyToClipboard} title={`${address.substring(0, 4)}..${address.slice(-5)}`} />
      <Text>Balance:</Text>
            <TouchableOpacity>
            <Text>{balance} ETH </Text>
            </TouchableOpacity>
            <Link to="/LogOut">Delete Token</Link>
            <Link to="/Send">Send</Link>
      </View>
      <View style={styles.middleView}> 
      <Text style={styles.middleViewTopText}>Transactions:</Text>
      <ScrollView style={styles.scrollView}>
            <Text>{transactionTrue}</Text>
            {transactionTrue ? <Text>{transactions.map(transaction =><Text key={transaction.hash}><TouchableOpacity ><Text onPress={() => Linking.openURL(`https://kovan.etherscan.io/tx/${transaction.hash}`)}>{transaction.hash}</Text></TouchableOpacity></Text>)}</Text> : <Text>Loading Transactions.</Text>}
            </ScrollView>
      </View>
      <View style={styles.bottomView}>
      <TouchableOpacity style={styles.touchableButton}>
            <LinearGradient colors={['#ee0979','#ff6a00']} start={[0.0, 0.0]} end={[1.0, 1.0]} style={styles.button}>
            <Text style={styles.TextCopy}><Link to="/Send">Send</Link></Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableButton}  onPress={onShare}>
            <LinearGradient colors={['#ee0979','#ff6a00']} start={[0.0, 0.0]} end={[1.0, 1.0]} style={styles.button}>
            <Text style={styles.TextCopy}>Recieve</Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      alignContent: "center",
      width:"100%"
    },
    topView: {
      flex: 2.5,
      backgroundColor: "white",
      textAlign: "center",
      alignItems: "center",
      alignContent: "center"
    },
    middleView: {
      flex: 3,
      backgroundColor: "darkorange"
    },
    bottomView: {
      flex: 2, 
      flexDirection:'row',
      backgroundColor: "#10041c", 
      alignContent:"center",
      textAlign: "center",
      alignContent: "center",
      justifyContent:"center",
    },
    touchableButton: {
      width:"45%",
      fontWeight: "bold"
    },
    middleViewTopText: {
      fontWeight:"bold",
      fontSize:25,
      alignContent:"center",
      textAlign: "center",
      alignItems: "center",
      alignContent: "center"
    },
    ButtonText: {
      fontWeight:"bold"
    },
    TextCopy: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
      button: {
        marginHorizontal:10,
        marginTop:100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        textAlign: "center",
      alignItems: "center",
      alignContent: "center",
      fontWeight: "bold"
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
      }
  });

export default Wallet
