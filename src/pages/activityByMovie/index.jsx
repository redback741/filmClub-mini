import '../list/index.scss'
import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { listActivitiesByMovie } from '@/api/activity'
import { formatTimestamp } from '@/utils/date'

export default function ActivityByMovie() {
  const { movieId } = Taro.getCurrentInstance().router?.params || {}
  const [events, setEvents] = useState([])

  const fetchActivities = async () => {
    try {
      const res = await listActivitiesByMovie(movieId)
      if (res && res.success) {
        setEvents(Array.isArray(res.data) ? res.data : [])
      }
    } catch (e) {
      console.error(e)
    }
  }
  
  useLoad(async () => {
    Taro.setNavigationBarTitle({ title: '相关活动' })
    await fetchActivities()
  })

  return (
    <View className='list-page'>
      <View className='section-title'>活动列表</View>

      <View className='event-list'>
        {events.map((e) => (
          <View key={e.id} className='event-card'>
            <View className='event-main'>
              <Text className='event-title'>{e.title || e.name || e.movieName}</Text>
              <Text className='event-cinema'>{e.cityName || ''}</Text>
              <View className='tags'>
                {(Array.isArray(e.tags) ? e.tags : []).map((t) => (
                  <Text key={t} className={`tag ${t === 'IMAX激光' ? 'blue' : ''} ${t === 'IMAX海报' ? 'orange' : ''}`}>{t}</Text>
                ))}
              </View>
            </View>
            <View className='event-meta'>
              <Text className='group'>{e.group || e.recruiterName}</Text>
              <Text className='datetime'>{formatTimestamp(e.screeningTime)}</Text>
              <View className='btn-detail' onClick={() => Taro.navigateTo({ url: '/pages/activity/detail?id=' + e.id })}>
                <Text>查看详情</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

