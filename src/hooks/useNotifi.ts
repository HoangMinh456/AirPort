import { showLoading, ShowModal, showOff } from "../reducers/notifiSlice";
import { useAppDispatch } from "../store/store";

const useNotifi = () => {
    const dispatch = useAppDispatch();

    const hidden = () => {
        dispatch(showOff());
    };

    const loading = () => {
        dispatch(showLoading());
    };

    const modal = ({ message, button }: { message: string, button?: boolean }) => {
        console.log('notifi mess: ', message);
        dispatch(ShowModal({ message: message, button: button }));
        console.log('dispatch active');
    };

    return { hidden, loading, modal };
};

export default useNotifi;