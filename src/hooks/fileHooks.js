import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadAddictions } from '../store/actions/addictionActions'

export const getAddictions = async () => {
  let value = []
  try {
    value = await AsyncStorage.getItem('addictions')
    value = await value !== null ? JSON.parse(value) : []
    return value
  } catch (e) {
    console.log(e)
  }
}

export const setAddictions = async (addictions) => {
  let addictionsReadyToSet = JSON.stringify(addictions)
  await AsyncStorage.setItem('addictions', addictionsReadyToSet)
}

export const wipeAddictions = async () => {
  await AsyncStorage.clear()
}
