import CheckBox from "@react-native-community/checkbox";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    // const [isChecked, setIsChecked] = useState(false);
    const policyChecked = watch('policy');
    const onSubmit = (data: any) => {
        console.log(data);
        navigation.navigate('EnterPin');
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
                                name="phone"
                                rules={{
                                    required: 'Không được để trống!',
                                    pattern: {
                                        value: /^(0|\+84)(3[2-9]|5[6|8-9]|7[0-9]|8[1-9]|9[0-9])\d{7}$/,
                                        message: 'Số điện thoại không hợp lệ'
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.textInput}
                                        keyboardType="numeric"
                                        errorStyle={errors.phone ? { borderColor: '#ef4444', borderWidth: 2 } : undefined}
                                        placeholder="Nhập số điện thoại"
                                        placeholderTextColor="#6F6F6F"
                                    />
                                )}
                            />
                            {errors.phone && <CustomText className="text-red-500 font-bold pl-2">{errors.phone.message}</CustomText>}
                        </View>

                        <Controller
                            control={control}
                            name="policy"
                            rules={{ required: 'Bạn phải đồng ý với điều khoản' }}
                            render={({ field: { onChange, value } }) => (
                                <View className="flex flex-row justify-start items-start">
                                    <CheckBox
                                        value={value}
                                        onValueChange={onChange}
                                        tintColors={{
                                            false: '#6F6F6F',
                                            true: CustomColors.primary
                                        }}
                                    />
                                    <View className="flex flex-1 pt-1">
                                        <CustomText className="text-black">Bạn đồng ý với <CustomText className="text-[#127EC3] font-semibold">Điều khoản dịch vụ</CustomText> và <CustomText className="text-[#127EC3] font-semibold">Chính sách bảo mật</CustomText> của AirPort</CustomText>
                                    </View>
                                </View>
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