import React from 'react';
import {SafeAreaView, StyleSheet, View, Button, Text, TextInput, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderWidth: 5
    },
    profileInfo: {
        borderWidth: 5,
    }
})

const Authentication = () => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.profileInfo}>
                    <TextInput
                        placeholder='Email Address'
                    />
                    <TextInput
                        placeholder='Password'
                    />
                    <Button
                        title='Login'
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Authentication;