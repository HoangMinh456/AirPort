import { View } from "react-native";
import CustomColors from "../../colors";
import CustomText from "./CustomText";
import Icons from "./Icons";


export default function HeaderNavigation({ title }: { title: string }) {
    return (
        <View style={{ backgroundColor: CustomColors.primary, paddingHorizontal: 16, paddingVertical: 30 }}>
            <View className="flex flex-row gap-x-4">
                <Icons typeIcon="Entypo" nameIcon="arrow-back-ios-new" sizeIcon={18} colorIcon="#fff" />
                <CustomText className="text-lg font-bold">{title}</CustomText>
            </View>
        </View>
    )
}