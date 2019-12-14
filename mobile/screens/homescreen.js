import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import io from "socket.io-client";
import { GiftedChat } from 'react-native-gifted-chat';
import JoinScreen from './joinScreen';

export default function HomeScreen() {
    const [receiveMessages, setReceiveMessages] = useState([]);
    const [hasJoined, setHasJoined] = useState(false);
    const socket = useRef(null);

    useEffect(function () {
        socket.current = io("http://192.168.1.3:3000")
        socket.current.on("message", message => {
            setReceiveMessages(prevState => GiftedChat.append(prevState, message));
        })
    }, [])

    const onSend = messages => {
        socket.current.emit("message", messages[0].text);
        setReceiveMessages(prevState => GiftedChat.append(prevState, messages))
    }

    const joinChat = username => {
        socket.current.emit("join", username);
        setHasJoined(true);
    }

    return (
        <View style={{flex: 1}}>
            {hasJoined ? 
            (<GiftedChat
                renderUsernameOnMessage
                messages={receiveMessages}
                onSend={messages => onSend(messages)}
                user={{_id: 1}}
            />
            ) : (
                <JoinScreen joinChat={joinChat}/>
            )}
            {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
        </View>
    );
}