import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import Icons from "../components/Icons";
import DatePicker from "react-native-date-picker";
import { useState } from "react";

const { width, height } = Dimensions.get('window')

const fakeData = [
    {
        id: '1',
        roomName: 'Thương gia sông hồng',
        nameCustomer: 'Nguyễn Vân Anh',
        used: 1,
        followWith: 2,
        date: new Date('2025-08-31T15:10:00')
    },
    {
        id: '2',
        roomName: 'Thương gia sông hồng',
        nameCustomer: 'Hoàng Minh',
        used: 1,
        followWith: 1,
        date: new Date('2025-07-15T15:00:00')
    }
]

export default function HistoryScreen() {
    const [openFromDate, setOpenFromDate] = useState<boolean>(false);
    const [fromDate, setFromDate] = useState<Date | null>(null);

    const [openToDate, setOpenToDate] = useState<boolean>(false);
    const [toDate, setToDate] = useState<Date | null>(null);

    const filterDate = fakeData.filter((dateTime) => {
        //Không chọn
        if (!fromDate && !toDate) return true

        //Chuyển date về 00:00:00 để dễ so sánh
        const userDate = new Date(dateTime.date).setHours(0, 0, 0, 0);
        const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
        const to = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

        if (from && to) return userDate >= from && userDate <= to;
        if (from) return userDate >= from;
        if (to) return userDate <= to;

        return true;
    })

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Lịch sử" goBack={false} />
                {/* Giao diện khi chưa có giao dịch nào  */}
                {/* <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', position: 'relative' }}>
                        <CustomText style={{ fontSize: 16, color: CustomColors.black, paddingVertical: 16 }}>DD/MM/YYYY</CustomText>
                        <View style={{ position: 'absolute', right: '25%' }}>
                            <Icons typeIcon="Fontisto" nameIcon="date" colorIcon="#808080" />
                        </View>
                    </View>
                    <DatePicker
                        mode="date"
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false);
                            setDate(date)
                        }}
                        onCancel={() => setOpen(false)}
                    />
                </TouchableOpacity>
                <View style={{ flexGrow: 1 }}>
                    <CustomText style={{ color: CustomColors.black, fontSize: 14, textAlign: 'center', marginTop: '20%' }}>Chưa có giao dịch nào</CustomText>
                </View> */}

                {/* Giao diện khi đã có giao dịch  */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', position: 'relative', padding: 10 }}>
                    <CustomText style={{ color: '#000', fontSize: 13, fontWeight: '300' }}>Từ</CustomText>
                    <TouchableOpacity onPress={() => setOpenFromDate(true)}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 16, borderWidth: 1, borderColor: '#C1C8D1', borderRadius: 5, padding: 8 }}>
                            <CustomText style={{ fontSize: 13, color: CustomColors.black, paddingVertical: 0 }}>{fromDate !== null ? `${fromDate?.getDate()}/${fromDate?.getMonth() + 1}/${fromDate?.getFullYear()}` : 'DD/MM/YYYY'}</CustomText>
                            <Icons typeIcon="Fontisto" nameIcon="date" colorIcon="#808080" sizeIcon={20} />
                        </View>
                    </TouchableOpacity>
                    <CustomText style={{ color: '#000', fontSize: 13, fontWeight: '300' }}>đến</CustomText>
                    <TouchableOpacity onPress={() => setOpenToDate(true)}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 16, borderWidth: 1, borderColor: '#C1C8D1', borderRadius: 5, padding: 8 }}>
                            <CustomText style={{ fontSize: 13, color: CustomColors.black, paddingVertical: 0 }}>{toDate !== null ? `${toDate?.getDate()}/${toDate?.getMonth() + 1}/${toDate.getFullYear()}` : 'DD/MM/YYYY'}</CustomText>
                            <Icons typeIcon="Fontisto" nameIcon="date" colorIcon="#808080" sizeIcon={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Date Picker */}
                <DatePicker
                    mode="date"
                    modal
                    open={openFromDate}
                    date={fromDate || new Date()}
                    onConfirm={(date) => {
                        setOpenFromDate(false);
                        setFromDate(date)
                    }}
                    onCancel={() => setOpenFromDate(false)}
                />
                <DatePicker
                    mode="date"
                    modal
                    open={openToDate}
                    date={toDate || new Date()}
                    onConfirm={(date) => {
                        setOpenToDate(false);
                        setToDate(date)
                    }}
                    onCancel={() => setOpenToDate(false)}
                />
                <ScrollView>
                    <View style={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 20, rowGap: 10 }}>
                        {
                            fakeData?.length > 0
                                ?
                                filterDate.map((item: any) => {
                                    return (
                                        <View key={item.id} style={{ rowGap: 5, paddingHorizontal: 20, paddingVertical: 16, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, backgroundColor: '#fff' }}>
                                            <View style={styles.containerViewTicket}>
                                                <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>Phòng chờ</CustomText>
                                                <CustomText style={{ flexGrow: 1, color: CustomColors.primary, fontSize: 15, fontWeight: '700', paddingLeft: 4 }}>{item.roomName}</CustomText>
                                                <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>({item.used + item.followWith})</CustomText>
                                            </View>
                                            <View style={styles.containerViewTicket}>
                                                <CustomText style={styles.label}>Họ và tên:</CustomText>
                                                <CustomText style={styles.text}>{item.nameCustomer}</CustomText>
                                            </View>
                                            <View style={styles.containerViewTicket}>
                                                <CustomText style={styles.label}>Thời gian sử dụng:</CustomText>
                                                <CustomText style={styles.text}>{`${item.date.getHours()}:${item.date.getMinutes().toString().padStart(2, '0')} - ${item.date.getDate()}/${item.date.getMonth() + 1}/${item.date.getFullYear()}`}</CustomText>
                                            </View>
                                            <View style={styles.containerViewTicket}>
                                                <CustomText style={styles.label}>Số lượt sử dụng:</CustomText>
                                                <CustomText style={styles.text}>{item.used}</CustomText>
                                            </View>
                                            <View style={styles.containerViewTicket}>
                                                <CustomText style={styles.label}>Số lượt khách đi kèm:</CustomText>
                                                <CustomText style={styles.text}>{item.followWith}</CustomText>
                                            </View>
                                        </View>
                                    )
                                })
                                :
                                <View style={{ flexGrow: 1 }}>
                                    <CustomText style={{ color: CustomColors.black, fontSize: 14, textAlign: 'center', marginTop: '20%' }}>Chưa có giao dịch nào</CustomText>
                                </View>
                        }

                        {/* <View style={{ rowGap: 5, paddingHorizontal: 20, paddingVertical: 16, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, backgroundColor: '#fff' }}>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>Phòng chờ</CustomText>
                            <CustomText style={{ flexGrow: 1, color: CustomColors.primary, fontSize: 15, fontWeight: '700', paddingLeft: 4 }}>Thương gia sông hồng</CustomText>
                            <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>(3)</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Họ và tên:</CustomText>
                            <CustomText style={styles.text}>Nguyễn Vân Anh</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Thời gian sử dụng:</CustomText>
                            <CustomText style={styles.text}>15:00 - 31/08/2025</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Số lượt sử dụng:</CustomText>
                            <CustomText style={styles.text}>1</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Số lượt khách đi kèm:</CustomText>
                            <CustomText style={styles.text}>2</CustomText>
                        </View>
                    </View>
                    <View style={{ rowGap: 5, paddingHorizontal: 20, paddingVertical: 16, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, backgroundColor: '#fff' }}>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>Phòng chờ</CustomText>
                            <CustomText style={{ flexGrow: 1, color: CustomColors.primary, fontSize: 15, fontWeight: '700', paddingLeft: 4 }}>Thương gia sông hồng</CustomText>
                            <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>(3)</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Họ và tên:</CustomText>
                            <CustomText style={styles.text}>Nguyễn Vân Anh</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Thời gian sử dụng:</CustomText>
                            <CustomText style={styles.text}>15:00 - 31/08/2025</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Số lượt sử dụng:</CustomText>
                            <CustomText style={styles.text}>1</CustomText>
                        </View>
                        <View style={styles.containerViewTicket}>
                            <CustomText style={styles.label}>Số lượt khách đi kèm:</CustomText>
                            <CustomText style={styles.text}>2</CustomText>
                        </View>
                    </View> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: '400',
        flexGrow: 1,
        paddingLeft: 4,
        color: '#000000'
    },
    label: {
        fontSize: 13,
        fontWeight: '300',
        color: '#000000'
    },
    containerViewTicket: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})