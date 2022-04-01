import AsyncStorage from '@react-native-async-storage/async-storage'

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

export const removeAddiction = async (newAddictions) => {
  const addictions = JSON.stringify(newAddictions)
  await AsyncStorage.setItem('addictions', addictions)
}
