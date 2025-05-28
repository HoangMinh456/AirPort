import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import CustomColors from "../../colors";

export default function Button({ onPressContinue }: { onPressContinue?: () => void }) {
    return (
        <View className="px-4 flex flex-row justify-center gap-x-[18px] mb-5">
            <TouchableOpacity className="flex-1">
                <CustomText style={{ backgroundColor: CustomColors.sercond, borderRadius: 10 }} className="py-4 text-black text-sm w-full text-center">Trở lại</CustomText>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1" onPress={onPressContinue}>
                <CustomText style={{ backgroundColor: CustomColors.primary, borderRadius: 10 }} className="py-4 text-white text-sm w-full text-center">Tiếp tục</CustomText>
            </TouchableOpacity>
        </View>
    );
}