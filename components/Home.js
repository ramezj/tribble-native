import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route, Outlet, Link } from "react-router-native";

const Home = () => {
    return (
        <View>
             <Link to="/signup"><View/>tests</Link>
        </View>
    )
}

export default Home
