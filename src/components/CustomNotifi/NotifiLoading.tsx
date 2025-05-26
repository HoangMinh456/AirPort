import { View } from "react-native";
import CustomText from "../CustomText";
import { useSelector } from "react-redux";

export default function NotifiLoading() {
    const notifiType = useSelector((state: any) => state.notifi.type);
    console.log('notifiType: ', notifiType);
    if (notifiType === 'hidden') { return null; }

    return (
        <View className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black w-20 h-20">
            <CustomText className="text-black">Spin</CustomText>
        </View>
    );
};