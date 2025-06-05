import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
import { useSelector } from "react-redux";

export default function RootNavigator() {
    const emailUser = useSelector((state: any) => state.auth.information.email);
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