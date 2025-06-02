import { Dimensions, Image, ScrollView, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import CustomColors from "../../colors";
import Button from "../components/Button";
import CustomText from "../components/CustomText";
import HeaderNavigation from "../components/HeaderNavigation";
import Icons from "../components/Icons";
import useNotifi from "../hooks/useNotifi";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get('window');

export default function SnapShootTicket({ navigation }: any) {
    const myTicketPicture = useSelector((state: any) => state.ticketPicture.myTicketPicture);
    const otherTicketPicture = useSelector((state: any) => state.ticketPicture.otherTicketPicture);
    const { modal } = useNotifi();

    const onSubmit = () => {
        if (myTicketPicture !== '') {
            navigation.navigate('SignCustomer');
        } else {
            modal({ title: 'Thông báo', message: 'Vui lòng chụp ảnh thẻ máy bay!' })
        }
    }

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Chụp ảnh vé máy bay" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={{ paddingTop: 30, paddingHorizontal: 16, display: 'flex', flexGrow: 1, flex: 1, flexDirection: 'column', rowGap: 16 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', { type: 'camera', saveTo: 'myTicketPicture' })}>
                            <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                                <View className="flex flex-row justify-between items-center">
                                    <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                                    <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay</CustomText>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        {myTicketPicture !== '' && <FastImage style={{ width: width - 32, height: 202 }} source={{ uri: myTicketPicture }} resizeMode="cover" />}
                        <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', { type: 'camera', saveTo: 'otherTicketPicture' })}>
                            <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                                <View className="flex flex-row justify-between items-center">
                                    <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                                    <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay của người đi kèm</CustomText>
                                    <Icons typeIcon="AntDesign" nameIcon="plus" colorIcon="#C1C8D1" sizeIcon={30} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        {otherTicketPicture !== '' && <FastImage style={{ width: width - 32, height: 202 }} source={{ uri: otherTicketPicture }} resizeMode="cover" />}
                    </View>
                    <Button onPressContinue={() => onSubmit()} />
                </ScrollView>
            </View>
        </View>
    )
}