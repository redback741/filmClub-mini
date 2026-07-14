import './index.scss'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import CitySelector from '../../components/CitySelector'
import CalendarSelector from '../../components/CalendarSelector'
import Taro, { useLoad } from '@tarojs/taro'
import { listActivities } from '@/api/activity'
import { formatTimestamp } from '@/utils/date'


export default function List() {
  const [city, setCity] = useState('Beijing')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])

  const hallTypeMap = ['普通厅','IMAX','杜比','CINITY']

  const fetchEvents = async (nextCity, nextDate) => {
    try {
      // 初始化传参 增加startTime 默认为当日时间 时间戳
      const res = await listActivities({
        city: nextCity,
        startTime: nextDate.getTime()
      })
      if (res && res.success) {
        setEvents(Array.isArray(res.data) ? res.data : [])
      }
    } catch (e) {
      console.error(e)
    }
  }

  useLoad(async () => {
    await fetchEvents(city, currentDate)
  })

  return (
    <View className='list-page'>
      <View className='list-header'>
        <View className='header-top'>
          <View className='header-left'>
            <CitySelector
              value={city}
              onChange={async (nextCity) => {
                setCity(nextCity)
                await fetchEvents(nextCity, currentDate)
              }}
            />
          </View>
        </View>
        
        <CalendarSelector 
          value={currentDate} 
          onChange={async (nextDate) => {
            setCurrentDate(nextDate)
            await fetchEvents(city, nextDate)
          }} 
        />
      </View>

      <View className='section-title'>{currentDate.getFullYear()}-{String(currentDate.getMonth() + 1).padStart(2, '0')}-{String(currentDate.getDate()).padStart(2, '0')} 活动</View>

      <View className='event-list'>
        {events.map((e) => (
          <View key={e.id} className='event-card'>
            <View className='event-main'>
              <Text className='event-title'>{e.title || e.name || e.movieName}</Text>
              <Text className='event-cinema'>{e.cinema || e.address}</Text>
              <View className='tags'>
                <Text className='tag'>{hallTypeMap[e.hallType] || '-'}</Text>
              </View>
            </View>
            <View className='event-meta'>
              <Text className='group'>{e.group || e.recruiterName}</Text>

              <Text className='datetime'>{ e.startTime ? formatTimestamp(e.startTime, 'yyyy年mm月dd日 hh:MM:ss') : '-' }</Text>
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
