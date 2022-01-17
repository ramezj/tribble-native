import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route, Link } from "react-router-native";


const SignUp = () => {
    return (
        <View>
            <Text>Hello from SignUp component..</Text>
        </View>
    )
}

export default SignUp
