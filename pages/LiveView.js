import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Button, Text, Image, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        // justifyContent: 'flex-end',
        // width: '100%',
        // height: Dimensions.get("window").height,
        // justifyContent: 'center',
        // borderWidth: 2,
        borderColor: 'black'
    },
    camera: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 64,
        marginBottom: 20
    },
    button: {
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    plantText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgba(22, 22, 22, 0.9)',
        padding: 3,
        borderRadius: 5,
        borderWidth: 5,
        borderColor: 'rgba(22, 22, 22, 0.1)',
        width: 'auto',
        overflow: 'hidden',
        marginBottom: 20
    },
    liveview: {
        flex: 1,
    },
    capturedImage: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

const LiveView = () => {
    const [image, setImage] = useState(null);
    const [plantType, setPlantType] = useState('');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        console.log(permission)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </SafeAreaView>
        );
    }

    const analyzePlant = async (image, imageUri, imageType) => {
        console.log(123, image)
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
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'ngrok-skip-browser-warning': 'true'
            },
            data: formData,
        };
        const apiUrl = 'http://54.215.26.238/plant_analysis';

        try {
            // await axios.get('http://54.215.26.238');

            const response = await axios.post(apiUrl, formData, requestOptions);
            console.log(response.data);
            const plantType = response.data['PlantType'];
            setPlantType(plantType);
            console.log('Plant Type: ', plantType);
        } catch (err) {
            console.error('ERROR', err)
        }
    }

    const handleCameraStream = async () => {
        if (cameraRef !== null) {
            const image = await cameraRef.takePictureAsync({ quality: 1 });
            const uri = image['uri'];
            const splitUri = uri.split('.');
            const imageType = splitUri[splitUri.length - 1];

            console.log(image);
            setPlantType('Loading Plant Type...')
            setImage(image)
            await analyzePlant(image, uri, imageType)
        } else {
            console.error('Camera Ref is null')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.liveview}>
                {!image && <Camera
                    style={styles.camera}
                    type={CameraType.back}
                    ref={(ref) => setCameraRef(ref)} >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={async () => {handleCameraStream()}}>
                            <Text style={styles.text}>Analyze</Text>
                        </TouchableOpacity>
                        {/* {plantType && <Text style={styles.plantText}>{plantType}</Text>} */}
                    </View>
                </Camera> }
                {image && <View style={styles.capturedImage}>
                        <ImageBackground style={styles.imageBackground} source={{ uri: image['uri'] }} >
                            <TouchableOpacity style={styles.button} onPress={async () => {setImage(null)}}>
                                <Text style={styles.text}>Take Another Picture</Text>
                            </TouchableOpacity>
                            <Text style={styles.plantText}>{plantType}</Text>
                        </ImageBackground>
                </View> }
            </View>
        </View>
    )
}

export default LiveView;