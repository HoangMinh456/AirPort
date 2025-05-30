import { useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import HeaderNavigation from "../components/HeaderNavigation";
import Icons from "../components/Icons";
import ModalSupportPhone from "../components/ModalSupportPhone";

const { width, height } = Dimensions.get('window');

export default function UserInforScreen() {
    const [modalVisible, setModalVisiable] = useState<boolean>(false);

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Thông tin cá nhân" goBack={false} />
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 32 }} className="BIG_LOGO_CONTAINER">
                    <View style={{ backgroundColor: '#fff', padding: 8, borderRadius: 9999 }} className="LOGO">
                        <FastImage style={{ width: 82, height: 82, borderRadius: 9999 }} source={Image.resolveAssetSource(require('../assets/logo-red-face.png'))} resizeMode="cover" />
                    </View>
                </View>
                <View style={{ display: 'flex', rowGap: 10, paddingHorizontal: 16, flexGrow: 1 }} className="OPTIONS">
                    <TouchableOpacity onPress={() => setModalVisiable(true)}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingVertical: 16, paddingHorizontal: 20, columnGap: 25 }}>
                            <View style={{ width: 28, height: 28, backgroundColor: CustomColors.primary, borderRadius: 9999, position: 'relative' }}>
                                <CustomText style={styles.supportIcon}>?</CustomText>
                            </View>
                            <View style={{ display: 'flex', rowGap: 4 }}>
                                <CustomText style={{ color: '#000000', fontSize: 15, fontWeight: '700' }}>Hỗ trợ</CustomText>
                                <CustomText style={{ color: '#000000', fontSize: 13, fontWeight: '300' }}>Giải đáp thắc mắc</CustomText>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingVertical: 16, paddingHorizontal: 20, columnGap: 25 }}>
                        <Icons typeIcon="FontAwesome6" nameIcon="user-large" colorIcon={CustomColors.primary} sizeIcon={27} />
                        <View style={{ display: 'flex', rowGap: 4 }}>
                            <CustomText style={{ color: '#000000', fontSize: 15, fontWeight: '700' }}>Sửa thông tin</CustomText>
                            <CustomText style={{ color: '#000000', fontSize: 13, fontWeight: '300' }}>Cập nhật thông tin cá nhân</CustomText>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingVertical: 16, paddingHorizontal: 20, columnGap: 25 }}>
                        <Icons typeIcon="MaterialCommunityIcons" nameIcon="key" colorIcon={CustomColors.primary} sizeIcon={27} />
                        <View style={{ display: 'flex', rowGap: 4 }}>
                            <CustomText style={{ color: '#000000', fontSize: 15, fontWeight: '700' }}>Đổi mật khẩu</CustomText>
                            <CustomText style={{ color: '#000000', fontSize: 13, fontWeight: '300' }}>Đảm bảo an toàn tài khoản</CustomText>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingVertical: 16, paddingHorizontal: 20, columnGap: 25 }}>
                        <Icons typeIcon="MaterialCommunityIcons" nameIcon="login-variant" colorIcon={CustomColors.primary} sizeIcon={27} />
                        <View style={{ display: 'flex', rowGap: 4 }}>
                            <CustomText style={{ color: '#000000', fontSize: 15, fontWeight: '700' }}>Đăng xuất</CustomText>
                            <CustomText style={{ color: '#000000', fontSize: 13, fontWeight: '300' }}>Thoát khỏi tài khoản</CustomText>
                        </View>
                    </View>
                </View>
            </View>
            <ModalSupportPhone modalVisible={modalVisible} setModalVisiable={setModalVisiable} />
        </View>
    )
}

const styles = StyleSheet.create({
    supportIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            { translateX: -5.5 },
            { translateY: -15.5 },
        ],
        fontSize: 22,
        fontWeight: '600',
        color: '#fff'
    }
})