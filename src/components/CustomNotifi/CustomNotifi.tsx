import { useSelector } from "react-redux";
import NotifiLoading from "./NotifiLoading";
import NotifiModal from "./NotifiModal";

export default function CustomNotifi() {
    const notifiType = useSelector((state: any) => state.notifi.type);
    // console.log('notifiType của CustomNofifi: ', notifiType);

    if (notifiType === 'hidden') { return null; }

    if (notifiType === 'loading') {
        return (<NotifiLoading />);
    }

    if (notifiType === 'modal') {
        return (<NotifiModal />);
    }

};