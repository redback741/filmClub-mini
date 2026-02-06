import './index.scss'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import CitySelector from '../../components/CitySelector'
import CalendarSelector from '../../components/CalendarSelector'
import { withLoginModal } from '../../components/withLoginModal'

function List() {
  const [city, setCity] = useState('成都')
  const [currentDate, setCurrentDate] = useState(new Date()) // 当前选中日期

  const events = [
    {
      id: 1,
      title: '闪灵',
      cinema: '万象影城(万象城店)',
      tags: ['IMAX激光', 'IMAX海报'],
      group: '守望者观影团',
      datetime: '2026-02-07 14:00'
    },
    {
      id: 2,
      title: '爱乐之城',
      cinema: '万达影城(金牛店)',
      tags: ['IMAX激光'],
      group: '克洛诺斯观影团',
      datetime: '2026-02-07 14:00'
    },
    {
      id: 3,
      title: '爱乐之城',
      cinema: '英皇电影城(IFS国金中心店)',
      tags: ['IMAX激光'],
      group: 'IMAX Squad 成都影迷团',
      datetime: '2026-02-07 14:10'
    }
  ]

  return (
    <View className='list-page'>
      <View className='list-header'>
        <View className='header-top'>
          <View className='header-left'>
            <CitySelector value={city} onChange={setCity} />
          </View>
        </View>
        
        <CalendarSelector 
          value={currentDate} 
          onChange={setCurrentDate} 
        />
      </View>

      <View className='section-title'>{currentDate.getFullYear()}-{String(currentDate.getMonth() + 1).padStart(2, '0')}-{String(currentDate.getDate()).padStart(2, '0')} 活动</View>

      <View className='event-list'>
        {events.map((e) => (
          <View key={e.id} className='event-card'>
            <View className='event-main'>
              <Text className='event-title'>{e.title}</Text>
              <Text className='event-cinema'>{e.cinema}</Text>
              <View className='tags'>
                {e.tags.map((t) => (
                  <Text key={t} className={`tag ${t==='IMAX激光'?'blue':''} ${t==='IMAX海报'?'orange':''}`}>{t}</Text>
                ))}
              </View>
            </View>
            <View className='event-meta'>
              <Text className='group'>{e.group}</Text>
              <Text className='datetime'>{e.datetime}</Text>
              <View className='btn-detail'>
                <Text>查看详情</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default withLoginModal(List)
