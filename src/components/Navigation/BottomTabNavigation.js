import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Main } from '../Pages/Main'
import { Settings } from '../Pages/Settings'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../config/Colors'
import { connect } from 'react-redux'
import { Languages } from '../../config/Languages'

const BottomTab = createBottomTabNavigator()

 const Navigation = ({theme, language}) => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline'
          }

          // You can return any component that you like here!
          return <Ionicons
            name={iconName}
            size={size}
            color={color}
          />
        },
        tabBarActiveTintColor: Colors[theme].color,
        //Tab bar styles can be added here
        tabBarStyle: {
          paddingVertical: 5,
          backgroundColor: Colors[theme].inputBackgroundColor,
          height: 50,
        },
        title:Languages[language].bottomNav[route.name],
        tabBarLabelStyle: { paddingBottom: 3 }
      })}
    >
      <BottomTab.Screen
        options={{
          headerShown: false
        }}
        name="Home"
        component={Main}
      />
      <BottomTab.Screen
        options={{
          headerShown: false
        }}
        name="Settings"
        component={Settings}
      />
    </BottomTab.Navigator>
  )
}

const mapState = (state) => {
  const { theme, language } = state.appState
  return {
    theme,
    language
  }
}

export const BottomTabNavigation = connect(mapState, {  }, null, {
  forwardRef: true
})(Navigation)
