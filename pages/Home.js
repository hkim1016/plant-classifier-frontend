import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Linking} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hyperlink: {
        color: 'blue'
    },
    projectName: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.projectName}>
                    Plant Classifier
                </Text>
                <Text>
                    By Han Kim
                </Text>
                <Text>
                    Dataset Obtained From <Text style={styles.hyperlink} onPress={() => Linking.openURL('https://plantnet.org/en/2021/03/30/a-plntnet-dataset-for-machine-learning-researchers/')}>Here</Text>
                </Text>
                <Text>
                    Trained Model (ResNet18, Weights=IMAGENET1K_V1) Through Transfer Learning With Pytorch
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Home;