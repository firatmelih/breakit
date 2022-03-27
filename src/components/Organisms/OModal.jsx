import { Pressable, StyleSheet, View } from 'react-native'
import { AText } from '../Atoms/AText'
import { ATextInput } from '../Atoms/ATextInput'
import { connect } from 'react-redux'
import { Languages } from '../../config/Languages'
import { Colors } from '../../config/Colors'

const Component = ({ nameOfAddiction, onChangeText, submitModal,theme, language }) => {
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalView: {
      borderRadius: 15,
      backgroundColor: Colors[theme].modalBackgroundColor,
      width: 300,
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
  return (
   <View style={styles.modal}>
     <View style={styles.modalView}>
       <AText bold>{Languages[language].main.modal.iQuit}</AText>
       <ATextInput
         onChangeText={onChangeText}
         inputValue={nameOfAddiction}
       />

       <Pressable
         style={[styles.button, styles.buttonClose]}
         onPress={submitModal}
       >
         <AText bold>{Languages[language].main.modal.enter}</AText>
       </Pressable>
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

export const OModal = connect(mapState, {  }, null, {
  forwardRef: true
})(Component)
