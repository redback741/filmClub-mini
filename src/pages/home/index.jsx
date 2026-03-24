import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import CitySelector from '../../components/CitySelector'
import './index.scss'
import Taro, { useLoad } from '@tarojs/taro'
import { listMovies } from '@/api/movies'
import { formatTimestamp } from '@/utils/date'


export default function Home() {
  const [currentCity, setCurrentCity] = useState('北京')
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const res = await listMovies({ isRecently: true })
      if (res.code === 200 || res.code === 201) {
        setMovies(Array.isArray(res.data) ? res.data : [])
      }
    } catch (e) {
      console.error(e)
    }
  }

  useLoad(async () => {
    await fetchMovies()
  })

  return (
    <View className='home-page'>
      {/* 顶部导航 */}
      <View className='nav-header'>
        <View className='nav-left'>
          {/* <CitySelector 
            value={currentCity} 
            onChange={(city) => {
              console.log('选择的城市:', city)
              setCurrentCity(city)
            }} 
          /> */}
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
                <Image className='poster-image' src={movie.posterUrl || ''} />
              </View>
            </View>

            {/* 电影信息 */}
            <View className='movie-info'>
              <Text className='movie-title'>{movie.movieName}</Text>
              
              <View className='movie-meta'>
                  <Text className='meta-item'>导演：{movie.director || ''}</Text>
              </View>
              
              <Text className='movie-date'>{formatTimestamp(movie.screeningTime) || ''} 上映</Text>
            </View>

            {/* 操作按钮 */}
            <View className='movie-action'>
              <View className='btn-action' onClick={() => Taro.navigateTo({ url: '/pages/activityByMovie/index?movieId=' + movie.id })}>  
                <Text>查看活动</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
