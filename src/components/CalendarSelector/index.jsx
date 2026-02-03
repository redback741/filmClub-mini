import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import './index.scss'

export default function CalendarSelector({ value, onChange }) {
  const [currentDate, setCurrentDate] = useState(value || new Date())
  const [weekStart, setWeekStart] = useState(() => {
    const d = value ? new Date(value) : new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // 调整到周一
    return new Date(d.setDate(diff))
  })

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value))
    }
  }, [value])

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
    if (onChange) {
      onChange(date)
    }
  }

  // 判断是否选中
  const isSelected = (date) => {
    return date.getDate() === currentDate.getDate() && 
           date.getMonth() === currentDate.getMonth() &&
           date.getFullYear() === currentDate.getFullYear()
  }

  return (
    <View className='calendar-selector'>
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
  )
}
