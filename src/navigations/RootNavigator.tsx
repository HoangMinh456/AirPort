import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";

export default function RootNavigator() {
    return (
        <NavigationContainer>
            {/* <AuthNavigator /> */}
            <UserNavigator />
        </NavigationContainer>
    );
};