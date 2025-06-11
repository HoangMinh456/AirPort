import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";
import CustomColors from "../../colors";
import Button from "../components/Button";
import EnterOwnerInfor from "../components/EnterOwnerInfor";
import HeaderNavigation from "../components/HeaderNavigation";
import ScanOrEnterEcode from "../components/ScanOrEnterEcode";
import useNotifi from "../hooks/useNotifi";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { getMemberCardByECode } from "../store/thunks/memberCardThunk";
import { saveNumberUses } from "../store/slices/ticketInforSclice";

const { width, height } = Dimensions.get('window');

export default function EnterEcodeScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userUse: '0',
            otherUse: '0'
        },
    })
    const [swichCase, setSwitchCase] = useState<string>('ENTER_ECODE');
    const { modal, loading, hidden } = useNotifi();
    const dispatch = useAppDispatch();
    const eCodeMemberCard = useSelector((state: any) => state.memberCard.eCode);
    const memberCardStatus = useSelector((state: any) => state.memberCard.status);
    const userInfomation = useSelector((state: any) => state.memberCard.userInfomation);
    const errorMemberCard = useSelector((state: any) => state.memberCard.error);
    // console.log('userInfomation: ', userInfomation)

    //Dùng cho components EnterOwnerInfor
    const [checkInfor, setCheckInfor] = useState<boolean>(false);

    const onSubmit = (data: any) => {
        console.log('data: ', data)

        if (checkInfor === true) {
            // console.log('Chạy vào đây')
            if (data.userUse && data.userUse === "1") {
                dispatch(saveNumberUses({ userUse: data.userUse, otherUse: data.otherUse }))
                navigation.navigate('SnapShootTicket');
                return;
            }
            if (data.userUse && data.userUse === "0") {
                modal({ title: 'Thông báo', message: '"Số lượt sử dụng" phải lớn hơn 0' })
                return;
            }
            modal({ title: 'Thông báo', message: '"Số lượt sử dụng" chỉ áp dụng cho 1 khách' })
            return;
        }

        if (swichCase === 'ENTER_ECODE') {
            dispatch(getMemberCardByECode(data.eCode));
            return;
        }

        if (swichCase === 'OWNER_INFOR') {
            if (userInfomation.userName === data.userName && userInfomation.password === data.password) {
                setCheckInfor(true);
                return;
            } else {
                modal({ title: 'Thông báo', message: 'Thông tin khách hàng không tồn tại!' })
                return;
            }
        }
    }

    const switchBody = () => {
        switch (swichCase) {
            case 'ENTER_ECODE':
                if (swichCase === 'ENTER_ECODE') {
                    return <ScanOrEnterEcode control={control} errors={errors} />
                };
            case 'OWNER_INFOR':
                if (swichCase === 'OWNER_INFOR') {
                    return <EnterOwnerInfor control={control} errors={errors} checkInfor={checkInfor} />
                }
        }
    }

    useEffect(() => {
        console.log('eCodeMemberCard: ', eCodeMemberCard)
        if (eCodeMemberCard !== '') {
            console.log('Chạy vào switchCase: ', eCodeMemberCard)
            setSwitchCase('OWNER_INFOR');
            return;
        }

    }, [eCodeMemberCard])

    useEffect(() => {
        if (memberCardStatus && memberCardStatus === 'pendingGetMemberCard') {
            loading();
            return;
        } else if (memberCardStatus === 'successGetMemberCard') {
            hidden();
            return;
        } else if (memberCardStatus === 'failGetMemberCard') {
            modal({ title: 'Thông báo', message: errorMemberCard })
            return;
        }

    }, [memberCardStatus])

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between flex-1">
                <HeaderNavigation title="Nhập mã Ecode" />
                <ScrollView contentContainerStyle={{ height: (checkInfor !== true) ? '100%' : 'auto' }}>
                    <View style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'space-between' }}>
                        {switchBody()}
                        <Button swichCase={swichCase} setSwitchCase={setSwitchCase} onPressContinue={handleSubmit(onSubmit)} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}