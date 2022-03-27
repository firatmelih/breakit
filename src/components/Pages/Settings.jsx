import { StyleSheet, View, Image, Pressable,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { changeTheme, changeLanguage } from '../../store/actions/appActions'
import { Colors } from '../../config/Colors'
import { MCircleButton } from '../Molecules/MCircleButton'

import ch from '../../../assets/country-flags/ch.png'
import de from '../../../assets/country-flags/de.png'
import tr from '../../../assets/country-flags/tr.png'
import fr from '../../../assets/country-flags/fr.png'
import en from '../../../assets/country-flags/en.png'

import Ionicons from '@expo/vector-icons/Ionicons'

const Component = ({ theme, changeTheme, language, changeLanguage }) => {

  const languagesArray = ['en','de','tr']
  let languageIndex = languagesArray.indexOf(language)

  const imageAccordingToLanguage = (language) => {
    if(language==='en'){
      return <Image source={en} style={{  width: 90, height: 90 }} />
    }
    if(language==='de'){
      return <Image source={de} style={{  width: 90, height: 90 }} />
    }
    if(language==='tr'){
      return <Image source={tr} style={{  width: 90, height: 90 }} />
    }
    if(language==='fr'){
      return <Image source={fr} style={{  width: 90, height: 90 }} />
    }
    if(language==='ch'){
      return <Image source={ch} style={{  width: 90, height: 90 }} />
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme].backgroundColor,
      color: Colors[theme].color
    },
    buttonsArea: {
      position:'absolute',
      flexDirection: 'row',
      flexWrap: 'wrap',
      display:'flex',
      justifyContent: 'space-between',
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.buttonsArea}>

        <MCircleButton
          size={'small'}
          notText
          onPress={() => {
            if(languageIndex===languagesArray.length-1){
              languageIndex=0
            }
            else{
              languageIndex+=1
            }
            changeLanguage(languagesArray[languageIndex])
          }}
        >{imageAccordingToLanguage(language)}</MCircleButton>
        <MCircleButton
          size={'small'}
          onPress={() => {
            let newTheme = theme === 'dark' ? 'light' : 'dark'
            changeTheme(newTheme)
          }}
        ><Ionicons name="color-palette" size={24}  /></MCircleButton>
      </View>
    </View>
  )
}

const mapState = (state) => {
  const { theme, language } = state.appState
  return {
    theme,
    language
  }
}

const mapDispatch = {
  changeTheme,
  changeLanguage
}

export const Settings = connect(mapState, mapDispatch, null, {
  forwardRef: true
})(Component)

