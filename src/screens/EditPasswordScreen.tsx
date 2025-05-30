import { Controller, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import useNotifi from "../hooks/useNotifi";
import CustomColors from "../../colors";
import HeaderNavigation from "../components/HeaderNavigation";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";

const { width, height } = Dimensions.get('window');

export default function EditPasswordScreen() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm()
    const { modal } = useNotifi();

    const onSubmit = (data: any) => {
        console.log('data: ', data)
        modal({ title: 'Thông báo', message: 'Cập nhật thành công' })
    }

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Đổi mật khẩu" />
                <View style={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24, rowGap: 18 }}>
                    <Controller
                        control={control}
                        name="oldPassword"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <View style={{ display: 'flex', rowGap: 8 }}>
                                <CustomText style={{ paddingLeft: 10, fontSize: 14, fontWeight: '600', color: errors.oldPassword ? CustomColors.primary : CustomColors.black }}>Mật khẩu cũ</CustomText>
                                <CustomTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nhập mật khẩu cũ"
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: errors.oldPassword ? CustomColors.primary : '#C1C8D1',
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
                        name="newPassword"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <View style={{ display: 'flex', rowGap: 8 }}>
                                <CustomText style={{ paddingLeft: 10, fontSize: 14, fontWeight: '600', color: errors.newPassword ? CustomColors.primary : CustomColors.black }}>Mật khẩu mới</CustomText>
                                <CustomTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nhập mật khẩu mới"
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: errors.newPassword ? CustomColors.primary : '#C1C8D1',
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
                        name="re_newPassword"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <View style={{ display: 'flex', rowGap: 8 }}>
                                <CustomText style={{ paddingLeft: 10, fontSize: 14, fontWeight: '600', color: errors.re_newPassword ? CustomColors.primary : CustomColors.black }}>Nhập lại mật khẩu mới</CustomText>
                                <CustomTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: errors.re_newPassword ? CustomColors.primary : '#C1C8D1',
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
                    <Button onPressBack={() => reset()} titleButtonBack="Hủy" styleButtonBack={{ fontWeight: '500' }} titleButtonContinue="Đổi mật khẩu" styleButtonContinue={{ fontWeight: '500' }} onPressContinue={handleSubmit(onSubmit)} />
                </View>
            </View>
        </View>
    )
}