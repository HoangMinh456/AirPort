import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useNotifi from "../hooks/useNotifi";
import { setDataUser, setStatusIdle } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";

export default function RootNavigator() {
    const emailUser = useSelector((state: any) => state.auth.information.email);
    const signInStatus = useSelector((state: any) => state.auth.status);
    const { loading, hidden } = useNotifi();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (signInStatus && signInStatus === 'pendingSignIn') {
            loading();
            return
        } else if (signInStatus === 'successSignIn') {
            //set trạng thái về ban đầu
            dispatch(setStatusIdle());
            return
        } else {
            hidden()
            return
        }
    }, [signInStatus])
    if (!emailUser) {
        (async () => {
            const data = await AsyncStorage.getItem('userData')
            if (data) {
                dispatch(setDataUser(JSON.parse(data)));
            }
        })()
    }
    return (
        <NavigationContainer>
            {emailUser === '' ?
                <AuthNavigator />
                :
                <UserNavigator />
            }

        </NavigationContainer>
    );
};