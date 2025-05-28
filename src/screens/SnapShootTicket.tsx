import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";
import Icons from "../components/Icons";
import CustomText from "../components/CustomText";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import Button from "../components/Button";
import { useState } from "react";
import useNotifi from "../hooks/useNotifi";

const { width, height } = Dimensions.get('window');

export default function SnapShootTicket({ navigation }: any) {
    const [myPicture, setMyPicture] = useState<boolean>(false)
    const [otherPicture, setOtherPicture] = useState<boolean>(false)
    const { modal } = useNotifi();

    const onSubmit = () => {
        if (myPicture === true) {
            navigation.navigate('SignCustomer');
        } else {
            modal({ title: 'Thông báo', message: 'Vui lòng chụp ảnh thẻ máy bay!' })
        }
    }

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Chụp ảnh vé máy bay" />
                <View style={{ flexGrow: 1, paddingTop: 30, paddingHorizontal: 16, display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                    <TouchableOpacity onPress={() => setMyPicture(!myPicture)}>
                        <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                            <View className="flex flex-row justify-between items-center">
                                <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                                <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay</CustomText>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    {myPicture && <FastImage style={{ width: width - 32, height: 202 }} source={Image.resolveAssetSource(require('../assets/ticket.png'))} resizeMode="cover" />}
                    <TouchableOpacity onPress={() => setOtherPicture(!otherPicture)}>
                        <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                            <View className="flex flex-row justify-between items-center">
                                <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                                <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay của người đi kèm</CustomText>
                                <Icons typeIcon="AntDesign" nameIcon="plus" colorIcon="#C1C8D1" sizeIcon={30} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    {otherPicture && <FastImage style={{ width: width - 32, height: 202 }} source={Image.resolveAssetSource(require('../assets/ticket.png'))} resizeMode="cover" />}
                </View>
                <Button onPressContinue={() => onSubmit()} />
            </View>
        </View>
    )
}