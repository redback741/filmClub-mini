import { View, Text } from '@tarojs/components'
import './index.scss'

export default function NullPage(props) {
  return (
    <View className='null-page'>
      <Text className='null-text'>{props.text || '暂无数据'}</Text>
    </View>
  )
}