import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import CustomColors from "../../colors";

export default function Button() {
    return (
        <TouchableOpacity onPress={() => console.log('Trở lại')}>
            <View style={{ backgroundColor: CustomColors.sercond }} className="flex flex-1 py-4">
                <CustomText className="text-black text-center">Trở lại</CustomText>
            </View>
        </TouchableOpacity>
    );
}