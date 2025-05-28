import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import CustomColors from "../../colors";
import { useNavigation } from "@react-navigation/native";

export default function Button({ onPressContinue, swichCase, setSwitchCase }: { onPressContinue?: () => void, swichCase?: string, setSwitchCase?: any }) {
    const navigation = useNavigation();
    return (
        <View className="px-4 flex flex-row justify-center gap-x-[18px] py-5">
            <TouchableOpacity className="flex-1" onPress={() => swichCase === 'OWNER_INFOR' ? setSwitchCase('ENTER_ECODE') : navigation.goBack()}>
                <CustomText style={{ backgroundColor: CustomColors.sercond, borderRadius: 10 }} className="py-4 text-black text-sm w-full text-center">Trở lại</CustomText>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1" onPress={onPressContinue || (() => console.log('press'))}>
                <CustomText style={{ backgroundColor: CustomColors.primary, borderRadius: 10 }} className="py-4 text-white text-sm w-full text-center">Tiếp tục</CustomText>
            </TouchableOpacity>
        </View>
    );
}