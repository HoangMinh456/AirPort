import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import useNotifi from "../hooks/useNotifi";
import { sendOTP, verifyOTP } from "../store/thunks/authThunk";
import { setNewEmail } from "../store/slices/authSlice";

const { width, height } = Dimensions.get('window');

export default function EnterPinScreen({ navigation, route }: any) {
    const length = 4;
    const [pin, setPin] = useState(Array(length).fill(''))
    const inputs = useRef<Array<TextInput | null>>([]);
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [timeLeft, setTimeLeft] = useState<number>(300);
    const [reSended, setReSended] = useState<number>(0);
    const authStatus = useSelector((state: any) => state.auth.status);
    const authError = useSelector((state: any) => state.auth.error);
    const dispatch = useAppDispatch();
    const { loading, hidden, modal } = useNotifi();
    const { userEmail, type } = route.params;

    //Auto focus khoảng trống
    useEffect(() => {
        for (let i = 0; i < length; i++) {
            if (pin[i] === '') {
                inputs.current[i]?.focus();
                return;
            }
        }
    }, [pin])

    //Hàm nhập số PIN
    const handleChange = (text: any, index: number) => {
        if (/^\d?$/.test(text)) {
            const newPin = [...pin]
            newPin[index] = text
            setPin(newPin);

            //Nhập đủ 4 số thì bỏ disable
            if (newPin.every((value) => value !== '')) {
                setDisableButton(false);
            } else {
                setDisableButton(true);
            }
        }
    }

    //Hàm xử lý khi xóa số PIN
    const handleBackspace = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
            console.log('backspaceActive')
            const newPin = [...pin]
            setTimeout(() => {
                inputs.current[index - 1]?.focus();
                newPin[index - 1] = ''
                setPin(newPin);
            }, 100)
        }
    }
    //Count Down
    useEffect(() => {
        if (timeLeft <= 0) return;

        const countDown = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000)

        return () => { clearInterval(countDown) }
    }, [timeLeft])
    //Count Down
    useEffect(() => {
        if (reSended <= 0) return;

        const countDownReSend = setInterval(() => {
            setReSended((prev) => prev - 1);
        }, 1000)

        return () => { clearInterval(countDownReSend) }
    }, [reSended])
    //Chuyển đổi số thành phút và giây
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const onSubmit = () => {
        console.log('pin: ', pin.join(''))
        dispatch(verifyOTP({ userEmail: userEmail, otp: pin.join('') }))
    }

    useEffect(() => {
        if (authStatus && authStatus === 'pedingVerify') {
            loading()
            return
        } else if (authStatus && authStatus === 'failVerify') {
            modal({ title: 'Thông báo', message: authError || 'Xác thực thất bại' })
            return
        } else if (authStatus && authStatus === 'successVerify' && type === 'forgotPassword') {
            navigation.navigate('CreatePassword', { userEmail: userEmail, type: type });
            return
        } else if (authStatus && authStatus === 'successVerify' && type === 'confirmNewEmail') {
            modal({
                title: 'Thông báo',
                message: 'Xác minh thành công',
                onPressSingleButton: () => {
                    hidden();
                    // setTimeout(() => {
                    dispatch(setNewEmail({ email: userEmail }));
                    // }, 100)
                    navigation.goBack();
                }
            })
        }
        else {
            hidden()
            return
        }

    }, [authStatus])

    return (
        <ImageBackground style={styles.image} source={require('../assets/background.jpg')} resizeMode="cover" >
            <FastImage style={styles.fastImage} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="center" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.viewForm}>
                    <View>
                        <CustomText style={styles.title}>Nhập mã xác thực</CustomText>
                        <CustomText style={styles.verifyCode}>Mã xác thực được gửi tới số điện thoại/email</CustomText>
                    </View>
                    <View className='flex flex-row gap-x-5 w-full'>
                        {pin.map((input, index) => (
                            <TextInput
                                key={index}
                                ref={(elemnt) => (inputs.current[index] = elemnt)}
                                value={input}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleBackspace(e, index)}
                                maxLength={1}
                                keyboardType="numeric"
                                className="w-full flex-1"
                                style={styles.textInput}
                            />
                        ))}
                    </View>
                    <View style={styles.endUseContainer}>
                        <CustomText style={styles.countDownText}>Hết hạn:</CustomText>
                        <CustomText style={styles.counDownNumber}>{formatTime(timeLeft)}</CustomText>
                    </View>
                    <View style={styles.viewProviderButton}>
                        <TouchableOpacity disabled={disableButton} onPress={() => onSubmit()} style={[styles.viewButton, !disableButton && { opacity: 1 }]}>
                            <CustomText style={styles.textButtonWhite}>Tiếp tục</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={reSended > 0} style={{ opacity: reSended > 0 ? 0.5 : 1 }} onPress={() => { setReSended(70), dispatch(sendOTP(userEmail)) }}>
                            <CustomText style={styles.noCodeSended}>Không nhận được mã? {reSended > 0 && `(Gửi lại sau: ${formatTime(reSended)})`}</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    noCodeSended: {
        color: '#000',
        textAlign: 'center',
    },
    counDownNumber: {
        fontSize: 20,
        color: CustomColors.primary
    },
    countDownText: {
        paddingBottom: 2,
        fontSize: 13,
        color: '#747474',
    },
    endUseContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        columnGap: 4,
    },
    verifyCode: {
        fontSize: 12,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        lineHeight: 28,
        color: '#000',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingVertical: 4,
    },
    viewProviderButton: {
        display: 'flex',
        rowGap: 10,
    },
    textButtonWhite: {
        color: '#EEEEEE',
        fontSize: 15,
        fontWeight: '400',
    },
    viewButton: {
        borderWidth: 1,
        borderColor: CustomColors.primary,
        height: 45,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.primary,
        opacity: 0.5
    },
    textInput: {
        borderBottomWidth: 2,
        borderColor: CustomColors.primary,
        textAlign: 'center',
        fontSize: 70,
        color: CustomColors.primary,
    },
    viewForm: {
        // position: 'absolute',
        width: width * 90 / 100,
        // top: height / 2,
        // transform: [{ translateY: -(height * 23 / 100) }],
        // alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        paddingHorizontal: 42,
        paddingVertical: 24,
        rowGap: 30,
    },
    fastImage: {
        width: 258,
        height: 90,
        position: 'absolute',
        alignSelf: 'center',
        top: height / 7,
    },
    image: {
        width: width,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});