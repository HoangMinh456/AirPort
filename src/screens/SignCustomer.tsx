import { Dimensions, View } from "react-native"
import HeaderNavigation from "../components/HeaderNavigation";
import CustomColors from "../../colors";
import AgreePolicy from "../components/AgreePolicy";
import { useEffect, useRef, useState } from "react";
import CustomText from "../components/CustomText";
import Button from "../components/Button";
import useNotifi from "../hooks/useNotifi";
import SignatureView from "react-native-signature-canvas";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { resetAllStateTicketInfor, saveSignature, setStatusTicketInfor } from "../store/slices/ticketInforSclice";
import { updateMemberCard } from "../store/thunks/memberCardThunk";
import { createTicketPlan } from "../store/thunks/ticketInforThunk";

const { width, height } = Dimensions.get('window');

export default function SignCustomer() {
    const navigation = useNavigation<any>()
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const { modal, loading } = useNotifi();
    const dispatch = useAppDispatch();

    //Thông tin từ state User
    const userId = useSelector((state: any) => state.auth.information._id);

    //Thông tin từ state thẻ thành viên (Member Card)
    const eCode = useSelector((state: any) => state.memberCard.eCode);
    const statusMemberCard = useSelector((state: any) => state.memberCard.status);
    const errorMemberCard = useSelector((state: any) => state.memberCard.error);

    //Thông tin từ state lưu dữ liệu để tạo Ticket Plan
    const signature = useSelector((state: any) => state.ticketInfor.signature);
    const dataTicket = useSelector((state: any) => state.ticketInfor)
    const signatureRef = useRef<any>(null)
    const statusTicketInfor = useSelector((state: any) => state.ticketInfor.status);
    const error = useSelector((state: any) => state.ticketInfor.error);

    // console.log('dataTIcket: ', dataTicket);
    const onSubmit = () => {
        if (isChecked === true && signature !== '') {
            // modal({ title: 'Đăng ký thành công!' });
            // navigation.navigate('History')
            const data = {
                userId: userId,
                userUse: dataTicket.userUse,
                otherUse: dataTicket.otherUse,
                userTicket: dataTicket.myTicketPicture,
                otherTicket: dataTicket.otherTicketPicture,
                signature: signature
            }
            // Tạo vé máy bay
            dispatch(createTicketPlan(data))
        }
        if (isChecked !== true) {
            modal({ title: 'Thông báo', message: 'Vui lòng đồng ý với điều khoản và dịch vụ' });
        }
        if (signature === '') {
            signatureRef.current?.readSignature();
            modal({ title: 'Thông báo', message: 'Vui lòng ký xác nhận' });
            return
        }
    }

    //lưu chữ ký sau khi dừng bút
    const handleEnd = () => {
        if (signatureRef.current) {
            signatureRef.current.readSignature();
        }
    };

    const handleOk = (signature: any) => {
        // console.log('Chú ký base64: ', signature)
        dispatch(saveSignature(signature))
        // modal({ title: 'Thành công', message: 'Lưu chữ ký thành công!' })
    }

    //Chạy chức năng theo từng trạng thái của TicketInfor (Tạo ticket plan)
    useEffect(() => {
        if (statusTicketInfor && statusTicketInfor === 'pendingCreateTicketPlan') {
            loading();
            return;
        } else if (statusTicketInfor === 'successCreateTicketPlan') {
            //Cập nhật số lượng sử dụng của Member Card
            dispatch(updateMemberCard({ eCode: eCode, userUse: dataTicket.userUse, otherUse: dataTicket.otherUse }));
            dispatch(resetAllStateTicketInfor());
            return;
        } else if (statusTicketInfor === 'failCreateTicketPlan') {
            modal({ title: 'Lỗi', message: 'Thất bại, vui lòng thử lại!' })
        }

    }, [statusTicketInfor]);

    //Chạy chức năng theo từng trạng thái của MemberCard (Cập nhật số lượt sử dùng còn lại của MemberCard)
    useEffect(() => {
        if (statusMemberCard && statusMemberCard === 'pendingUpdateMemberCard') {
            loading();
            return;
        }
        //Chuyển trang sau khi cập nhật xong
        if (statusMemberCard && statusMemberCard === 'successUpdateMemberCard') {
            modal({ title: 'Thông báo', message: 'Thành công' });
            navigation.navigate('History');
            dispatch(setStatusTicketInfor());
            return;
        }
        if (statusMemberCard && statusMemberCard === 'failUpdateMemberCard') {
            modal({ title: 'Lỗi khi cập nhật MemberCard', message: errorMemberCard })
        }
    }, [statusMemberCard]);

    if (error) console.log('error: ', error);
    if (errorMemberCard) console.log('error MemberCard: ', errorMemberCard);

    return (
        <View style={{ width: width, height: height, backgroundColor: CustomColors.backgroundColor }}>
            <View className="flex justify-between h-full gap-y-5">
                <HeaderNavigation title="Chữ ký khách hàng" />
                <View className="px-5 flex flex-grow gap-y-5">
                    <AgreePolicy value={isChecked} onChange={setIsChecked} styleChexBox={{ marginLeft: -6 }} />
                    <CustomText style={{ color: CustomColors.primary, fontWeight: '700', fontSize: 14, lineHeight: 24 }}>
                        Khách hàng ký tên dưới đây, xác nhận đã nhận quyền lợi sử dụng dịch vụ phòng khách hạng thương gia Quốc nội dành cho chủ thẻ cao cấp
                    </CustomText>
                    <View className="flex-1" style={{ backgroundColor: '#fff', borderRadius: 10, height: 'auto', overflow: "hidden" }}>
                        <CustomText style={{ color: '#000', fontWeight: 400, fontSize: 13, paddingVertical: 16, textAlign: 'center' }}>Quý khách vui lòng ký xác nhận sử dụng dịch vụ:</CustomText>
                        <SignatureView
                            ref={signatureRef}
                            onOK={handleOk}
                            onEnd={handleEnd}
                            clearText=""
                            confirmText=""
                            autoClear={false}
                            descriptionText=""
                            webStyle={`
                                .m-signature-pad {
                                  box-shadow: none;
                                  border: none;
                                }
                              
                                .m-signature-pad--footer {
                                  display: none !important;
                                }
                              
                                canvas {
                                  border: none !important;
                                  box-shadow: none !important;
                                }
                            `}
                        />
                    </View>
                </View>
                <Button onPressContinue={() => onSubmit()} />
            </View>
        </View>
    )
}