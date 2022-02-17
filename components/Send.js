import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity, TextInput } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview'
import "@ethersproject/shims"
import { BigNumber, ethers, providers } from 'ethers';
import React, { useState, useEffect } from 'react'
import { NativeRouter, Route } from "react-router-native";
import { Link, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';
import JWT from 'expo-jwt';
import { LinearGradient } from 'expo-linear-gradient';

const Send = ({ navigation }) => {
    const [ wallet, setWallet ] = useState("⌛");
    const [ address, setAddress ] = useState("⌛");
    const [ balance, setBalance ] = useState("⌛");
    const [ mnemonic, setMnemonic ] = useState("⌛");
    const [ recipient, setRecipient ] = useState();
    const [ amount, setAmount ] = useState();
    const [ gas, setGas ] = useState();
    const [ transactionError, setTransactionError] = useState(null);
    useEffect(() => {
        const retrieve_connect = async () => {
            const result = await SecureStore.getItemAsync("pKey");
            if (result) {
                const decoded = await JWT.decode(result, "1239SEH9S8FH9S8EFSUEFBSIUFENEIU");
                if (!decoded ) {
                    navigation.push('SignUp')
                }
                console.log(decoded);
                setAddress(decoded.address);
                setWallet(decoded.privateKey);
                setMnemonic(decoded.mnemonicPhrase);
            } else {
                navigation.push('SignUp')
            }
            const connection = new ethers.getDefaultProvider('kovan');
            // ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/aw_ATN5yoZ578XsQUVEhaevmchG9e_iT');
            const decode = await JWT.decode(result,"1239SEH9S8FH9S8EFSUEFBSIUFENEIU")
            if (!decode) {
                navigation.push('SignUp');
            }
            const wallet = new ethers.Wallet(decode.privateKey);   
            const signer = wallet.connect(connection);
            const addy = await signer.getAddress();
            const gasPrice = await connection.getGasPrice();
            setGas(gasPrice.hex)
            const balance = await signer.getBalance();
            setBalance(ethers.utils.formatEther(balance._hex));
            console.log(balance);
            setAddress(addy);
        }
        const save = async () => {
            await SecureStore.setItemAsync("key", "test 123")
        }
        console.log(save);
        save();
        retrieve_connect();
    }, [])
    const sendTransaction = async () => {
        // Reconnect here 
        const connection = await new ethers.getDefaultProvider('kovan');
        const Wallet = new ethers.Wallet(wallet); 
        const signer = await Wallet.connect(connection);
        console.log(recipient)
        const tx = {
            from: address,
            to: recipient,
            value:ethers.utils.parseUnits(amount, "ether"),
            gasPrice: gas,
            gasLimit: ethers.utils.hexlify(100000),
            nonce: connection.getTransactionCount(address, "latest")
        }
        try {
            const transaction = await signer.sendTransaction(tx);
            console.log(transaction);
        } catch (error) {
            console.log(error);
            return setTransactionError("⚠️ " + error.reason);
            console.error(error); 
        }
    }
    const copyToClipboard = () => {
        Clipboard.setString(address);
      };
      // only for beta testing.
      const copyPrivateKey = () => {
        Clipboard.setString(wallet);
      };
    return (
        <View style={styles.container}>
            <Text>{transactionError}</Text>
            <Text>Balance:</Text>
            <TouchableOpacity>
            <Text>{JSON.stringify(balance)}</Text>
            </TouchableOpacity>
            <TextInput selectTextOnFocus={true} placeholder='Recipient' style={styles.TextInput} onChangeText={newText => setRecipient(newText)} value={recipient}/>
            <TextInput selectTextOnFocus={true} placeholder='Amount' style={styles.TextInput} onChangeText={newText => setAmount(newText)} value={amount}/>
            <Text>{JSON.stringify(recipient)}</Text>
            <Text>{JSON.stringify(amount)}</Text>
            <LinearGradient colors={['#ee0979','#ff6a00']} start={[0.0, 0.0]} end={[1.0, 1.0]} style={styles.button}>
            <Text style={styles.TextCopy}  onPress={sendTransaction}> Send ETH</Text>
            </LinearGradient>
            <Link to="/Wallet">Wallet</Link>
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
    },
    TextInput: {
        width:"50%",
        textAlign: "center"
    },
    TextCopy: {
        fontSize: 17,
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
  });

export default Send
