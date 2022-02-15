import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Wallet from './components/Wallet'
import LogOut from './components/LogOut'
import Send from './components/Send'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function App() {
      const Tab = createMaterialTopTabNavigator();
      const Stack = createNativeStackNavigator();
      const [ isSignedIn, setIsSignedIn ] = useState(false);
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false,
    swipeEnabled:true
  }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="LogOut" component={LogOut} />
        <Stack.Screen name="Send" component={Send} />
      </Stack.Navigator>
    </NavigationContainer>
  // <NavigationContainer>
  // <Tab.Navigator initialRoute="Home">
  //   <Tab.Screen name="Home" component={Home} />
  //   <Tab.Screen name="SignUp" component={SignUp} />
  //   <Tab.Screen name="Wallet" component={Wallet} />
  //   <Tab.Screen name="LogOut" component={LogOut} />
  //   <Tab.Screen name="Send" component={Send} />
  // </Tab.Navigator>
  // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
