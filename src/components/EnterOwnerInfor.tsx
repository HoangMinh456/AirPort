import { Controller } from "react-hook-form";
import { ScrollView, View } from "react-native";
import CustomColors from "../../colors";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import TableUserInfor from "./TableUserInfor";

export default function EnterOwnerInfor({ control, errors, checkInfor }: any) {
    // console.log('control: ', control)
    return (
        <View style={{ flexGrow: 1, paddingTop: 30, paddingHorizontal: 16, display: 'flex', rowGap: 16 }}>
            <CustomText style={{ fontSize: 16, color: CustomColors.black }}>
                Nhập thông tin khách hàng
            </CustomText>
            <View style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
                <CustomText style={{ color: CustomColors.black }}>Owner information</CustomText>
                <View className="flex flex-col gap-y-2 px-1">
                    <Controller
                        name="userName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <CustomTextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Tên khách hàng/Owner name/email"
                                placeholderTextColor="#737373"
                                style={{ fontSize: 14, paddingLeft: 24, borderWidth: 1, borderColor: errors.name ? CustomColors.primary : '#C1C8D1', borderRadius: 10, backgroundColor: '#fff', height: 50 }}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <CustomTextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Số điện thoại/Identify card/Password"
                                placeholderTextColor="#737373"
                                style={{ fontSize: 14, paddingLeft: 24, borderWidth: 1, borderColor: errors.card ? CustomColors.primary : '#C1C8D1', borderRadius: 10, backgroundColor: '#fff', height: 50 }}
                            />
                        )}
                    />

                </View>
            </View>
            {checkInfor && <View style={{ paddingHorizontal: 4 }}><TableUserInfor control={control} errors={errors} /></View>}
        </View>
    )
}