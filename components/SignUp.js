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
import * as Crypto from 'expo-crypto';
import JWT from 'expo-jwt';


const SignUp = ({ navigation }) => {
    const [ wallet, setWallet ] = useState();
    const [ error, setError ] = useState();
    const createWallet = async () => {
        try {
        const wallet = await new ethers.Wallet.createRandom();
        const pKey = wallet.privateKey;
        const Wallet = await { 
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonicPhrase: wallet.mnemonic.phrase
        }
        // Encrypt Wallet with JWT
        const encoded = await JWT.encode(Wallet, "1239SEH9S8FH9S8EFSUEFBSIUFENEIU");
        const setSecureStore = await SecureStore.setItemAsync("pKey", encoded);
        setWallet(wallet);
        navigation.push('Wallet')
        } catch (error) {
            console.log(error);
            setError(error);
        }
        // const setSecureMnemonicPhrase = await SecureStore.setItemAsync("mnemonicPhrase", mnemonicPhrase)
    }
    return (
        <View style={styles.container}>
            <Button title='Create Wallet' onPress={createWallet}/>
            <Text>{JSON.stringify(wallet)}</Text>
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

export default SignUp
