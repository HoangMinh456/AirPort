import { Dimensions, Modal, TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";
import useNotifi from "../../hooks/useNotifi";
import { useSelector } from "react-redux";
import CustomColors from "../../../colors";

const { width } = Dimensions.get('window');

export default function NotifiModal() {
    const { hidden } = useNotifi();
    const notifiType = useSelector((state: any) => state.notifi.type);
    const message = useSelector((state: any) => state.notifi.message);
    const button = useSelector((state: any) => state.notifi.button);

    if (notifiType === 'hidden') { return null; }

    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <View className={`w-${width}px h-screen flex justify-center items-center bg-black/50`}>
                <View style={{ width: width * 9 / 10 }} className="bg-white rounded-xl p-4">
                    <CustomText className="text-black font-bold text-xl text-center">Thông báo</CustomText>
                    <CustomText className="text-black py-8 text-center">{message}</CustomText>
                    {button
                        ?
                        <View className="flex gap-y-2">
                            <TouchableOpacity onPress={() => hidden()} style={{ backgroundColor: CustomColors.sercond }} className="flex items-center justify-center py-2 rounded-full">
                                <CustomText className="text-black">Đóng</CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => hidden()} style={{ backgroundColor: CustomColors.primary }} className="flex items-center justify-center py-2 rounded-full">
                                <CustomText className="text-white">Đã hiểu</CustomText>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => hidden()} className="">
                            <CustomText style={{ backgroundColor: CustomColors.sercond }} className="text-black text-center rounded-full py-2">Đã hiểu</CustomText>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </Modal>
    );
}