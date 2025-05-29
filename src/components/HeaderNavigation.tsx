import { Touchable, TouchableOpacity, View } from "react-native";
import CustomColors from "../../colors";
import CustomText from "./CustomText";
import Icons from "./Icons";
import { useNavigation } from "@react-navigation/native";


export default function HeaderNavigation({ title, goBack = true }: { title: string, goBack?: boolean }) {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: CustomColors.primary, paddingHorizontal: 16, paddingVertical: 28 }}>
            <View style={{}} className="flex flex-row gap-x-4 items-center">
                {goBack && <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons typeIcon="MaterialIcons" nameIcon="arrow-back-ios-new" sizeIcon={18} colorIcon="#fff" />
                </TouchableOpacity>}
                <CustomText style={{ fontWeight: '700', fontSize: 18, color: '#fff', flex: 1, textAlign: goBack ? 'left' : 'center' }}>{title}</CustomText>
            </View>
        </View >
    )
}