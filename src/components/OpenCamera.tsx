import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import CustomText from "./CustomText";
import { useAppDispatch } from "../store/store";
import { saveTicket } from "../reducers/ticketPictureSclice";

const { width, height } = Dimensions.get('window');

export default function OpenCamera({ route }: any) {
    const { type } = route.params;
    const navigation = useNavigation() as any;
    const cameraRef = useRef(null)
    const dispatch = useAppDispatch();

    const takePictue = async () => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync()
                // console.log('data picture: ', data.uri)
                if (data.uri) {
                    dispatch(saveTicket({ type: type, uri: data.uri }))
                    navigation.goBack()
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    return (
        <RNCamera
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            style={{ flex: 1 }}
            captureAudio={false}
            androidCameraPermissionOptions={{
                title: 'Quyền truy cập camera',
                message: 'App cần quyền truy cập camera',
                buttonPositive: 'Đồng ý',
                buttonNegative: 'Từ chối'
            }}
        >
            {({ status }) => {
                if (status !== 'READY') return <CustomText>...Đang tải Camera</CustomText>

                return (
                    <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                        <View style={{ width: width, height: (height / 2) - 150, backgroundColor: '#00000090' }} />
                        <View style={{ width: width, height: (height / 2) - 150, backgroundColor: '#00000090' }} />
                        <View style={{ position: 'absolute', bottom: '10%', width: 70, height: 70, borderRadius: 9999, borderWidth: 4, borderColor: '#fff', padding: 4 }}>
                            <TouchableOpacity onPress={() => takePictue()} style={{ borderRadius: 9999, width: '100%', height: '100%', backgroundColor: '#fff' }} />
                        </View>
                    </View>
                )
            }
            }
        </RNCamera>
    )
}