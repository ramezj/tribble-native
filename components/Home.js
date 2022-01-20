import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { Link } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


const Home = () => {
    const [ value, setValue ] = useState();
    const retrieve = async () => {
        const result = await SecureStore.getItemAsync("key");
        if (result) {
            alert(result)
            setValue(result)
        } else {
            alert("no result found..")
            setValue('User should be redirected to the signup route.')
        }
    }
    useEffect(() => {
        const retrieve = async () => {
            const result = await SecureStore.getItemAsync("key");
            if (result) {
                alert(result)
                setValue(result)
            } else {
                alert("no result found..")
                setValue('User should be redirected to the signup route.')
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
            <Button title="retrieve key" onPress={retrieve}/>
            <Text>{value}</Text>
            <Text style={styles.text}>WelcomePage ( check for private key )</Text>
            <Link to="/SignUp">SignUp</Link>
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
