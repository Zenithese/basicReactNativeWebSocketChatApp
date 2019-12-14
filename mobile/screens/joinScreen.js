import React, { useState } from 'react';
import { View, Button, TextInput, Image, Platform, KeyboardAvoidingView } from 'react-native';

export default function JoinScreen({ joinChat }) {
    const [username, setUsername] = useState("");
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Image style={{ flex: 1 }} resizeMode="contain" source={require("../assets/chat-icon.png")} />
            <View style={{ flex: 1, justifyContent: "space-around" }}>
                <TextInput 
                    onChangeText={text => setUsername(text)}
                    style={{ fontSize: 20, textAlign: "center" }}
                    value={username}
                    placeholder="enter username" 
                />
                <Button title="join chat" onPress={() => joinChat(username)}/>
            </View>
            {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
        </View>
    )
}