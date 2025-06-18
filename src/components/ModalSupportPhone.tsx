import { Linking, Modal, TouchableOpacity, View } from "react-native";
import Icons from "./Icons";
import CustomText from "./CustomText";


export default function ModalSupportPhone({ modalVisible, setModalVisiable }: { modalVisible: boolean, setModalVisiable: (value: boolean) => void }) {
    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisiable(false)}
        >
            <TouchableOpacity
                // activeOpacity={1}
                onPress={() => setModalVisiable(false)}
                style={{ flex: 1, rowGap: 8, paddingBottom: 40, paddingHorizontal: 16, backgroundColor: '#00000060', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
            >
                <TouchableOpacity
                    style={{ width: '100%' }}
                    onPress={() => Linking.openURL('tel:0918069869')}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#2C2B30', borderRadius: 10, columnGap: 24, paddingHorizontal: 24, paddingVertical: 16 }}>
                        <View style={{ transform: [{ scaleX: -1 }] }}>
                            <Icons typeIcon="Entypo" nameIcon="phone" colorIcon="#E6E6E6" sizeIcon={27} />
                        </View>
                        <CustomText style={{ color: '#3E8EEC', fontWeight: '500', fontSize: 18 }}>Gọi 091 8069869</CustomText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setModalVisiable(false)}
                    style={{ width: '100%' }}
                >
                    <View style={{ backgroundColor: '#2C2B30', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText style={{ color: '#3E8EEC', fontWeight: '700', fontSize: 18 }}>Hủy</CustomText>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}