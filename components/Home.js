import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';


const Home = ({ navigation }) => {
    const [ value, setValue ] = useState();
    useEffect(() => {
        const retrieve = async () => {
            const result = await SecureStore.getItemAsync("pKey");
            if (result) {
                navigation.push('Wallet')
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
            <Text>{value}</Text>
            <Text style={styles.text}>Logo Goes Here.</Text>
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
        color: 'black',
        fontWeight: '800'
    }
  });

export default Home
