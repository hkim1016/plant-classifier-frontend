import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Switch, Linking, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginLeft: 10,
        marginRight: 10,
    },
    darkModeTrigger: {
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contact: {
        textAlign: 'center',
    },
    email: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linkedin: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    github: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
            {/* <View>
                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Settings</Text>
                <View style={styles.darkModeTrigger}>
                    <Text style={{ fontSize: 20 }}>Dark Mode</Text>
                    <Switch
                        trackColor={{false: 'grey', true: 'grey'}}
                        thumbColor={isEnabled ? '#3B3B3B' : 'white'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View> */}
            
            <View style={styles.contact}>
                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>Contacts</Text>
                <View style={styles.email}>
                    <Text style={{ fontSize: 15 }}>Email:</Text>
                    <Text onPress={() => Linking.openURL('mailto:hankim0827@gmail.com')}>hankim0827@gmail.com</Text>
                </View>
                <View style={styles.linkedin}>
                    <Text style={{ fontSize: 15 }}>LinkedIn:</Text>
                    <Text onPress={() => Linking.openURL('https://www.linkedin.com/in/hankim1016/')}>https://www.linkedin.com/in/hankim1016/</Text>
                </View>
                <View style={styles.github}>
                    <Text style={{ fontSize: 15 }}>GitHub:</Text>
                    <Text onPress={() => Linking.openURL('https://github.com/hkim1016')}>https://github.com/hkim1016</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings;