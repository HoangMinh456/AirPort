import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomColors from "../../colors";
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from "../components/CustomText";
import Icons from "../components/Icons";
import { useState } from "react";
import ModalSupportPhone from "../components/ModalSupportPhone";

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
    const [modalVisible, setModalVisiable] = useState<boolean>(false);

    return (
        <>
            <View style={styles.container1}>
                <FlatList
                    data={[1]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => (
                        <>
                            <View style={{ paddingHorizontal: 24, paddingVertical: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: CustomColors.primary }}>
                                <FastImage style={{ width: 58, height: 58 }} source={Image.resolveAssetSource(require('../assets/headImage.png'))} resizeMode="stretch" />
                                <FastImage style={{ width: 149, height: 52 }} source={Image.resolveAssetSource(require('../assets/logo.png'))} resizeMode="stretch" />
                                <TouchableOpacity onPress={() => setModalVisiable(true)}>
                                    <Entypo style={{ transform: [{ scaleX: -1 }] }} name="phone" size={34} color="#fff" />
                                </TouchableOpacity>
                                <ModalSupportPhone modalVisible={modalVisible} setModalVisiable={setModalVisiable} />
                            </View>
                            <View className="BODY flex gap-y-8 py-8">
                                <View className="flex gap-y-3">
                                    <CustomText className="text-lg font-bold text-black px-5">Nhận diện thẻ ngân hàng</CustomText>
                                    <View className="flex items-center px-3 w-full">
                                        <FlatList
                                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
                                            keyExtractor={(item) => item.toString()}
                                            numColumns={3}
                                            columnWrapperStyle={{ columnGap: 12 }}
                                            ItemSeparatorComponent={() => <View className="py-2"></View>}
                                            renderItem={() => (
                                                <TouchableOpacity onPress={() => navigation.navigate('NumberCardScreen')}>
                                                    <View style={{ paddingHorizontal: 0, paddingVertical: 26, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#fff' }}>
                                                        <FastImage style={{ width: 109, height: 64 }} source={Image.resolveAssetSource(require('../assets/vietbank.png'))} resizeMode="contain" />
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </View>
                                <View className="px-5 flex gap-y-4">
                                    <CustomText className="text-lg font-bold text-black">Nhận diện Ecode</CustomText>
                                    <TouchableOpacity onPress={() => navigation.navigate('EnterEcode')}>
                                        <View style={{ backgroundColor: CustomColors.primary, borderRadius: 10, display: 'flex', flexDirection: 'row' }} className="px-3 py-4">
                                            <Icons typeIcon="MaterialIcons" nameIcon="arrow-back-ios-new" />
                                            <Icons typeIcon="MaterialIcons" nameIcon="arrow-forward-ios" />
                                            <CustomText style={{ color: '#fff', fontSize: 18, fontWeight: '700', paddingLeft: 8 }}>Nhập mã Ecode</CustomText>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container2: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 20,
        height: height / 12,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 20
    },
    container1: {
        width: width,
        position: 'relative',
        backgroundColor: CustomColors.backgroundColor
    }
})