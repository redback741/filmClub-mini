import './index.scss'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import CitySelector from '../../components/CitySelector'

export default function List() {
  const [city, setCity] = useState('成都')
  
  // 日期相关状态
  const [currentDate, setCurrentDate] = useState(new Date()) // 当前选中日期
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // 调整到周一
    return new Date(d.setDate(diff))
  })

  // 计算本周的7天
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  // 格式化日期显示 M/D
  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  // 切换周
  const handlePrevWeek = () => {
    const newStart = new Date(weekStart)
    newStart.setDate(weekStart.getDate() - 7)
    setWeekStart(newStart)
  }

  const handleNextWeek = () => {
    const newStart = new Date(weekStart)
    newStart.setDate(weekStart.getDate() + 7)
    setWeekStart(newStart)
  }

  // 选中日期
  const handleDateClick = (date) => {
    setCurrentDate(date)
  }

  // 判断是否选中
  const isSelected = (date) => {
    return date.getDate() === currentDate.getDate() && 
           date.getMonth() === currentDate.getMonth() &&
           date.getFullYear() === currentDate.getFullYear()
  }

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
          <View className='header-center'>
            <Text className='arrow' onClick={handlePrevWeek}>«</Text>
            <Text className='header-range'>{formatDate(weekDays[0])} - {formatDate(weekDays[6])}</Text>
            <Text className='arrow' onClick={handleNextWeek}>»</Text>
          </View>
        
        {/* 星期行 */}
        <View className='week-row'>
          {['一','二','三','四','五','六','日'].map((d) => (
            <View key={d} className='week-item'>
              <Text className='day-name'>{d}</Text>
            </View>
          ))}
        </View>

        {/* 日期行 */}
        <View className='week-row day-row'>
          {weekDays.map((date) => (
            <View 
              key={date.toISOString()} 
              className={`day ${isSelected(date) ? 'active' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <Text className='day-number'>{date.getDate()}</Text>
            </View>
          ))}
        </View>
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
