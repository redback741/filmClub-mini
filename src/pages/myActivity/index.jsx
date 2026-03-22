import '../list/index.scss'
import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { registerListActivity } from '@/api/activity'

export default function MyActivity() {
  const [events, setEvents] = useState([])

  const fetchMyActivities = async () => {
    try {
      const res = await listActivities()
      if (!res || !res.success) return
      const list = Array.isArray(res.data) ? res.data : []
      const myList = list.filter((item) => item && item.registrationStatus === 1)
      setEvents(myList)
    } catch (e) {
      console.error(e)
    }
  }

  useLoad(async () => {
    Taro.setNavigationBarTitle({ title: '我的报名' })
    await fetchMyActivities()
  })

  return (
    <View className='list-page'>
      <View className='section-title'>我的报名活动</View>

      <View className='event-list'>
        {events.map((e) => (
          <View key={e.id} className='event-card'>
            <View className='event-main'>
              <Text className='event-title'>{e.title || e.name || e.movieName}</Text>
              <Text className='event-cinema'>{e.cinema || e.address}</Text>
              <View className='tags'>
                {(Array.isArray(e.tags) ? e.tags : []).map((t) => (
                  <Text key={t} className={`tag ${t === 'IMAX激光' ? 'blue' : ''} ${t === 'IMAX海报' ? 'orange' : ''}`}>{t}</Text>
                ))}
              </View>
            </View>
            <View className='event-meta'>
              <Text className='group'>{e.group || e.recruiterName}</Text>
              <Text className='datetime'>{e.datetime || e.startTime}</Text>
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

