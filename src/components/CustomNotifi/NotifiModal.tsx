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
    const title = useSelector((state: any) => state.notifi.title);
    const stateNotifi = useSelector((state: any) => state.notifi);
    // console.log('onPressButtonAccept: ', stateNotifi.onPressButtonAccept);
    if (notifiType === 'hidden') { return null; }

    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <View className={`w-${width}px h-screen flex justify-center items-center bg-black/50`}>
                <View style={{ width: width * 9 / 10 }} className="bg-white rounded-xl p-4 gap-y-8">
                    <CustomText className="text-black font-bold text-xl text-center">{title}</CustomText>
                    {message && <CustomText className="text-black text-center">{message}</CustomText>}
                    {button
                        ?
                        <View className="flex gap-y-2">
                            <TouchableOpacity onPress={() => stateNotifi.onPressButtonClose !== undefined ? stateNotifi.onPressButtonClose : hidden()}
                                style={{ backgroundColor: CustomColors.sercond }}
                                className="flex items-center justify-center py-2 rounded-full"
                            >
                                <CustomText className="text-black">
                                    {(stateNotifi.titleButtonClose && stateNotifi.titleButtonClose !== '') ? stateNotifi.titleButtonClose : 'Đóng'}
                                </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => stateNotifi.onPressButtonAccept && stateNotifi.onPressButtonAccept !== undefined ? stateNotifi.onPressButtonAccept : hidden()}
                                style={{ backgroundColor: CustomColors.primary }}
                                className="flex items-center justify-center py-2 rounded-full"
                            >
                                <CustomText className="text-white">
                                    {(stateNotifi.titleButtonAccept && stateNotifi.titleButtonAccept !== '') ? stateNotifi.titleButtonAccept : 'Đã hiểu'}
                                </CustomText>
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