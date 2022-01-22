import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route } from "react-router-native";
import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

const Wallet = () => {
    const [ wallet, setWallet ] = useState("");
    useEffect(() => {
        const retrieve = async () => {
            const result = await SecureStore.getItemAsync("pKey");
            if (result) {
                setWallet(result);
            } else {
                navigation.push('SignUp')
            }
        }
        const save = async () => {
            await SecureStore.setItemAsync("key", "test 123")
        }
        console.log(save);
        save();
        retrieve();
    }, [])
    return (
        <View style={styles.container}>
            <Text>Below is your privateKey.</Text>
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
