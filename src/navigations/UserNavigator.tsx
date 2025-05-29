import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import User from "../screens/User";
import { SafeAreaView, StatusBar } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomColors from "../../colors";
import SnapShootTicket from "../screens/SnapShootTicket";
import SignCustomer from "../screens/SignCustomer";
import EnterEcodeScreen from "../screens/EnterEcodeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import Test from "../screens/Test";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTabs from "../screens/MainTabs";

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
            <Stack.Navigator initialRouteName="Test">
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