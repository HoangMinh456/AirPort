
import { showLoading, ShowModal, showOff } from "../store/slices/notifiSlice";
import { useAppDispatch } from "../store/store";

const useNotifi = () => {
    const dispatch = useAppDispatch();

    const hidden = () => {
        dispatch(showOff());
    };

    const loading = () => {
        dispatch(showLoading());
    };

    const modal = ({ message, button, title }: { message?: string, button?: boolean, title: string }) => {
        dispatch(ShowModal({ message: message, button: button, title: title }));
    };

    return { hidden, loading, modal };
};

export default useNotifi;