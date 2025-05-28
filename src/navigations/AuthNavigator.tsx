import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterPinScreen from "../screens/EnterPinScreen";
import CreatePassword from "../screens/CreatePassword";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import { SafeAreaView, StatusBar } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomColors from "../../colors";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colors.lighter }}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor='#790F11'
            />
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EnterPin" component={EnterPinScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
            </Stack.Navigator>
        </SafeAreaView>
    );
};