import React from 'react';
import { View, Text } from 'react-native';
import { NativeModules, Platform } from 'react-native'
var Aes = NativeModules.Aes

const ChatScreen = () => {
const text = '40';
const key = '591825e3a4f2c9b8f73eb963c77ad160d4802ad7aadc179b066275bcb9d9cfd2';
const iv = '0123456789abcdef0123456789abcdef';
const encryptData = (text, key) => {
        return Aes.encrypt(text, key, iv).then(cipher => ({
            cipher,
            iv,
        }))
    
}
 
const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)
 
try {
        encryptData(text, key)
            .then(({ cipher, iv }) => {
                console.log('Encrypted:', cipher)
 
                decryptData({ cipher, iv }, key)
                    .then(text => {
                        console.log('Decrypted:', text)
                    })
                    .catch(error => {
                        console.log(error)
                    })
 
            })
            .catch(error => {
                console.log(error)
            })
} catch (e) {
    console.error(e)
}
    return(
        <View>
            <Text>Apaaa</Text>
        </View>
    )
}

export default ChatScreen;