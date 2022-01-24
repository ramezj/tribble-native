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

const LogOut = ({ navigation }) => {
    const [ wallet, setWallet ] = useState("");
    useEffect(() => {
        const checkKey = async () => {
            const check = await SecureStore.getItemAsync("pKey");
            if (!check || check == null ) {
                navigation.navigate("SignUp")
            } 
        }
    }, [])
    const deleteToken = async () => {
        try {
            const deleteT = await SecureStore.deleteItemAsync("pKey");
            navigation.push('SignUp')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <Text>Delete Token</Text>
            <Button title="Delete Token" onPress={deleteToken} />
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

export default LogOut
