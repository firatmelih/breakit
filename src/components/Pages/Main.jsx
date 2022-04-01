import { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { changeTheme } from '../../store/actions/appActions'
import { addAddiction, loadAddictions, loadNumberAddictions } from '../../store/actions/addictionActions'
import { Colors } from '../../config/Colors'
import { getAddictions, removeAddiction, setAddictions, wipeAddictions } from '../../hooks/fileHooks'
import { MCircleButton } from '../Molecules/MCircleButton'
import { OModal } from '../Organisms/OModal'
import { Languages } from '../../config/Languages'
import { OSwipeList } from '../Organisms/OSwipeList'


const Component = ({ addictions, theme, changeTheme, loadAddictions, addAddiction, language }) => {
  const [input, setInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [time, setTime] = useState(Date.now())

  useEffect(async () => {
    getAddictions().then(value => loadAddictions(value))
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(async () => {
    await setAddictions(addictions)
  }, [addictions])


  const onSubmitModal = async () => {
    let addictionKeys = await addictions.map(i => i.key)
    if (addictionKeys.length === 0) {
      addictionKeys = [0]
    }
    const maxKey = Math.max(...addictionKeys) + 1
    addAddiction({ 'dateStarted': new Date(), 'name': input, 'key': maxKey })
    await setAddictions(addictions)
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
      color: Colors[theme].color,
      borderWidth: 25,
      borderColor: Colors[theme].backgroundColor
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
      <OSwipeList addictions={addictions}/>

      <MCircleButton
        style={{ position: 'absolute', bottom: 0 }}
        size={'small'}
        onPress={() => {
          removeAddiction()
          Alert.alert(
            Languages[language].main.alert.title,
            Languages[language].main.alert.message,
            [
              {
                text: Languages[language].main.alert.yes,
                onPress: () => {
                  wipeAddictions()
                    .then(res => getAddictions()
                      .then(value => loadAddictions(value)))
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
      {/*{*/}
      {/*  addictions.map((addiction, index) => {*/}
      {/*    let dateQuit = new Date(addiction.dateStarted)*/}
      {/*    const dateToNow = ((time - dateQuit.getTime()) / 1000).toFixed()*/}

      {/*    if (language === 'tr') {*/}
      {/*      return <View*/}
      {/*        style={styles.addictionsArea}*/}
      {/*        key={index}*/}
      {/*      >*/}
      {/*        <AText style={{ padding: 15 }}>*/}
      {/*          {dateToNow > 0 ? counterFormatter(*/}
      {/*            dateToNow,*/}
      {/*            language*/}
      {/*          ) : null}{Languages[language].main.addictionsArea.for}*/}
      {/*        </AText>*/}
      {/*        <AText style={{ padding: 15 }}>*/}
      {/*          {language === 'tr' ? addiction.name + Languages[language].main.addictionsArea.iQuit : Languages[language].main.addictionsArea.iQuit + addiction.name + Languages[language].main.addictionsArea.for}*/}
      {/*        </AText>*/}
      {/*      </View>*/}
      {/*    } else {*/}
      {/*      return <View*/}
      {/*        style={styles.addictionsArea}*/}
      {/*        key={index}*/}
      {/*      >*/}

      {/*        <AText style={{ padding: 15 }}>{language === 'tr' ? addiction.name + Languages[language].main.addictionsArea.iQuit : Languages[language].main.addictionsArea.iQuit + addiction.name + Languages[language].main.addictionsArea.for}</AText>*/}
      {/*        <AText style={{ padding: 15 }}> {dateToNow > 0 ? counterFormatter(*/}
      {/*          dateToNow,*/}
      {/*          language*/}
      {/*        ) : null}</AText>*/}
      {/*      </View>*/}
      {/*    }*/}
      {/*  })*/}
      {/*}*/}
    </View>
  )
}

const mapState = (state) => {
  const { theme, language } = state.appState
  const { addictions, allAddictions } = state.addictionState
  return {
    theme,
    addictions,
    language,
    allAddictions
  }
}

const mapDispatch = {
  changeTheme,
  loadAddictions,
  addAddiction,
  loadNumberAddictions
}

export const Main = connect(mapState, mapDispatch, null, {
  forwardRef: true
})(Component)
