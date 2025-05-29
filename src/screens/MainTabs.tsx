import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import User from "./User";
import HistoryScreen from "./HistoryScreen";
import Icons from "../components/Icons";
import CustomColors from "../../colors";
import CustomText from "../components/CustomText";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Home') {
                        return <Icons typeIcon="Entypo" nameIcon="home" sizeIcon={26} colorIcon={focused ? CustomColors.primary : '#000000'} />
                    }
                    if (route.name === 'History') {
                        return <Icons typeIcon="MaterialCommunityIcons" nameIcon="history" sizeIcon={26} colorIcon={focused ? CustomColors.primary : '#000000'} />
                    }
                    if (route.name === 'User') {
                        return <Icons typeIcon="FontAwesome6" nameIcon="user-large" sizeIcon={26} colorIcon={focused ? CustomColors.primary : '#000000'} />
                    }
                },


                tabBarActiveTintColor: CustomColors.primary,
                tabBarInactiveTintColor: '#6F6F6F',

                tabBarLabel: ({ focused, color }) => {
                    if (route.name === 'Home') {
                        return <CustomText style={{ color, fontWeight: focused ? '700' : '400', fontSize: 14, marginTop: -20 }}>Trang chủ</CustomText>
                    }
                    if (route.name === 'History') {
                        return <CustomText style={{ color, fontWeight: focused ? '700' : '400', fontSize: 14, marginTop: -20 }}>Lịch sử</CustomText>
                    }
                    if (route.name === 'User') {
                        return <CustomText style={{ color, fontWeight: focused ? '700' : '400', fontSize: 14, marginTop: -20 }}>Cá nhân</CustomText>
                    }
                },

                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#ffffff',
                    elevation: 20,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: 12
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
            <Tab.Screen name="User" component={User} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}