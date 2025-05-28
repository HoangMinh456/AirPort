import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import CustomColors from "../../colors";
import CustomTextInput from "./CustomTextInput";
import Icons from "./Icons";
import { useState } from "react";
import TableUserInfor from "./TableUserInfor";
import { Controller, useForm } from "react-hook-form";

export default function EnterOwnerInfor({ control, errors, checkInfor }: any) {

    return (
        <View style={{ flexGrow: 1, paddingTop: 30, paddingHorizontal: 16, display: 'flex', rowGap: 16 }}>
            <CustomText style={{ fontSize: 16, color: CustomColors.black }}>
                Nhập thông tin khách hàng
            </CustomText>
            <View style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
                <CustomText style={{ color: CustomColors.black }}>Owner information</CustomText>
                <View className="flex flex-col gap-y-2 px-1">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <CustomTextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Tên khách hàng/Owner name"
                                placeholderTextColor="#737373"
                                style={{ fontSize: 14, paddingLeft: 24, borderWidth: 1, borderColor: errors.name ? CustomColors.primary : '#C1C8D1', borderRadius: 10, backgroundColor: '#fff', height: 50 }}
                            />
                        )}
                    />
                    <Controller
                        name="card"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <CustomTextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Số điện thoại/Identify card"
                                placeholderTextColor="#737373"
                                style={{ fontSize: 14, paddingLeft: 24, borderWidth: 1, borderColor: errors.card ? CustomColors.primary : '#C1C8D1', borderRadius: 10, backgroundColor: '#fff', height: 50 }}
                            />
                        )}
                    />

                </View>
            </View>
            {checkInfor && <TableUserInfor />}
        </View>
    )
}