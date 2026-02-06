import { View, Text } from '@tarojs/components'
import './detail.scss'
import Taro from '@tarojs/taro'

export default function Detail() {
  // 设置页面标题
  Taro.setNavigationBarTitle({
    title: '活动详情'
  })
  return (
    <View className='activity-detail'>
      <View className='detail-card'>
        <View className='poster'>
          <View className='poster-placeholder'>
            UNDERGROUND
          </View>
        </View>
        <View className='meta'>
          <Text className='title'>《地下》</Text>
          <View className='row'>
            <Text className='label'>导演</Text>
            <Text className='value'>埃米尔·库斯图里卡</Text>
          </View>
          <View className='row'>
            <Text className='label'>拍摄时间</Text>
            <Text className='value'>1995</Text>
          </View>
          <View className='row'>
            <Text className='label'>地区</Text>
            <Text className='value'>南斯拉夫,法国,德国,保加利亚,捷克,匈牙利,英国,美国</Text>
          </View>
          <View className='row score-row'>
            <Text className='label'>豆瓣评分</Text>
            <View className='value'>
              <Text className='score'>9.2</Text>
            </View>
          </View>
        </View>
      </View>

      <View className='schedule'>
        <Text className='time'>02月06日 19:00</Text>
        <Text className='cinema'>小西天艺术影院 1号厅</Text>
      </View>

      {/* 报名按钮 */}
      <View className='btn-enroll'>
        <Text>报名活动</Text>
      </View>
    </View>
  )
}
