import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from "socket.io-client";

export default function HomeScreen() {
    const [messageToSend, setMessageToSend] = useState("");
    const [receiveMessages, setReceiveMessages] = useState([]);
    const socket = useRef(null);

    useEffect(function () {
        socket.current = io("http://192.168.1.5:3000")
        socket.current.on("message", message => {
            setReceiveMessages(prevState => [...prevState, message]);
        })
    }, [])

    const sendMessage = () => {
        socket.current.emit("message", messageToSend);
        setMessageToSend("")
    }

    const receievedMessageStream = receiveMessages.map(msg => (
        <Text key={msg}>{msg}</Text>
    ));

    return (
        <View style={styles.container}>
            {receievedMessageStream}
            <TextInput 
                value={messageToSend}
                onChangeText={text => setMessageToSend(text)} 
                placeholder="say something..." 
                onSubmitEditing={sendMessage}
            />
        </View>
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
