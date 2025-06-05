import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import AgreePolicy from "../components/AgreePolicy";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import { sendOTP } from "../reducers/authSlice";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useNotifi from "../hooks/useNotifi";

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const authStatus = useSelector((state: any) => state.auth.status);
    const authError = useSelector((state: any) => state.auth.error);
    const dispatch = useAppDispatch();
    const { hidden, loading } = useNotifi()
    const [userEmail, setUserEmail] = useState<string>('');
    // const [isChecked, setIsChecked] = useState(false);
    const policyChecked = watch('policy');

    const onSubmit = (data: any) => {
        console.log(data);
        setUserEmail(data.email);
        dispatch(sendOTP(data.email));
    }

    useEffect(() => {
        if (authStatus && authStatus === 'senddingOTP') {
            loading()
        } else {
            hidden()
        }

        if (authStatus && authStatus === 'successSendding' && userEmail !== '') {
            console.log('authStatus: ', authStatus)
            navigation.navigate('EnterPin', { userEmail: userEmail });
        }
    }, [authStatus])

    if (authError) {
        console.log('authError: ', authError)
    }

    return (
        <ImageBackground style={styles.image} source={require('../assets/background.jpg')} resizeMode="cover" >
            <FastImage style={styles.fastImage} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="center" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.viewForm}>
                    <CustomText style={styles.title}>Đăng ký</CustomText>
                    <View className='flex gap-y-5'>
                        <View>
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: 'Không được để trống!',
                                    // pattern: {
                                    //     value: /^(0|\+84)(3[2-9]|5[6|8-9]|7[0-9]|8[1-9]|9[0-9])\d{7}$/,
                                    //     message: 'Số điện thoại không hợp lệ'
                                    // }
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

                        <Controller
                            control={control}
                            name="policy"
                            rules={{ required: 'Bạn phải đồng ý với điều khoản' }}
                            render={({ field: { onChange, value } }) => (
                                <AgreePolicy value={value} onChange={onChange} />
                            )}
                        />
                    </View>
                    <View style={styles.viewProviderButton}>
                        <TouchableOpacity disabled={!policyChecked} onPress={handleSubmit(onSubmit)} style={[styles.viewButton, policyChecked && { opacity: 1 }]}>
                            <CustomText style={styles.textButtonWhite}>Đăng ký</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </ImageBackground >
    );
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
        // position: 'absolute',
        width: width * 90 / 100,
        // top: height / 2,
        // transform: [{ translateY: -(height * 23 / 100) }],
        // alignSelf: 'center',
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