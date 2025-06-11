
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

    const modal = (
        {
            title,
            message,
            button,
            titleButtonClose,
            onPressButtonClose,
            titleButtonAccept,
            onPressButtonAccept
        }
            :
            {
                title: string,
                message?: string,
                button?: boolean,
                titleButtonClose?: string,
                onPressButtonClose?: any,
                titleButtonAccept?: string,
                onPressButtonAccept?: any
            }
    ) => {
        // console.log('Đã kích hoạt modal');
        return dispatch(
            ShowModal({
                title: title,
                message: message,
                button: button,
                titleButtonClose: titleButtonClose,
                onPressButtonClose: onPressButtonClose,
                titleButtonAccept: titleButtonAccept,
                onPressButtonAccept: onPressButtonAccept
            })
        );
    };

    return { hidden, loading, modal };
};

export default useNotifi;