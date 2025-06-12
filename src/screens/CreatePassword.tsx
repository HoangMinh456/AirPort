import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import { useAppDispatch } from "../store/store";
import useNotifi from "../hooks/useNotifi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { changePasswordByEmail, createAccount } from "../store/thunks/authThunk";
import { setStatusIdle } from "../store/slices/authSlice";

const { width, height } = Dimensions.get('window');

export default function CreatePassword({ route }: any) {
    const { control, handleSubmit, formState: { errors }, getValues } = useForm();
    const { userEmail, type } = route.params;
    const dispatch = useAppDispatch();
    const { loading, hidden, modal } = useNotifi();
    const authStatus = useSelector((state: any) => state.auth.status);

    const onSubmit = (data: any) => {
        // console.log('userName ở đoạn CreatePassword: ', userEmail.split('@')[0]);
        if (type === 'forgotPassword') {
            dispatch(changePasswordByEmail({ userEmail: userEmail, password: data.password }))
            return;
        }
        // console.log(data);
        dispatch(createAccount({ userEmail: userEmail, password: data.password, userName: userEmail.split('@')[0] }))
    }

    useEffect(() => {
        if (authStatus && (authStatus === 'pendingCreateAccount' || authStatus === 'pendingChangePassword')) {
            // console.log('Chạy vào loading')
            loading();
            return
        } else if (authStatus === 'successCreateAccount' || authStatus === 'successChangePassword') {
            console.log('Chạy vào thông báo thành công')
            modal({ title: 'Thông báo', message: 'Thành công' })
            dispatch(setStatusIdle());
            return
        } else {
            hidden();
            return
        }
    }, [authStatus])

    return (
        <ImageBackground style={styles.image} source={require('../assets/background.jpg')} resizeMode="cover" >
            <FastImage style={styles.fastImage} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="center" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.viewForm}>
                    <CustomText style={styles.title}>Tạo mật khẩu</CustomText>
                    <View className='flex gap-y-5'>
                        <View>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: 'Không được để trống!',
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.textInput}
                                        keyboardType="default"
                                        errorStyle={errors.password ? { borderColor: '#ef4444', borderWidth: 2 } : undefined}
                                        placeholder="Nhập mật khẩu"
                                        placeholderTextColor="#6F6F6F"
                                    />
                                )}
                            />
                            {errors.password && <CustomText style={styles.errorText}>{errors.password.message}</CustomText>}
                        </View>
                        <View>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={{
                                    required: 'Không được để trống!',
                                    validate: (value) => value === getValues('password') || 'Mật khẩu không trùng khớp'
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.textInput}
                                        keyboardType="default"
                                        errorStyle={errors.confirmPassword ? { borderColor: '#ef4444', borderWidth: 2 } : undefined}
                                        placeholder="Nhập lại mật khẩu"
                                        placeholderTextColor="#6F6F6F"
                                    />
                                )}
                            />
                            {errors.confirmPassword && <CustomText style={styles.errorText}>{errors.confirmPassword.message}</CustomText>}
                        </View>
                    </View>
                    <View style={styles.viewProviderButton}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.viewButton}>
                            <CustomText style={styles.textButtonWhite}>Xác nhận</CustomText>
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
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 9999,
        fontSize: 14,
        textAlign: 'center',
        height: 45,
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