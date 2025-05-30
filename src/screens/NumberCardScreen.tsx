import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import Button from "../components/Button";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import HeaderNavigation from "../components/HeaderNavigation";
import TableUserInfor from "../components/TableUserInfor";
import { useState } from "react";
import useNotifi from "../hooks/useNotifi";

const { width, height } = Dimensions.get('window');

export default function NumberCardScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            numberCard: '',
            used: '0',
            followWith: '0'
        }
    });
    const [showUserCard, setShowUserCard] = useState<boolean>(false)
    const { modal } = useNotifi();

    const onSubmit = (data: any) => {
        console.log('data: ', data)
        console.log('showUserCard: ', showUserCard)
        if (showUserCard === true && data.numberCard === '24042004') {
            navigation.navigate('SnapShootTicket');
            return
        }

        if (data.numberCard === '24042004' && showUserCard === false) {
            setShowUserCard(true)
            return
        }

        modal({ title: 'Thông báo', message: 'Số thẻ không đúng, vui lòng kiểm tra lại!' })

    }

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full flex-1">
                <HeaderNavigation title="Thông tin khách hàng" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full grow flex flex-1">
                    <View className="flex h-full flex-1 CONTANER_SCROLL_VIEW">
                        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                        <View className="grow">
                            <View className="flex gap-y-[18px]">
                                <View className="bg-white pt-6 pb-4 px-4 flex gap-y-[10px] rounded-bl-3xl rounded-br-3xl">
                                    <CustomText className="text-black font-bold">Số thẻ</CustomText>
                                    <Controller
                                        control={control}
                                        name="numberCard"
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <CustomTextInput
                                                value={value}
                                                onChangeText={onChange}
                                                placeholder="Nhập số thẻ"
                                                keyboardType="numeric"
                                                // editable={false}
                                                placeholderTextColor={CustomColors.sercond}
                                                style={{ borderWidth: 1, borderColor: errors.numberCard ? CustomColors.primary : CustomColors.sercond, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 16, fontSize: 14 }}
                                            />
                                        )}
                                    />
                                </View>
                                <View className="flex items-center gap-y-5">
                                    <FastImage style={{ width: 340, height: 214 }} source={Image.resolveAssetSource(require('../assets/card.png'))} resizeMode="stretch" />
                                </View>
                                {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                                {showUserCard && <TableUserInfor control={control} errors={errors} />}
                                {/* </KeyboardAvoidingView> */}
                            </View>
                        </View>
                        {/* </KeyboardAvoidingView> */}
                        <Button onPressContinue={handleSubmit(onSubmit)} />
                    </View>
                </ScrollView>
            </View >
        </View >
    )
}