import { StyleSheet, Text } from 'react-native'
import { Colors } from '../../config/Colors'
import { connect } from 'react-redux'

const Component = ({ children, theme, style, size, bold }) => {

  const level = {
    'small':12,
    'medium':16,
    'large':18
  }

  const styles = StyleSheet.create(({
    text: {
      color: Colors[theme].color,
      fontSize: level[size] || level['small'],
      padding: 5,
      fontWeight: bold?'bold':'normal'
    }
  }))

  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  )
}
const mapState = (state) => {
  const { theme } = state.appState
  return { theme }
}

export const AText = connect(mapState, {}, null, {
  forwardRef: true
})(Component)
