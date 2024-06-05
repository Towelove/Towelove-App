import { View } from 'react-native'
import Weather from './weather'

const WeatherLayout = ({className}:{className?:string}) => {
  return (
    <View className={(className?className:'')}>
      <Weather />
      </View>
  )
}

export default WeatherLayout