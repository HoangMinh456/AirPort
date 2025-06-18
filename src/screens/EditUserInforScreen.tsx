import { Dimensions, View } from "react-native"
import CustomColors from "../../colors"
import HeaderNavigation from "../components/HeaderNavigation"
import CustomTextInput from "../components/CustomTextInput"
import CustomText from "../components/CustomText"
import Button from "../components/Button"
import { Controller, useForm } from "react-hook-form"
import useNotifi from "../hooks/useNotifi"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../store/store"
import { sendOTP, updateUserInformation } from "../store/thunks/authThunk"
import { useEffect, useState } from "react"
import { setStatusIdle } from "../store/slices/authSlice"

const { width, height } = Dimensions.get('window')

export default function EditUserInforScreen() {
    const navigation = useNavigation<any>();
    const [newEmail, setNewEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const dispatch = useAppDispatch();
    const authStatus = useSelector((state: any) => state.auth.status);
    const authError = useSelector((state: any) => state.auth.error);
    const userInformation = useSelector((state: any) => state.auth.information);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: userInformation.userName,
            phone: userInformation.phone,
            email: userInformation.email
        }
    });
    const { modal, loading, hidden } = useNotifi();

    const onSubmit = (data: any) => {
        console.log('data: ', data)
        if (data.email !== userInformation.email) {
            // console.log('Chay vao day')
            setNewEmail(data.email);
            setPhone(data.phone);
            setUserName(data.name);
            modal({
                title: 'Thông báo',
                message: 'Phát hiện địa chỉ email mới, cần phải xác minh!',
                button: true,
                titleButtonAccept: 'Xác minh',
                titleButtonClose: 'Hủy',
                onPressButtonAccept: () => {
                    // giúp react có thời gian "chạy vòng render" để kịp hiển thị loading trước khi gửi OTP
                    setTimeout(() => {
                        dispatch(sendOTP(data.email));
                    }, 100)
                }
            })
            return;
        }
        // console.log(data.email)
        dispatch(updateUserInformation({ userId: userInformation._id, email: data.email, phone: data.phone, userName: data.name }))
        return;
    };

    useEffect(() => {
        if (authStatus === 'senddingOTP') {
            loading();
            // console.log('Đã chạy loading');
            return;

        } else if (authStatus === 'pendingUpdateUserInformation') {
            loading();
            return;

        } else if (authStatus === 'successSendding') {
            // console.log('Chạy vào chuyển màn hình sang EnterPin');
            navigation.navigate('EnterPin', { type: 'confirmNewEmail', userEmail: newEmail });
            dispatch(setStatusIdle());
            return;

        } else if (authStatus === 'successUpdateUserInformation') {
            modal({ title: 'Thông báo', message: 'Cập nhật thành công' });
            dispatch(setStatusIdle());
            return;

        } else if (authStatus === 'failUpdateUserInformation') {
            modal({ title: 'Thông báo', message: authError.toString() });
            return;

        } else if (authStatus === 'senddingFail') {
            modal({ title: 'Thông báo', message: authError.toString() });
            return;

        } else if (authStatus === 'successVerify') {
            dispatch(updateUserInformation({ userId: userInformation._id, email: newEmail, phone: phone, userName: userName }))
            return;

        } else {
            hidden();
            return;

        }

    }, [authStatus])

    console.log('Check render', authStatus);

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Chỉnh sửa thông tin cá nhân" />
                <View style={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24, rowGap: 18 }}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <View style={{ display: 'flex', rowGap: 8 }}>
                                <CustomText style={{ paddingLeft: 10, fontSize: 14, fontWeight: '600', color: errors.name ? CustomColors.primary : CustomColors.black }}>Họ và tên</CustomText>
                                <CustomTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nhập họ và tên"
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: errors.name ? CustomColors.primary : '#C1C8D1',
                                        borderRadius: 10,
                                        backgroundColor: '#fff',
                                        paddingLeft: 20,
                                        fontSize: 14,
                                        height: 50
                                    }}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(0|\+84)(3[2-9]|5[6|8-9]|7[0-9]|8[1-9]|9[0-9])\d{7}$/,
                                message: 'Số điện thoại không hợp lệ'
                            }
                        }}
                        render={({ field: { value, onChange } }) => (
                            <View style={{ display: 'flex', rowGap: 8 }}>
                                <CustomText style={{ paddingLeft: 10, fontSize: 14, fontWeight: '600', color: errors.phone ? CustomColors.primary : CustomColors.black }}>Số điện thoại</CustomText>
                                <CustomTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nhập số điện thoại"
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: errors.phone ? CustomColors.primary : '#C1C8D1',
                                        borderRadius: 10,
                                        backgroundColor: '#fff',
                                        paddingLeft: 20,
                                        fontSize: 14,
                                        height: 50
                                    }}
                                    keyboardType='numeric'
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <View style={{ display: 'flex', rowGap: 8 }}>
                                <CustomText style={{ paddingLeft: 10, fontSize: 14, fontWeight: '600', color: errors.email ? CustomColors.primary : CustomColors.black }}>Email</CustomText>
                                <CustomTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nhập email"
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: errors.email ? CustomColors.primary : '#C1C8D1',
                                        borderRadius: 10,
                                        backgroundColor: '#fff',
                                        paddingLeft: 20,
                                        fontSize: 14,
                                        height: 50
                                    }}
                                />
                            </View>
                        )}
                    />
                    <Button onPressBack={() => { reset(), navigation.goBack() }} titleButtonBack="Hủy" styleButtonBack={{ fontWeight: '500' }} titleButtonContinue="Cập nhật" styleButtonContinue={{ fontWeight: '500' }} onPressContinue={handleSubmit(onSubmit)} />
                </View>
            </View>
        </View>
    )
}