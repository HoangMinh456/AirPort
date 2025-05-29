import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";

export default function Test() {
    const navigation = useNavigation();
    const cameraRef = useRef(null)

    const handleBarCordRead = ({ data, type }) => {
        console.log('QR code data: ', data)
        console.log('QR code type: ', type)
        if (data !== undefined && type !== undefined) {
            navigation.goBack();
        }
    }

    return (
        <RNCamera
            ref={cameraRef}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}
            onBarCodeRead={handleBarCordRead}
            androidCameraPermissionOptions={{
                title: 'Quyền truy cập camera',
                message: 'App cần quyền truy cập camera',
                buttonPositive: 'Đồng ý',
                buttonNegative: 'Từ chối'
            }}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >
            {({ status }) => {
                if (status !== 'READY') return <Text>...Đang tải camera</Text>
                return (
                    <View style={styles.overlay}>
                        <Text style={styles.scanText}>Quét mã QR...</Text>
                    </View>
                )
            }}
        </RNCamera>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        // backgroundColor: '#00000050',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    scanText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
    },
})