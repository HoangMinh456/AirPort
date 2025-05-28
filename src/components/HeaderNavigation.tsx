import { Touchable, TouchableOpacity, View } from "react-native";
import CustomColors from "../../colors";
import CustomText from "./CustomText";
import Icons from "./Icons";
import { useNavigation } from "@react-navigation/native";


export default function HeaderNavigation({ title }: { title: string }) {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: CustomColors.primary, paddingHorizontal: 16, paddingVertical: 28 }}>
            <View className="flex flex-row gap-x-4 items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons typeIcon="MaterialIcons" nameIcon="arrow-back-ios-new" sizeIcon={18} colorIcon="#fff" />
                </TouchableOpacity>
                <CustomText className="text-lg font-bold text-white">{title}</CustomText>
            </View>
        </View>
    )
}