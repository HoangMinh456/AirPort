import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import CustomColors from "../../colors";
import { useNavigation } from "@react-navigation/native";

export default function Button({ onPressContinue, onPressBack, swichCase, setSwitchCase, titleButtonBack = 'Trở lại', titleButtonContinue = 'Tiếp tục', styleButtonBack, styleButtonContinue, styleViewContainer }: { onPressContinue?: () => void, onPressBack?: () => void, swichCase?: string, setSwitchCase?: any, titleButtonBack?: string, titleButtonContinue?: string, styleButtonBack?: any, styleButtonContinue?: any, styleViewContainer?: any }) {
    const navigation = useNavigation();
    return (
        <View style={[{ paddingHorizontal: 16, paddingVertical: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', columnGap: 18 }, styleViewContainer]} className="ViewContainer">
            <TouchableOpacity className="flex-1" onPress={onPressBack || (() => swichCase === 'OWNER_INFOR' ? setSwitchCase('ENTER_ECODE') : navigation.goBack())}>
                <CustomText style={[{ backgroundColor: CustomColors.sercond, borderRadius: 10, paddingVertical: 16, fontSize: 14, textAlign: 'center', color: '#000000' }, styleButtonBack]} >{titleButtonBack}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1" onPress={onPressContinue || (() => console.log('press'))}>
                <CustomText style={[{ backgroundColor: CustomColors.primary, borderRadius: 10, paddingVertical: 16, fontSize: 14, textAlign: 'center', color: '#fff' }, styleButtonContinue]} >{titleButtonContinue}</CustomText>
            </TouchableOpacity>
        </View>
    );
}