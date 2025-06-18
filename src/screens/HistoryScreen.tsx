import { Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";
import Icons from "../components/Icons";
import DatePicker from "react-native-date-picker";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { getAllTicketPlan } from "../store/thunks/ticketInforThunk";
import useNotifi from "../hooks/useNotifi";
import { setStatusTicketInfor } from "../store/slices/ticketInforSclice";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('window')

export default function HistoryScreen() {
    const [openFromDate, setOpenFromDate] = useState<boolean>(false);
    const [fromDate, setFromDate] = useState<Date | null>(null);

    const [openToDate, setOpenToDate] = useState<boolean>(false);
    const [toDate, setToDate] = useState<Date | null>(null);

    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useAppDispatch();
    const { loading, hidden } = useNotifi();
    const userId = useSelector((state: any) => state.auth.information._id);
    const statusTicketInfor = useSelector((state: any) => state.ticketInfor.status);
    const data = useSelector((state: any) => state.ticketInfor.ticketPlanStore);
    const error = useSelector((state: any) => state.ticketInfor.error);

    useFocusEffect(
        useCallback(() => {
            // console.log('Chạy vào trong useFocusEffect');
            dispatch(getAllTicketPlan({ userId }));
        }, [userId])
    );

    // console.log('data: ', data);

    const filterDate = data.filter((dateTime: any) => {
        // console.log('dateTime: ', dateTime);
        //Không chọn
        if (!fromDate && !toDate) return true

        //Chuyển date về 00:00:00 để dễ so sánh
        const userDate = new Date(dateTime.timeUsed).setHours(0, 0, 0, 0);
        const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
        const to = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

        if (from && to) return userDate >= from && userDate <= to;
        if (from) return userDate >= from;
        if (to) return userDate <= to;

        return true;
    })

    useEffect(() => {
        if (statusTicketInfor && statusTicketInfor === 'pendingGetAllTicketPlan') {
            // loading();
            setRefreshing(true);
            return;
        }
        if (statusTicketInfor && statusTicketInfor === 'successGetAllTicketPlan') {
            dispatch(setStatusTicketInfor())
            hidden();
            setRefreshing(false);
            return;
        }
        if (statusTicketInfor && statusTicketInfor === 'failGetAllTicketPlan') {
            hidden();
            return;
        }
    }, [statusTicketInfor])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getAllTicketPlan({ userId }));
    }, [data])

    if (error) return console.log('error HistoryScreen: ', error);

    return (
        <View style={{ width: width, backgroundColor: CustomColors.backgroundColor }}>
            {/* <FlatList
                data={[1]}
                keyExtractor={item => item.toString()}
                renderItem={() => (
                    <> */}
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Lịch sử" goBack={false} />
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
                <View style={{ flexGrow: 1, paddingHorizontal: 16, flex: 1 }}>
                    <FlatList
                        data={filterDate}
                        keyExtractor={(item) => item._id}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View />}
                        renderItem={({ item }) => (
                            <View key={item._id} style={{ rowGap: 5, paddingHorizontal: 20, paddingVertical: 16, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, backgroundColor: '#fff' }}>
                                <View style={styles.containerViewTicket}>
                                    <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>
                                        Phòng chờ
                                    </CustomText>
                                    <CustomText style={{ flexGrow: 1, color: CustomColors.primary, fontSize: 15, fontWeight: '700', paddingLeft: 4 }}>
                                        {item.typeTicket === 'Business' ? 'Thương gia sông hồng' : item.typeTicket === 'Regular' ? 'Phổ thông' : item.typeTicket === 'none' ? 'Chưa xác nhận' : 'Không có dữ liệu'}
                                    </CustomText>
                                    <CustomText style={{ color: CustomColors.primary, fontSize: 15, fontWeight: '700' }}>
                                        ({item.userUse + item.otherUse})
                                    </CustomText>
                                </View>
                                <View style={styles.containerViewTicket}>
                                    <CustomText style={styles.label}>Họ và tên:</CustomText>
                                    <CustomText style={styles.text}>{item.userId.userName}</CustomText>
                                </View>
                                <View style={styles.containerViewTicket}>
                                    <CustomText style={styles.label}>Thời gian sử dụng:</CustomText>
                                    <CustomText style={styles.text}>
                                        {
                                            item.adminConfirm === true
                                                ?
                                                `${new Date(item.timeUsed).getHours()}:${new Date(item.timeUsed).getMinutes().toString().padStart(2, '0')} - ${new Date(item.timeUsed).getDate()}/${new Date(item.timeUsed).getMonth() + 1}/${new Date(item.timeUsed).getFullYear()}`
                                                :
                                                <CustomText style={{ color: '#000', fontSize: 14, fontWeight: '700' }}>Chờ xác nhận</CustomText>
                                        }
                                    </CustomText>
                                </View>
                                <View style={styles.containerViewTicket}>
                                    <CustomText style={styles.label}>Số lượt sử dụng:</CustomText>
                                    <CustomText style={styles.text}>{item.userUse}</CustomText>
                                </View>
                                <View style={styles.containerViewTicket}>
                                    <CustomText style={styles.label}>Số lượt khách đi kèm:</CustomText>
                                    <CustomText style={styles.text}>{item.otherUse}</CustomText>
                                </View>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                </View>
            </View>
            {/* </>
                )}
            /> */}
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