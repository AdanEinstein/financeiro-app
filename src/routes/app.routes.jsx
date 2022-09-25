import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import Home from "../screens/Home"
import Sales from "../screens/Sales";
import New from "../screens/New";

const {Navigator, Screen} = createBottomTabNavigator()

export default function AppRoutes(){
    return (
        <Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "#E0D10E",
                headerStyle: {
                    backgroundColor: "#555",
                },
                tabBarActiveTintColor: "#E0D10E",
                tabBarInactiveTintColor: "#ddd",
                tabBarStyle: {
                    backgroundColor: "#222",
                    height: 60,
                }
            }}
        >
            <Screen 
                name="Home" 
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({size, color}) => {
                        return <MaterialIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
            <Screen 
                name="Vendas" 
                component={Sales}
                options={{
                    tabBarLabel: 'Vendas',
                    tabBarIcon: ({size, color}) => {
                        return <MaterialIcons
                            name="attach-money"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
            <Screen 
                name="Novo" 
                component={New}
                options={{
                    tabBarLabel: 'Novo',
                    tabBarIcon: ({size, color}) => {
                        return <MaterialIcons
                            name="add"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
        </Navigator>
    );
}