import { AText } from '../components/Atoms/AText'
import { useSelector } from 'react-redux'
import { Languages } from '../config/Languages'

export const counterFormatter = (moment) => {
  const language = useSelector((state) => state.appState.language)
  let time = moment
  const minutes = Math.floor(moment / 60) % 60
  time -= minutes * 60
  const hours = Math.floor(moment / 3600) % 60
  time -= hours * 3600
  const seconds = moment % 60

  return (
    <AText>
      {
        hours > 0 ? hours + Languages[language].main.addictionsArea.hours : '' +
        minutes > 0 ? minutes + Languages[language].main.addictionsArea.minutes : ''
      }
      {
        seconds > 0 ? seconds + Languages[language].main.addictionsArea.seconds : ''
      }
    </AText>
  )
}
