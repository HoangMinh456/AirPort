import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import CustomColors from "../../colors";
import EnterEcodeScreen from "../screens/EnterEcodeScreen";
import MainTabs from "../screens/MainTabs";
import SignCustomer from "../screens/SignCustomer";
import SnapShootTicket from "../screens/SnapShootTicket";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        // <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colors.lighter }}>
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={CustomColors.primary}
            />
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Navigator initialRouteName="MainTabs">
                <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
                <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="SnapShootTicket" component={SnapShootTicket} options={{ headerShown: false }} />
                <Stack.Screen name="SignCustomer" component={SignCustomer} options={{ headerShown: false }} />
                <Stack.Screen name="EnterEcode" component={EnterEcodeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
        // </SafeAreaView>
    )
}