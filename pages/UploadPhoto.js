import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
})

const UploadPhoto = () => {
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState('');
    const [imageType, setImageType] = useState('');
    const [plantType, setPlantType] = useState('');
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const requestMediaLibraryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            return <Text>Permission required. Please grant permission to access your photo library.</Text>;
        }

        setMediaLibraryPermission(status === 'granted');
        console.log(mediaLibraryPermission, 'need permission')
    };

    if(!permission) {
        return <SafeAreaView />;
    }

    if (!permission.granted) {
        console.log(permission)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to access your photo library</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </SafeAreaView>
        );
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result.assets);

        if (result.assets !== null) {
            setImage(result.assets);

            const uri = result.assets[0].uri;
            const splitUri = uri.split('.');
            const imageType = splitUri[splitUri.length - 1];
            
            setImageUri(uri);
            setImageType(imageType)
        }
    };

    const analyzePlant = async () => {
        console.log(image)
        const formData = new FormData()
        formData.append(
            'file',
            {
                uri: imageUri,
                name: `plantPhoto.${imageType}`,
                type: `${imageType}`
            }
        );
        const requestOptions = {
            uri: 'https://0906-2603-8001-313e-c055-3c29-2277-9d66-64aa.ngrok-free.app/plant_analysis',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'ngrok-skip-browser-warning': 'true'
            },
            data: formData,
        };
        // change ip before '/plant_analysis' from the one recieved from running plant-classifier-backend
        const apiUrl = 'http://54.215.26.238/plant_analysis';

        try {
            const response = await axios.post(apiUrl, formData, requestOptions);
            console.log(response.data)
            const plantType = response.data['PlantType']
            setPlantType(plantType)
            console.log('Plant Type: ', plantType);
        } catch (err) {
            console.error('ERROR', err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.choosePhoto}>
                {image && <Button
                    title='Remove Photo'
                    onPress = {() => {setImage(null); setPlantType('')}}
                />}
                <Button
                    title='Choose Photo'
                    onPress = {() => {setPlantType(''); pickImage()}}
                />
                {image && <Image source={{ uri: image[0].uri }} style={{ width: '100%', height: 300, borderWidth: 2 }} />}
                {image && <Button
                    title='Analyze Plant'
                    onPress = {() => {setPlantType('Loading Plant Type...'); analyzePlant()}}
                />}
                {plantType && <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Plant Type: {plantType}</Text> }
            </View>
        </SafeAreaView>
    )
}

export default UploadPhoto;