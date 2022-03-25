import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Main } from "../Pages/Main"

const BottomTab = createBottomTabNavigator()

export const BottomTabNavigation = () => {
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen name='Home' component={Main}/>
        </BottomTab.Navigator>
    )
}