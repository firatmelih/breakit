import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigation } from './src/components/Navigation/BottomTabNavigation'
import { Provider } from 'react-redux'
import { store } from './src/store'

export default function App() {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <BottomTabNavigation/>
        </Provider>
      </NavigationContainer>
  )
}
