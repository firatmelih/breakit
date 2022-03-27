import { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { changeTheme } from '../../store/actions/appActions'
import { addAddiction, loadAddictions } from '../../store/actions/addictionActions'
import { Colors } from '../../config/Colors'
import { getAddictions, setAddictions, wipeAddictions } from '../../hooks/fileHooks'
import { AText } from '../Atoms/AText'
import { MCircleButton } from '../Molecules/MCircleButton'
import { OModal } from '../Organisms/OModal'
import { counterFormatter } from '../../utilities/counterFormatter'
import { Languages } from '../../config/Languages'


const Component = ({ addictions, theme, changeTheme, loadAddictions, addAddiction, language }) => {
  const [input, setInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    getAddictions().then(value => loadAddictions(value))
    // const interval = setInterval(() => setTime(Date.now()), 1000)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [])

  useEffect(() => {
    console.log(language)
  }, [language])

  useEffect(async () => {
    await setAddictions(addictions)
  }, [addictions])

  const onSubmitModal = () => {
    addAddiction({ 'dateStarted': new Date(), 'name': input })
    toggleModalVisibility()
    setInput('')
  }

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme].backgroundColor,
      color: Colors[theme].color
    },
    addictionsArea: {
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 1,
      justifyContent: 'space-between',
      width: '75%',
      borderColor: Colors[theme].color
    }
  })

  return (
    <View style={{ ...styles[theme], ...styles.container }}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisibility}
      >
        <OModal
          submitModal={onSubmitModal}
          nameOfAddiction={input}
          onChangeText={(e) => setInput(e)}
        />
      </Modal>
      <MCircleButton
        style={{ position: 'absolute', top: 75 }}
        size={'medium'}
        onPress={toggleModalVisibility}
      >
        {Languages[language].main.enterAddiction}
      </MCircleButton>
      <MCircleButton
        style={{ position: 'absolute', right: 0, bottom: 0 }}
        size={'small'}
        onPress={() => {
          Alert.alert(
            Languages[language].main.alert.title,
            Languages[language].main.alert.message,
            [
              {
                text: Languages[language].main.alert.yes,
                onPress: () => {
                  wipeAddictions()
                    .then(res=>getAddictions()
                      .then(value=>loadAddictions(value)))
                }
              },
              {
                text: Languages[language].main.alert.no,
                style: 'cancel'
              }
            ]
          )
        }}
      >{Languages[language].main.wipeData}</MCircleButton>
      {
        addictions.map((addiction, index) => {
          let dateQuit = new Date(addiction.dateStarted)
          const dateToNow = ((time - dateQuit.getTime()) / 1000).toFixed()
          return (<View
            style={styles.addictionsArea}
            key={index}
          >
            <AText style={{ padding: 15 }}>{Languages[language].main.addictionsArea.iQuit + addiction.name + Languages[language].main.addictionsArea.for}</AText>
            <AText style={{ padding: 15 }}> {dateToNow > 0 ? counterFormatter(dateToNow) : null}</AText>
          </View>)
        })
      }
    </View>
  )
}

const mapState = (state) => {
  const { theme, language } = state.appState
  const { addictions } = state.addictionState
  return {
    theme,
    addictions,
    language
  }
}

const mapDispatch = {
  changeTheme,
  loadAddictions,
  addAddiction
}

export const Main = connect(mapState, mapDispatch, null, {
  forwardRef: true
})(Component)
