import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import useNotifi from "../hooks/useNotifi";
import { sendOTP, setStatusIdle } from "../reducers/authSlice";
import { useAppDispatch } from "../store/store";

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const forgotPasswordStatus = useSelector((state: any) => state.auth.status);
    const forgotPasswordError = useSelector((state: any) => state.auth.error);
    const dispatch = useAppDispatch();
    const { hidden, loading, modal } = useNotifi()
    const [userEmail, setUserEmail] = useState<string>('');

    const onSubmit = (data: any) => {
        console.log(data);
        setUserEmail(data.email);
        dispatch(sendOTP(data.email));
    }

    useEffect(() => {
        if (forgotPasswordStatus && forgotPasswordStatus === 'pendingGetUserByEmail') {
            loading()
            return
        } else if (forgotPasswordStatus === 'successGetUserByEmail') {
            navigation.navigate('EnterPin', { type: 'forgotPassword' });
            dispatch(setStatusIdle())
            return
        } else if (forgotPasswordStatus === 'failGetUserByEmail') {
            modal({ title: 'Thông báo', message: forgotPasswordError })
        } else {
            hidden()
            return
        }
    }, [forgotPasswordStatus])

    if (forgotPasswordError) {
        console.log('forgotPasswordError: ', forgotPasswordError)
    }

    return (
        <ImageBackground style={styles.image} source={require('../assets/background.jpg')} resizeMode="cover" >
            <FastImage style={styles.fastImage} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="center" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.viewForm}>
                    <CustomText style={styles.title}>Quên mật khẩu</CustomText>
                    <View className='flex gap-y-5'>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Không được để trống!',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput
                                    onChangeText={onChange}
                                    value={value}
                                    style={styles.textInput}
                                    keyboardType="default"
                                    errorStyle={errors.phone ? { borderColor: '#ef4444', borderWidth: 2 } : undefined}
                                    placeholder="Nhập email"
                                    placeholderTextColor="#6F6F6F"
                                />
                            )}
                        />
                        {errors.phone && <CustomText style={styles.errorText}>{errors.phone.message}</CustomText>}
                    </View>
                    <View style={styles.viewProviderButton}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.viewButton}>
                            <CustomText style={styles.textButtonWhite}>Gửi mã OTP</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: '#ef4444',
        fontWeight: '700',
        paddingLeft: 8
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
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 9999,
        fontSize: 14,
        textAlign: 'center',
        height: 45,
        color: '#000000'
    },
    viewForm: {
        width: width * 90 / 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        paddingHorizontal: 24,
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