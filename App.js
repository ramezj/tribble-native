import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { WebView } from 'react-native-webview'
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import SignUp from './components/SignUp'
import Home from './components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
//   const [ wallet, setWallet ] = useState();
//   const [ privateKey, setPrivateKey ] = useState();
//   const [ isLoggedIn, setIsLoggedIn ] = useState();
//   useEffect(async () => {
//     const checkStorage = await AsyncStorage.getItem('privateKeyETH');
//     console.log(checkStorage);
//     setIsLoggedIn(checkStorage)

//   }, [])
//   const createWallet = async () => {
//     const account = await new ethers.Wallet.createRandom();
//     console.log(account);
//     setPrivateKey(account.privateKey)
//     setWallet(account)
//     console.log(privateKey)
//     const setPrivateKeyStorage = await AsyncStorage.setItem('privateKeyETH', privateKey)
//     const getStorage = await AsyncStorage.getItem('privateKeyETH');
//     console.log(getStorage);
// }
//   if ( !isLoggedIn ) {
//     return (
//       <View style={styles.container}>
//       <Text>Open up App.js to start working on your app :D</Text>
//       <Button title="Hello world!" onPress={createWallet}> </Button>
//       <Text>{JSON.stringify(wallet)}</Text>
//       <Text>{JSON.stringify(privateKey)}</Text>
//       {/* <Text>{wallet.privateKey}</Text> */}
//       <StatusBar style="auto" />
//     </View>
//     )
//   }
      const Stack = createNativeStackNavigator();
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
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
