import { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { connect } from 'react-redux'
import { changeTheme } from '../../store/actions/appActions'
import { Colors } from '../../config/Colors'

const Component = ({ theme, changeTheme }) => {
  const [input, setInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme].backgroundColor,
      color: Colors[theme].color,
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      width: '75%',
      textAlign: 'center',
      color: Colors[theme].inputColor,
      backgroundColor: Colors[theme].inputBackgroundColor,
    },
    addictionButton: {
      borderRadius: 100,
      borderColor: Colors[theme].color,
      borderWidth: 5,
      width: 200,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addictionButtonText: {
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'center',
      color: Colors[theme].color,
    },
    text: {
      color: Colors[theme].color,
      padding: 5,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: '#ffffff',
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      borderRadius: 15,
      backgroundColor: '#363636',
      width: 300,
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={{ ...styles[theme], ...styles.container }}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Name of Addiction</Text>
            <TextInput
              onChangeText={(e) => setInput(e)}
              value={input}
              style={styles.input}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.text}>ENTER</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.addictionButton}
      >
        <Text style={styles.addictionButtonText}>Enter Addiction</Text>
      </TouchableOpacity>
      {/* 
      <Pressable
        onPress={() => {
          let newTheme = theme === 'light' ? 'dark' : 'light'
          changeTheme(newTheme)
        }}
      >
        <Text style={styles.text}>changeTheme</Text>
      </Pressable> */}
    </View>
  )
}

const mapState = (state) => {
  const { theme } = state.appState

  return {
    theme,
  }
}

const mapDispatch = {
  changeTheme,
}

export const Main = connect(mapState, mapDispatch, null, {
  forwardRef: true,
})(Component)
