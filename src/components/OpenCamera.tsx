import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import CustomText from "./CustomText";
import { useAppDispatch } from "../store/store";
import { changeMyTicket, changeTicket, saveTicket } from "../store/slices/ticketInforSclice";

const { width, height } = Dimensions.get('window');

export default function OpenCamera({ route }: any) {
    const { type, saveTo, index, action } = route.params;
    const navigation = useNavigation() as any;
    const cameraRef = useRef<RNCamera | null>(null)
    const dispatch = useAppDispatch();
    console.log('type: ', type);

    const takePictue = async () => {
        if (cameraRef.current) {
            if (type === 'camera') {
                try {
                    const data = await cameraRef.current.takePictureAsync();
                    // console.log('data picture: ', data.uri)

                    // thay đổi ảnh ticket của người đi kèm
                    if (action === 'changeTicket') {
                        dispatch(changeTicket({ index: index, uri: data.uri }));
                        navigation.goBack();
                        return;
                    }

                    // thay đổi ảnh ticket của mình
                    if (action === 'changeMyTicket') {
                        dispatch(changeMyTicket({ uri: data.uri }));
                        navigation.goBack();
                        return;
                    }

                    // chụp ảnh ticket
                    if (data.uri) {
                        dispatch(saveTicket({ type: type, saveTo: saveTo, uri: data.uri }));
                        navigation.goBack();
                        return;
                    }
                } catch (error) {
                    console.warn(error)
                }
            }
        }
    }

    const handleOnBarCodeRead = ({ data }: any) => {
        console.log('data: ', data)
        // dispatch(handleBarCodeRead(data));
        navigation.goBack()
    }

    if (type === 'camera') {
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
                    if (status !== 'READY') {
                        return <CustomText>...Đang tải Camera</CustomText>
                    }
                    return (
                        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                            <View style={{ width: width, height: (height / 2) - 150, backgroundColor: '#00000090' }} />
                            <View style={{ width: width, height: (height / 2) - 150, backgroundColor: '#00000090' }} />
                            <View style={{ position: 'absolute', bottom: '10%', width: 70, height: 70, borderRadius: 9999, borderWidth: 4, borderColor: '#fff', padding: 4 }}>
                                <TouchableOpacity onPress={() => takePictue()} style={{ borderRadius: 9999, width: '100%', height: '100%', backgroundColor: '#fff' }} />
                            </View>
                        </View>
                    )
                }}
            </RNCamera>
        )
    }

    if (type === 'qr') {
        return (
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#000000' }}>
                <CustomText style={{ position: 'absolute', top: '10%', color: '#fff', fontSize: 16, fontWeight: '700' }}>Quét mã QR Ecode của khách hàng</CustomText>
                <RNCamera
                    ref={cameraRef}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    onBarCodeRead={handleOnBarCodeRead}
                    style={{ width: width * 0.5, backgroundColor: '#00000090' }}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Quyền truy cập camera',
                        message: 'App càn quyền truy cập camera',
                        buttonPositive: 'Đồng ý',
                        buttonNegative: 'Từ chối'
                    }}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                >
                    {({ status }) => {
                        if (status !== 'READY') {
                            return <CustomText>...Đang tải Camera</CustomText>
                        }
                        return (
                            <View style={{ backgroundColor: 'transparent', height: height * 0.5 }} />
                        )
                    }}
                </RNCamera>
            </View>
        )
    }

}