import { useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import HeaderNavigation from "../components/HeaderNavigation";
import Icons from "../components/Icons";

const { width, height } = Dimensions.get('window');

export default function UserInfor() {
    const [modalVisible, setModalVisiable] = useState<boolean>(false);

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex h-full">
                <HeaderNavigation title="Thông tin cá nhân" goBack={false} />
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 32 }} className="BIG_LOGO_CONTAINER">
                    <View style={{ backgroundColor: '#fff', padding: 8, borderRadius: 9999 }} className="LOGO">
                        <FastImage style={{ width: 82, height: 82, borderRadius: 9999 }} source={Image.resolveAssetSource(require('../assets/logo-red-face.png'))} resizeMode="cover" />
                    </View>
                </View>
                <View style={{ display: 'flex', rowGap: 10, paddingHorizontal: 16 }} className="OPTIONS">
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
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisiable(false)}
            >
                <View style={{ flex: 1, rowGap: 8, paddingBottom: 40, paddingHorizontal: 16, backgroundColor: '#00000060', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => console.log('Support Phone!')}>
                        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#2C2B30', borderRadius: 10, columnGap: 24, paddingHorizontal: 24, paddingVertical: 16 }}>
                            <View style={{ transform: [{ scaleX: -1 }] }}>
                                <Icons typeIcon="Entypo" nameIcon="phone" colorIcon="#E6E6E6" sizeIcon={27} />
                            </View>
                            <CustomText style={{ color: '#3E8EEC', fontWeight: '500', fontSize: 18 }}>Gọi 091 8069869</CustomText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisiable(false)} style={{ width: '100%' }}>
                        <View style={{ backgroundColor: '#2C2B30', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 16, justifyContent: 'center', alignItems: 'center' }}>
                            <CustomText style={{ color: '#3E8EEC', fontWeight: '700', fontSize: 18 }}>Hủy</CustomText>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    supportIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            { translateX: -5.5 }, // Giả sử phần tử rộng 100, translate -50 để canh giữa
            { translateY: -15.5 }, // Tương tự với chiều cao
        ],
        fontSize: 22,
        fontWeight: '600',
        color: '#fff'
    }
})