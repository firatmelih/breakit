import { AText } from '../Atoms/AText'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../config/Colors'
import { connect } from 'react-redux'

const Component = ({theme, onPress, size, children, style,notText}) =>{
  const level = {
    'large':300,
    'medium':200,
    'small':100
  }
  const styles = StyleSheet.create({
    circleButton:{
      borderRadius: level[size] || 100,
      borderColor: Colors[theme].color,
      borderWidth: 5,
      width: level[size] || 200,
      height: level[size] || 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    circleButtonText: {
      fontWeight: 'bold',
      fontSize: level[size]/7 || 14,
      textAlign: 'center',
      color: Colors[theme].color
    },
  })
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.circleButton,style]}
    >
      {
        notText?children:<AText size={size} style={styles.circleButtonText}>{children}</AText>
      }
    </TouchableOpacity>
  )
}

const mapState = (state) => {
  const { theme } = state.appState
  return { theme }
}

export const MCircleButton = connect(mapState, {}, null, {
  forwardRef: true
})(Component)
