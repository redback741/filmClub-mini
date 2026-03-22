import { View, Text } from '@tarojs/components'
import './detail.scss'
import Taro, { useLoad } from '@tarojs/taro'
import { getActivityDetail, registerActivity } from '@/api/activity'
import { useState } from 'react'
import { formatTimestamp } from '@/utils/date'



export default function Detail() {
  // 从路由参数获取活动ID
  const { id } = Taro.getCurrentInstance().router?.params || {}


  // 初始化
  const [activity, setActivity] = useState({})

  const fetchActivity = async () => {
    try {
      const res = await getActivityDetail(id)
      if (res && res.success) {
        setActivity(res.data || {})
      }
    } catch (e) {
      console.error(e)
    }
  }

  useLoad(async () => {
    await fetchActivity()
  })



  // 报名活动
  const handleRegister = async () => {
    try {
      if (activity.registrationStatus === 1) {
        Taro.showToast({
          title: '您已报名该活动',
          icon: 'none'
        })
        return
      }
      const res = await registerActivity(id)
      if (res.code === 200 || res.code === 201) {
        Taro.showToast({
          title: '报名成功',
          icon: 'success'
        })
        // 刷新页面数据
        await fetchActivity()
      }
    } catch (e) {
      console.error(e)
    }
  }



  // 设置页面标题
  Taro.setNavigationBarTitle({
    title: '活动详情'
  })
  return (
    <View className='activity-detail'>
      <View className='detail-card'>
        <View className='poster'>
          <View className='poster-placeholder'>
            UNDERGROUND
          </View>
        </View>
        <View className='meta'>
          <Text className='title'>《{activity.movieName}》</Text>
          <View className='row'>
            <Text className='label'>导演</Text>
            <Text className='value'>{activity.director ? activity.director : '-'}</Text>
          </View>
          <View className='row'>
            <Text className='label'>拍摄时间</Text>
            <Text className='value'>{activity.shootingTime ? activity.shootingTime : '-'}</Text>
          </View>
          <View className='row'>
            <Text className='label'>地区</Text>
            <Text className='value'>{activity.city}</Text>
          </View>
          <View className='row score-row'>
            <Text className='label'>豆瓣评分</Text>
            <View className='value'>
              <Text className='score'>{activity.doubanRating ? activity.doubanRating : '-'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className='schedule'>
        <Text className='time pr-20'>{activity.startTime ? formatTimestamp(activity.startTime, 'yyyy年mm月dd日 hh:MM:ss') : '-'}</Text>
        <Text className='cinema'>{activity.address ? activity.address : '-'}</Text>
      </View>

      {/* 报名按钮 */}
      {
        activity.status === 1 && activity.registrationStatus === 0 && (
          <View className='btn-enroll' onClick={handleRegister}>
            <Text>报名活动</Text>
          </View>
        )
      }
      {
        activity.status === 1 && activity.registrationStatus === 1 && (
          <View className='btn-enroll disabled' onClick={handleRegister}>
            <Text>已报名</Text>
          </View>
        )
      }
    </View>
  )
}
