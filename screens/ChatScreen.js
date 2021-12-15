import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'


const ChatScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Chat Screen y</Text>
            <Button 
                title="Go to Home Screen"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}

export default ChatScreen
