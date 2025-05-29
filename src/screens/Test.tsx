import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";

export default function Test() {
    const cameraRef = useRef(null)
    return (
        <RNCamera
            ref={cameraRef}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
                title: 'Quyền truy cập camera',
                message: 'App cần quyền truy cập camera',
                buttonPositive: 'Đồng ý',
                buttonNegative: 'Từ chối'
            }}
        >
            {({ status }) => {
                if (status !== 'READY') return <Text>...Đang tải camera</Text>
                return (
                    <View style={styles.captureContainer}>
                        <TouchableOpacity onPress={() => console.log('press camera')} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}> CHỤP ẢNH </Text>
                        </TouchableOpacity>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
})