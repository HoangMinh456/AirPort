import { Dimensions, View } from "react-native"
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";
import AgreePolicy from "../components/AgreePolicy";
import { useState } from "react";
import CustomText from "../components/CustomText";
import Button from "../components/Button";
import useNotifi from "../hooks/useNotifi";

const { width, height } = Dimensions.get('window');

export default function SignCustomer() {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const { modal } = useNotifi();

    const onSubmit = () => {
        if (isChecked === true) {
            modal({ title: 'Đăng ký thành công!' });
        } else {
            modal({ title: 'Thông báo', message: 'Vui lòng đồng ý với điều khoản và dịch vụ' })
        }
    }

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full gap-y-5">
                <HeaderNavigation title="Chữ ký khách hàng" />
                <View className="px-5 flex flex-grow gap-y-5">
                    <AgreePolicy value={isChecked} onChange={setIsChecked} styleChexBox={{ marginLeft: -6 }} />
                    <CustomText style={{ color: CustomColors.primary, fontWeight: '700', fontSize: 14, lineHeight: 24 }}>
                        Khách hàng ký tên dưới đây, xác nhận đã nhận quyền lợi sử dụng dịch vụ phòng khách hạng thương gia Quốc nội dành cho chủ thẻ cao cấp
                    </CustomText>
                    <View className="flex-1" style={{ backgroundColor: '#fff', borderRadius: 10, height: 'auto' }}>
                        <CustomText style={{ color: '#000', fontWeight: 400, fontSize: 13, paddingTop: 16, textAlign: 'center' }}>Quý khách vui lòng ký xác nhận sử dụng dịch vụ:</CustomText>
                    </View>
                </View>
                <Button onPressContinue={() => onSubmit()} />
            </View>
        </View>
    )
}