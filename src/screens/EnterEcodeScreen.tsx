import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import CustomColors from "../../colors";
import Button from "../components/Button";
import EnterOwnerInfor from "../components/EnterOwnerInfor";
import HeaderNavigation from "../components/HeaderNavigation";
import ScanOrEnterEcode from "../components/ScanOrEnterEcode";
import useNotifi from "../hooks/useNotifi";

const { width, height } = Dimensions.get('window');

export default function EnterEcodeScreen({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const [swichCase, setSwitchCase] = useState<string>('ENTER_ECODE');
    const { modal } = useNotifi();

    //Dùng cho components EnterOwnerInfor
    const [checkInfor, setCheckInfor] = useState<boolean>(false);

    const onSubmit = (data: any) => {
        console.log('data: ', data)
        if (swichCase === 'ENTER_ECODE') {
            if (data.eCode === '24042004') {
                setSwitchCase('OWNER_INFOR');
            } else {
                modal({ title: 'Thông báo', message: 'E Code không tồn tại' })
            }
        }

        if (swichCase === 'OWNER_INFOR') {
            if (data.name === 'HoangMinh' && data.card === '123456') {
                setCheckInfor(true);
            } else {
                modal({ title: 'Thông báo', message: 'Thông tin khách hàng không tồn tại!' })
            }
        }

        if (checkInfor === true) {
            navigation.navigate('SnapShootTicket');
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
            <View className="flex justify-between h-full">
                <HeaderNavigation title="Nhập mã Ecode" />
                {switchBody()}
                <Button swichCase={swichCase} setSwitchCase={setSwitchCase} onPressContinue={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}