import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import CitySelector from '../../components/CitySelector'
import './index.scss'

export default function Home() {
  const [currentCity, setCurrentCity] = useState('北京')
  
  const [movies] = useState([
    {
      id: 1,
      title: '纯真年代的爱情',
      date: '2026-02-03',
      tags: ['主创映后'],
      poster: '', // Placeholder
    },
    {
      id: 2,
      title: '年少有为',
      date: '2026-01-31',
      tags: ['主创映后'],
      poster: '',
    },
    {
      id: 3,
      title: '非传统浪漫关系',
      date: '2026-01-31',
      tags: ['主创映后'],
      poster: '',
    },
    {
      id: 4,
      title: '菜肉馄饨',
      date: '2025-11-15',
      tags: ['主创映后'],
      poster: '',
    },
    {
      id: 5,
      title: '暗黑新娘！',
      date: '2026-03-06',
      tags: [],
      poster: '',
    },
  ])

  return (
    <View className='home-page'>
      {/* 顶部导航 */}
      <View className='nav-header'>
        <View className='nav-left'>
          <CitySelector 
            value={currentCity} 
            onChange={(city) => {
              console.log('选择的城市:', city)
              setCurrentCity(city)
            }} 
          />
        </View>
        <Text className='nav-title'>近期电影</Text>
        <View className='nav-right'></View>
      </View>

      {/* 电影列表 */}
      <View className='movie-list'>
        {movies.map(movie => (
          <View className='movie-card' key={movie.id}>
            {/* 电影海报 */}
            <View className='poster-wrapper'>
              <View className='poster-placeholder'>
                <Text>Poster</Text>
              </View>
            </View>

            {/* 电影信息 */}
            <View className='movie-info'>
              <Text className='movie-title'>{movie.title}</Text>
              
              <View className='tags-row'>
                {movie.tags.map((tag, index) => (
                  <Text className='tag' key={index}>{tag}</Text>
                ))}
              </View>
              
              <Text className='movie-date'>{movie.date} 上映</Text>
            </View>

            {/* 操作按钮 */}
            <View className='movie-action'>
              <View className='btn-action' onClick={() => Taro.navigateTo({ url: '/pages/activity/detail?id=' + movie.id })}>
                <Text>查看活动</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
