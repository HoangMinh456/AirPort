import { Dimensions, View } from "react-native"
import CustomColors from "../../colors"
import HeaderNavigation from "../components/HeaderNavigation"
import CustomTextInput from "../components/CustomTextInput"
import CustomText from "../components/CustomText"
import Button from "../components/Button"
import { Controller, useForm } from "react-hook-form"
import useNotifi from "../hooks/useNotifi"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get('window')

export default function EditUserInforScreen() {
    const navigation = useNavigation<any>();
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: 'Hoàng Minh',
            phone: '08736554923',
            email: 'minh@gmail.com'
        }
    })
    const { modal } = useNotifi();

    const onSubmit = (data: any) => {
        console.log('data: ', data)
        modal({ title: 'Thông báo', message: 'Cập nhật thành công' })
    }

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
                        rules={{ required: true }}
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