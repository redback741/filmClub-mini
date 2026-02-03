import { View, Text, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function CitySelector({ value = '北京', onChange }) {
  const [visible, setVisible] = useState(false)
  
  const cities = [
    { name: '北京', value: 'Beijing' },
    { name: '上海', value: 'Shanghai' },
    { name: '广州', value: 'Guangzhou' },
    { name: '深圳', value: 'Shenzhen' },
    { name: '杭州', value: 'Hangzhou' },
    { name: '成都', value: 'Chengdu' },
    { name: '武汉', value: 'Wuhan' },
    { name: '南京', value: 'Nanjing' },
    { name: '西安', value: 'Xi\'an' },
    { name: '重庆', value: 'Chongqing' },
    { name: '天津', value: 'Tianjin' },
    { name: '苏州', value: 'Suzhou' }
  ]

  const handleToggle = (e) => {
    e.stopPropagation()
    setVisible(!visible)
  }

  const handleSelect = (city, e) => {
    e.stopPropagation()
    if (onChange) {
      console.log('选择的城市:', city)
      onChange(city.name)
    }
    setVisible(false)
  }

  // 点击遮罩层关闭
  const handleMaskClick = (e) => {
    e.stopPropagation()
    setVisible(false)
  }

  return (
    <View className='city-selector'>
      {/* 触发区域 */}
      <View className='selector-trigger' onClick={handleToggle}>
        <Text className='current-city'>{value}</Text>
        <Text className={`arrow ${visible ? 'up' : ''}`}>▼</Text>
      </View>

      {/* 下拉菜单 & 遮罩 */}
      {visible && (
        <View className='selector-dropdown-container'>
          {/* 全屏透明遮罩，用于点击外部关闭 */}
          <View className='dropdown-mask' onClick={handleMaskClick}></View>
          
          {/* 下拉列表 */}
          <View className='dropdown-list'>
            <ScrollView scrollY className='city-scroll'>
              {cities.map(city => (
                <View 
                  key={city.value} 
                  className={`city-item ${value === city.name ? 'active' : ''}`}
                  onClick={(e) => handleSelect(city, e)}
                >
                  <Text>{city.name}</Text>
                  {value === city.name && <Text className='check-mark'>✓</Text>}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  )
}
