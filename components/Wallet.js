import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route } from "react-router-native";
import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

const Wallet = () => {
    const [ wallet, setWallet ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ balance, setBalance ] = useState("");
    useEffect(() => {
        const retrieve_connect = async () => {
            const result = await SecureStore.getItemAsync("pKey");
            if (result) {
                setWallet(result);
            } else {
                navigation.push('SignUp')
            }
            const connection = new ethers.getDefaultProvider('homestead');
            const wallet = new ethers.Wallet(result);   
            const signer = wallet.connect(connection);
            const addy = await signer.getAddress();
            setAddress(addy);
        }
        const save = async () => {
            await SecureStore.setItemAsync("key", "test 123")
        }
        console.log(save);
        save();
        retrieve_connect();
    }, [])
    return (
        <View style={styles.container}>
            <Text>Below is your Address.</Text>
            <Text>{JSON.stringify(address)}</Text>
            <Text>Below is your PrivateKey</Text>
            <Text>{JSON.stringify(wallet)}</Text>
            <Link to="/LogOut">Delete Token</Link>
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
