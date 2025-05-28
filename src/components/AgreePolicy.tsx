import CheckBox from "@react-native-community/checkbox";
import { View } from "react-native";
import CustomColors from "../../colors";
import CustomText from "./CustomText";

export default function AgreePolicy({ value, onChange, styleChexBox }: { value?: boolean, onChange?: (checked: boolean) => void, styleChexBox?: any }) {
    return (
        <View className="flex flex-row justify-start items-start">
            <CheckBox
                value={value}
                onValueChange={onChange}
                tintColors={{
                    false: '#6F6F6F',
                    true: CustomColors.primary
                }}
                style={styleChexBox}
            />
            <View className="flex flex-1 pt-1">
                <CustomText className="text-black">Bạn đồng ý với <CustomText className="text-[#127EC3] font-semibold">Điều khoản dịch vụ</CustomText> và <CustomText className="text-[#127EC3] font-semibold">Chính sách bảo mật</CustomText> của AirPort</CustomText>
            </View>
        </View>
    )
}