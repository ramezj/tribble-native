import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route } from "react-router-native";
import { Link } from '@react-navigation/native';


const Wallet = () => {
    return (
        <View style={styles.container}>
            <Text>Hello from Wallet component..</Text>
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
