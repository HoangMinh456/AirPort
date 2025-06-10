import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import CustomColors from "../../colors";
import Button from "../components/Button";
import CustomText from "../components/CustomText";
import HeaderNavigation from "../components/HeaderNavigation";
import Icons from "../components/Icons";
import useNotifi from "../hooks/useNotifi";
import React, { useState } from "react";
import { useAppDispatch } from "../store/store";
import { removeMyTicket, removeTicket } from "../store/slices/ticketInforSclice";

const { width, height } = Dimensions.get('window');

export default function SnapShootTicket({ navigation }: any) {
    const myTicketPicture = useSelector((state: any) => state.ticketInfor.myTicketPicture);
    const otherTicketPicture = useSelector((state: any) => state.ticketInfor.otherTicketPicture);
    const otherUse = useSelector((state: any) => state.ticketInfor.otherUse);
    const [openSetting, setOpenSetting] = useState(false);
    const [openOtherSetting, setOpenOtherSetting] = useState('')
    const { modal } = useNotifi();
    const dispatch = useAppDispatch();

    const onSubmit = () => {
        if (myTicketPicture !== '' && otherUse.toString() === otherTicketPicture.length.toString()) {
            navigation.navigate('SignCustomer');
            return
        } else if (myTicketPicture === '') {
            modal({ title: 'Thông báo', message: 'Vui lòng chụp ảnh vé máy bay của bạn!' });
            return;
        } else if (otherUse.toString() !== otherTicketPicture.length.toString()) {
            modal({ title: 'Thông báo', message: 'Vui lòng chụp đủ ảnh vé của người đi kèm' });
            return;
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
                        {myTicketPicture !== '' &&
                            <>
                                <TouchableOpacity onPress={() => setOpenSetting(!openSetting)}>
                                    <FastImage style={{ width: width - 32, height: 202 }} source={{ uri: myTicketPicture }} resizeMode="cover" />
                                </TouchableOpacity>
                                {
                                    openSetting &&
                                    // <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    //     <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', { type: 'camera', action: 'changeMyTicket' })}>
                                    //         <CustomText style={{ color: '#000' }}>Chỉnh sửa</CustomText>
                                    //     </TouchableOpacity>
                                    //     <TouchableOpacity onPress={() => dispatch(removeMyTicket())}>
                                    //         <CustomText style={{ color: '#000' }}>Xóa</CustomText>
                                    //     </TouchableOpacity>
                                    // </View>
                                    <Button styleViewContainer={{ paddingHorizontal: 0, paddingVertical: 0 }}
                                        titleButtonBack="Chỉnh sửa"
                                        titleButtonContinue="Xóa"
                                        onPressBack={() => navigation.navigate('OpenCamera', { type: 'camera', action: 'changeMyTicket' })}
                                        onPressContinue={() => modal({
                                            title: "Thông báo",
                                            message: 'Bạn có chắc muốn xóa chứ ?',
                                            button: true,
                                            titleButtonClose: 'Hủy',
                                            titleButtonAccept: 'Chắc chắn',
                                            onPressButtonAccept: () => { dispatch(removeMyTicket()) }
                                        })}
                                    />
                                }
                            </>
                        }
                        {(otherUse > 0) &&
                            <>
                                <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', { type: 'camera', saveTo: 'otherTicketPicture' })}>
                                    <LinearGradient colors={['#FFFFFF', '#D5D5D5']} style={{ display: 'flex', borderWidth: 1, padding: 16, borderRadius: 10, alignItems: 'center', borderColor: '#C1C8D1' }}>
                                        <View className="flex flex-row justify-between items-center">
                                            <Icons typeIcon="Entypo" nameIcon="camera" colorIcon="#C1C8D1" sizeIcon={30} />
                                            <CustomText style={{ color: '#000', flexGrow: 1, paddingLeft: 16 }}>Chụp ảnh vé máy bay của người đi kèm</CustomText>
                                            <Icons typeIcon="AntDesign" nameIcon="plus" colorIcon="#C1C8D1" sizeIcon={30} />
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                                {/* {otherTicketPicture !== '' && <FastImage style={{ width: width - 32, height: 202 }} source={{ uri: otherTicketPicture }} resizeMode="cover" />} */}
                                {
                                    otherTicketPicture.length > 0
                                    &&
                                    otherTicketPicture.map((item: string, index: number) => (
                                        <React.Fragment key={`openOther${index}`}>
                                            <TouchableOpacity onPress={() => setOpenOtherSetting(prev => prev !== `openOther${index}` ? `openOther${index}` : '')}>
                                                <FastImage key={index} style={{ width: width - 32, height: 202 }} source={{ uri: item }} resizeMode="cover" />
                                            </TouchableOpacity>
                                            {
                                                openOtherSetting === `openOther${index}` &&
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', { type: 'camera', action: 'changeTicket', index: index })}>
                                                        <CustomText style={{ color: '#000' }}>Chỉnh sửa</CustomText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => dispatch(removeTicket({ index: index }))}>
                                                        <CustomText style={{ color: '#000' }}>Xóa</CustomText>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </>
                        }
                    </View>
                    <Button onPressContinue={() => onSubmit()} />
                </ScrollView>
            </View >
        </View >
    )
}