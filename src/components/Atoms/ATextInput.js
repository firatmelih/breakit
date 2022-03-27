import { StyleSheet, TextInput } from 'react-native'
import { Colors } from '../../config/Colors'
import { connect } from 'react-redux'

const Component = ({ onChangeText, inputValue, theme, size }) => {
  const level = {
    'large':12,
    'medium':16,
    'small':18
  }
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 5,
      width: level[size] || '75%',
      minHeight:25,
      margin:5,
      textAlign: 'center',
      color: Colors[theme].inputColor,
      backgroundColor: Colors[theme].inputBackgroundColor
    }
  })
  return (
    <TextInput
      onChangeText={onChangeText}
      value={inputValue}
      style={styles.input}
    />
  )
}

const mapState = (state) => {
  const { theme } = state.appState
  return { theme }
}

export const ATextInput = connect(mapState, {}, null, {
  forwardRef: true
})(Component)
