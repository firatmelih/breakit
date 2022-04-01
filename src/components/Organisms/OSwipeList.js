import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { AText } from '../Atoms/AText'
import { Colors } from '../../config/Colors'
import { counterFormatter } from '../../utilities/counterFormatter'
import { Languages } from '../../config/Languages'
import { addAddiction, loadAddictions } from '../../store/actions/addictionActions'
import { changeTheme } from '../../store/actions/appActions'
import { removeAddiction, setAddictions } from '../../hooks/fileHooks'

const rowTranslateAnimatedValues = {}
Array(20)
  .fill('')
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1)
  })
const Component = ({ theme, addictions, language, loadAddictions }) => {
  const [time, setTime] = useState(Date.now())
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex:1,
      height:300,
      position:'absolute',
      top:300
    },
    backTextWhite: {
      color: '#fff'
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: Colors[theme].backgroundColor,
      borderColor: Colors[theme].color,
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#ff4040',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75
    },
    backRightBtnRight: {
      backgroundColor: '#ff4040',
      right: 0
    },
    addictionsArea: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between'
    }
  })


  const getListData = async () => {
    return await addictions.map((addiction) => {
      const dateQuit = new Date(addiction.dateStarted)
      return { key: addiction.key, item: addiction.name, time: dateQuit }
    })
  }

  useEffect(async () => {
    let x = await getListData()
    setListData(x)
  }, [addictions])

  const [listData, setListData] = useState([])

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData
    if (
      value < -Dimensions.get('window').width
    ) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }).start(async () => {
        const newData = [...listData]
        const prevIndex = listData.findIndex(item => item.key === key)
        newData.splice(prevIndex, 1)
        setListData(newData)
        let newAddictions = await addictions.filter(addiction => addiction.key != key)
        await removeAddiction(newAddictions)
        await loadAddictions(newAddictions)
        await setAddictions(addictions)
      })
    }
  }

  const renderItem = data => (
    <Animated.View
      style={[
        styles.rowFrontContainer,
        {
          height: rowTranslateAnimatedValues[
            data.item.key
            ].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
          })
        }
      ]}
    >
      <TouchableHighlight
        onPress={(b) => console.log('nothing to do')}
        style={styles.rowFront}
        underlayColor={'#aaa'}
      >

        <View
          style={styles.addictionsArea}
          key={data.item.index}
        >
          <AText style={{ padding: 15 }}>{language === 'tr' ? data.item.item + Languages[language].main.addictionsArea.iQuit : Languages[language].main.addictionsArea.iQuit + data.item.item + Languages[language].main.addictionsArea.for}</AText>
          <AText style={{ padding: 15 }}> {counterFormatter(
            ((time - data.item.time.getTime()) / 1000).toFixed(),
            language
          )}</AText>
        </View>
      </TouchableHighlight>
    </Animated.View>
  )

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
    </View>
  )
}

const mapDispatch = {
  changeTheme,
  loadAddictions,
  addAddiction
}

const mapState = (state) => {
  const { theme, language } = state.appState
  return {
    theme,
    language
  }
}

export const OSwipeList = connect(mapState, mapDispatch, null, {
  forwardRef: true
})(Component)
