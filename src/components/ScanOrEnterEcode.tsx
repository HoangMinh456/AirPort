import { TouchableOpacity, View } from "react-native";
import CustomColors from "../../colors";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";
import Icons from "./Icons";
import { Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

export default function ScanOrEnterEcode({ control, errors }: any) {
    const navigation = useNavigation<any>();

    return (
        <View style={{ flexGrow: 1, paddingTop: 30, paddingHorizontal: 16, display: 'flex', rowGap: 16 }}>
            <CustomText style={{ fontSize: 16, color: CustomColors.black }}>
                Nhập mã Ecode của khách hàng bằng tay hoặc quét mã QR Code
            </CustomText>
            <View style={{ display: 'flex', rowGap: 8 }}>
                <CustomText style={{ color: CustomColors.black }}>Enter code or scan by camera</CustomText>
                <View className="flex flex-row gap-x-2">
                    <Controller
                        name="eCode"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: { value, onChange } }) => (
                            <CustomTextInput
                                value={value}
                                onChangeText={onChange}
                                keyboardType="default"
                                placeholder="Nhập E Code"
                                placeholderTextColor="#737373"
                                style={{ paddingLeft: 24, borderWidth: 1, height: 50, borderColor: errors.eCode ? CustomColors.primary : '#C1C8D1', borderRadius: 10, backgroundColor: '#fff', flex: 1 }}
                            />
                        )}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', { type: 'qr' })}>
                        <View style={{ borderColor: '#C1C8D1', borderWidth: 1, padding: 8, backgroundColor: '#fff', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Icons typeIcon="MaterialCommunityIcons" nameIcon="line-scan" colorIcon={CustomColors.primary} sizeIcon={30} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}