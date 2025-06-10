import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDataUser } from "../store/slices/authSlice";

export default function RootNavigator() {
    const emailUser = useSelector((state: any) => state.auth.information.email);
    const dispatch = useAppDispatch();
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