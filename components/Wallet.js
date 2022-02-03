import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview'
import "@ethersproject/shims"
import { ethers, providers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route } from "react-router-native";
import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';
import JWT from 'expo-jwt';
import { InfuraProvider } from '@ethersproject/providers';

const Wallet = ({ navigation }) => {
    const [ wallet, setWallet ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ balance, setBalance ] = useState("");
    const [ mnemonic, setMnemonic ] = useState("");
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
            const connection = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/aw_ATN5yoZ578XsQUVEhaevmchG9e_iT');
            const decode = await JWT.decode(result,"1239SEH9S8FH9S8EFSUEFBSIUFENEIU")
            if (!decode) {
                navigation.push('SignUp');
            }
            const wallet = new ethers.Wallet(decode.privateKey);   
            const signer = wallet.connect(connection);
            const addy = await signer.getAddress();
            try {
                const balance = await signer.getBalance();
                setBalance(balance);
                console.log(balance);
            } catch (error) {
                console.log(error);
            }
            setAddress(addy);
        }
        const save = async () => {
            await SecureStore.setItemAsync("key", "test 123")
        }
        console.log(save);
        save();
        retrieve_connect();
    }, [])
    const copyToClipboard = () => {
        Clipboard.setString(address);
      };
      // only for beta testing.
      const copyPrivateKey = () => {
        Clipboard.setString(wallet);
      };
    return (
        <View style={styles.container}>
            <Text>Below is your Address.</Text>
            <TouchableOpacity onPress={copyToClipboard}>
            <Text>{JSON.stringify(address)}</Text>
            </TouchableOpacity>
            <Text>Below is your PrivateKey</Text>
            <TouchableOpacity onPress={copyPrivateKey}>
            <Text>{JSON.stringify(wallet)}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text>{JSON.stringify(mnemonic)}</Text>
            </TouchableOpacity>
            <Link to="/LogOut">Delete Token</Link>
            <Button onPress={copyToClipboard} title='Copy Addy' />
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
    text: {
        color: 'red',
    }
  });

export default Wallet
