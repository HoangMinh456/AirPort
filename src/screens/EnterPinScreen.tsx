import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import useNotifi from "../hooks/useNotifi";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const { width, height } = Dimensions.get('window');

export default function EnterPinScreen({ navigation }: any) {
    const length = 4;
    const [pin, setPin] = useState(Array(length).fill(''))
    const inputs = useRef<Array<TextInput | null>>([]);
    const [disableButton, setDisableButton] = useState<boolean>(true);

    const { modal } = useNotifi();

    useEffect(() => {
        for (let i = 0; i < length; i++) {
            if (pin[i] === '') {
                inputs.current[i]?.focus();
                return;
            }
        }
    }, [pin])

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

    const onSubmit = () => {
        navigation.navigate('CreatePassword');
    }

    return (
        <ImageBackground style={styles.image} source={require('../assets/background.jpg')} resizeMode="cover" >
            <FastImage style={styles.fastImage} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="center" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.viewForm}>
                    <View>
                        <CustomText style={styles.title}>Nhập mã xác thực</CustomText>
                        <CustomText className="text-center" style={{ fontSize: 12 }}>Mã xác thực được gửi tới số điện thoại/email</CustomText>
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
                    <View className="flex flex-row items-end justify-center gap-x-1">
                        <CustomText className="pb-[2px]" style={{ fontSize: 13, color: '#747474' }}>Hết hạn:</CustomText>
                        <CustomText style={{ fontSize: 20, color: CustomColors.primary }}>03:50</CustomText>
                    </View>
                    <View style={styles.viewProviderButton}>
                        <TouchableOpacity disabled={disableButton} onPress={() => onSubmit()} style={[styles.viewButton, !disableButton && { opacity: 1 }]}>
                            <CustomText style={styles.textButtonWhite}>Tiếp tục</CustomText>
                        </TouchableOpacity>
                        <CustomText className="text-black text-center">Không nhận được mã?</CustomText>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
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