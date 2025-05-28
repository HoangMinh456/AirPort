import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";
import Icons from "../components/Icons";
import CustomText from "../components/CustomText";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

const { width, height } = Dimensions.get('window');

export default function SnapShootTicket() {
    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Chụp ảnh vé máy bay" />
                <View style={{ flexGrow: 1, paddingTop: 30, paddingHorizontal: 16, display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                    <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                        <View className="flex flex-row justify-between items-center">
                            <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                            <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay</CustomText>
                        </View>
                    </LinearGradient>
                    <FastImage style={{ width: width - 32, height: 202 }} source={Image.resolveAssetSource(require('../assets/ticket.png'))} resizeMode="cover" />
                    <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                        <View className="flex flex-row justify-between items-center">
                            <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                            <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay của người đi kèm</CustomText>
                            <Icons typeIcon="AntDesign" nameIcon="plus" colorIcon="#C1C8D1" sizeIcon={30} />
                        </View>
                    </LinearGradient>
                    <FastImage style={{ width: width - 32, height: 202 }} source={Image.resolveAssetSource(require('../assets/ticket.png'))} resizeMode="cover" />
                </View>
                <View className="px-4 flex flex-row justify-center gap-x-[18px] mb-5">
                    <TouchableOpacity className="flex-1">
                        <CustomText style={{ backgroundColor: CustomColors.sercond, borderRadius: 10 }} className="py-4 text-black text-sm w-full text-center">Trở lại</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1">
                        <CustomText style={{ backgroundColor: CustomColors.primary, borderRadius: 10 }} className="py-4 text-white text-sm w-full text-center">Tiếp tục</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}