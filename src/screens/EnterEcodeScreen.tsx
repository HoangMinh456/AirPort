import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";
import CustomColors from "../../colors";
import Button from "../components/Button";
import EnterOwnerInfor from "../components/EnterOwnerInfor";
import HeaderNavigation from "../components/HeaderNavigation";
import ScanOrEnterEcode from "../components/ScanOrEnterEcode";
import useNotifi from "../hooks/useNotifi";

const { width, height } = Dimensions.get('window');

export default function EnterEcodeScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            used: '0',
            followWith: '0'
        },
    })
    const [swichCase, setSwitchCase] = useState<string>('ENTER_ECODE');
    const { modal } = useNotifi();

    //Dùng cho components EnterOwnerInfor
    const [checkInfor, setCheckInfor] = useState<boolean>(false);

    const onSubmit = (data: any) => {
        console.log('data: ', data)

        if (checkInfor === true) {
            console.log('Chạy vào đây')
            navigation.navigate('SnapShootTicket');
        }

        if (swichCase === 'ENTER_ECODE') {
            if (data.eCode === '24042004') {
                setSwitchCase('OWNER_INFOR');
                return;
            } else {
                modal({ title: 'Thông báo', message: 'E Code không tồn tại' })
                return;
            }
        }

        if (swichCase === 'OWNER_INFOR') {
            if (data.name === 'HoangMinh' && data.card === '123456') {
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