import { ActivityIndicator, Dimensions, Modal, View } from "react-native";
import CustomText from "../CustomText";
import { useSelector } from "react-redux";
import CustomColors from "../../../colors";

const { width, height } = Dimensions.get('window');

export default function NotifiLoading() {
    const notifiType = useSelector((state: any) => state.notifi.type);
    // console.log('notifiType: ', notifiType);
    if (notifiType === 'hidden') { return null; }

    return (
        <Modal animationType='fade' visible={true} transparent={true}>
            <View style={{ width: width, height: height, backgroundColor: '#00000050', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={CustomColors.primary} />
            </View>
        </Modal>
    );
};