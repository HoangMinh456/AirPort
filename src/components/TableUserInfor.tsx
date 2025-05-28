import { TouchableOpacity, View } from "react-native";
import Icons from "./Icons";
import CustomText from "./CustomText";
import CustomColors from "../../colors";
import CustomTextInput from "./CustomTextInput";

export default function TableUserInfor() {
    return (
        <View className="flex px-4">
            <View style={{ display: 'flex', rowGap: 14 }} className="rounded-tl-[10px] rounded-tr-[10px] bg-white p-4">
                <View className="flex flex-row justify-between items-center gap-x-3">
                    <View style={{ paddingVertical: 6, paddingHorizontal: 8, borderRadius: 9999, backgroundColor: '#0D5AA690', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Icons typeIcon="FontAwesome6" nameIcon="user" colorIcon="#fff" sizeIcon={22} />
                    </View>
                    <View style={{ flexGrow: 1 }}>
                        <CustomText style={{ color: '#05213D', fontWeight: '700', fontSize: 18 }} className="uppercase">nguyễn vân anh</CustomText>
                        <CustomText style={{ fontSize: 11, color: '#6C6C6C' }} className="uppercase">mkh: hgui68dv</CustomText>
                    </View>
                    <Icons typeIcon="Octicons" nameIcon="history" colorIcon="#0D5AA690" sizeIcon={24} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#DDDDDD', paddingVertical: 8 }}>
                    <View style={{ paddingVertical: 8, display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CustomText className="text-black">Tổng số lượt:</CustomText>
                        <CustomText style={{ fontSize: 20, fontWeight: '700', color: '#0D5AA6' }}>10</CustomText>
                    </View>
                    <View style={{ width: 1, backgroundColor: '#DDDDDD', marginHorizontal: 16 }}></View>
                    <View style={{ paddingVertical: 8, display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CustomText className="text-black">Số lượt đã sử dụng:</CustomText>
                        <CustomText style={{ fontSize: 20, fontWeight: '700', color: CustomColors.primary }}>2</CustomText>
                    </View>
                </View>
                <View className="flex flex-row gap-x-8">
                    <CustomText style={{ marginTop: 4, color: '#000000' }}>Còn lại:</CustomText>
                    <View className="flex flex-1">
                        <View className="flex flex-row items-center">
                            <CustomText style={{ fontSize: 20, color: '#E78700', fontWeight: '700', marginRight: 8 }}>3</CustomText>
                            <CustomText style={{ color: '#6C6C6C', marginRight: 4 }}>(HSD: 31/08/2025)</CustomText>
                            <CustomText style={{ color: '#6C6C6C', fontStyle: 'italic', fontWeight: '200', flex: 1 }}>Áp dụng cho 1 khách</CustomText>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#DDDDDD', marginVertical: 8 }}></View>
                        <View className="flex flex-row items-center">
                            <CustomText style={{ fontSize: 20, color: '#06BA36', fontWeight: '700', marginRight: 8 }}>5</CustomText>
                            <CustomText style={{ color: '#6C6C6C', marginRight: 4 }}>(HSD: 31/08/2025)</CustomText>
                            <CustomText style={{ color: '#6C6C6C', fontStyle: 'italic', fontWeight: '200', flex: 1 }}>Được thêm 1 khách đi kèm</CustomText>
                        </View>
                    </View>
                </View>
            </View>
            <View className="bg-white flex flex-row justify-between items-center w-full relative p-4">
                <View style={{ backgroundColor: '#E6E6E6', borderRadius: 9999, position: 'absolute', zIndex: 20, left: -15 }} className="p-4 rounded-full"></View>
                <View style={{ height: 1, flexGrow: 1, backgroundColor: '#E6E6E6' }}></View>
                <View style={{ backgroundColor: '#E6E6E6', borderRadius: 9999, position: 'absolute', zIndex: 20, right: -15 }} className="p-4 rounded-full"></View>
            </View>
            <View className="rounded-bl-[10px] rounded-br-[10px] bg-white p-4 text-center">
                <View className="flex gap-y-4">
                    <View className="flex flex-row justify-between items-center">
                        <CustomText style={{ color: '#000000' }}>Số lượt sử dụng:</CustomText>
                        <View style={{ width: '55%', position: 'relative' }}>
                            <CustomTextInput defaultValue="0" style={{ borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 5, textAlign: 'center' }} keyboardType="numeric" />
                            <View className="w-10 h-full absolute top-0 right-0 flex items-center">
                                <TouchableOpacity className="h-1/2 pt-[10px]">
                                    <Icons typeIcon="MaterialIcons" nameIcon="arrow-drop-up" colorIcon="#666666" sizeIcon={24} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ transform: [{ rotate: '180deg' }] }} className="h-1/2 pt-[10px]">
                                    <Icons typeIcon="MaterialIcons" nameIcon="arrow-drop-up" colorIcon="#666666" sizeIcon={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className="flex flex-row justify-between items-center">
                        <CustomText style={{ color: '#000000' }}>Số người đi cùng:</CustomText>
                        <View style={{ width: '55%', position: 'relative' }}>
                            <CustomTextInput defaultValue="0" style={{ borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 5, textAlign: 'center' }} keyboardType="numeric" />
                            <View className="w-10 h-full absolute top-0 right-0 flex items-center">
                                <TouchableOpacity className="h-1/2 pt-[10px]" onPress={() => console.log('up')}>
                                    <Icons typeIcon="MaterialIcons" nameIcon="arrow-drop-up" colorIcon="#666666" sizeIcon={24} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ transform: [{ rotate: '180deg' }] }} className="h-1/2 pt-[10px]" onPress={() => console.log('down')}>
                                    <Icons typeIcon="MaterialIcons" nameIcon="arrow-drop-up" colorIcon="#666666" sizeIcon={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}