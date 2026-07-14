import '../list/index.scss'
import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { listActivitiesByMovie } from '@/api/activity'
import { formatTimestamp } from '@/utils/date'
import NullPage from '@/components/NullPage/index'
import ActivityCard from '@/components/activityCard/index'
import './index.scss'

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

  const navigateToDetail = (id) => {
    Taro.navigateTo({ url: '/pages/activity/detail?id=' + id })
  }

  return (
    <View className='list-page'>
      {/* <View className='section-title'>活动列表</View> */}

      { events.length > 0 && 
        <View  className='event-list'>
        {events.map((e) => (
          <ActivityCard key={e.id} e={e} navigateToDetail={navigateToDetail} />
        ))}
        </View>
      }
      {events.length === 0 && <NullPage text='暂无相关活动' />}
    </View>
  )
}

