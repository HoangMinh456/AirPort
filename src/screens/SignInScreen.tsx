import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import useNotifi from "../hooks/useNotifi";
import { useAppDispatch } from "../store/store";
import { SignIn } from "../store/thunks/authThunk";

const { width, height } = Dimensions.get('window');

export default function SignInScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { loading, modal, hidden } = useNotifi();
    const dispatch = useAppDispatch();
    const signInStatus = useSelector((state: any) => state.auth.status);
    const signInError = useSelector((state: any) => state.auth.error);

    const onSubmit = (data: any) => {
        // console.log(data);
        dispatch(SignIn({ userEmail: data.email, password: data.password }))
    }

    useEffect(() => {
        if (signInStatus && signInStatus === 'pendingSignIn') {
            loading();
            return
        } else if (signInStatus === 'failSignIn') {
            modal({ title: 'Thông báo', message: signInError })
        } else {
            hidden()
            return
        }
    }, [signInStatus])

    return (
        <ImageBackground style={styles.image} source={require('../assets/background.jpg')} resizeMode="cover">
            <FastImage style={styles.fastImage} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="center" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.viewForm}>
                    <CustomText style={styles.title}>Đăng nhập</CustomText>
                    <View className='flex gap-y-5'>
                        <View>
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
                        <View className="flex flex-col gap-y-2">
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Không được để trống!"
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomTextInput
                                        value={value}
                                        onChangeText={onChange}
                                        style={styles.textInput}
                                        errorStyle={errors.password ? { borderColor: '#ef4444', borderWidth: 2 } : undefined}
                                        placeholder="Nhập mật khẩu"
                                        placeholderTextColor="#6F6F6F"

                                    />
                                )}
                            />
                            {errors.password && <CustomText style={styles.errorText}>{errors.password.message}</CustomText>}
                            <View className="flex flex-row justify-end">
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                    <CustomText style={styles.forgotPass}>Quên mật khẩu?</CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewProviderButton}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.viewButton}>
                            <CustomText style={styles.textButtonWhite}>Đăng nhập</CustomText>
                        </TouchableOpacity>
                        <CustomText style={{ color: '#6F6F6F' }} className='text-center'>Hoặc</CustomText>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.viewBorderPrimary}>
                            <CustomText style={styles.textButtonPrimary}>Đăng ký</CustomText>
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
    forgotPass: {
        color: '#1875AF',
        fontSize: 14,
        textAlign: 'right',
        flexGrow: 1,
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
    textButtonPrimary: {
        color: CustomColors.primary,
        fontSize: 15,
        fontWeight: '400',
    },
    textButtonWhite: {
        color: '#EEEEEE',
        fontSize: 15,
        fontWeight: '400',
    },
    viewBorderPrimary: {
        borderWidth: 1,
        borderColor: CustomColors.primary,
        height: 45,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        borderWidth: 1,
        borderColor: CustomColors.primary,
        height: 45,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.primary,
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