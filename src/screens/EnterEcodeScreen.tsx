import { Dimensions, View } from "react-native";
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";

const { width, height } = Dimensions.get('window');

export default function EnterEcodeScreen() {
    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Nhập mã Ecode" />
            </View>
        </View>
    )
}