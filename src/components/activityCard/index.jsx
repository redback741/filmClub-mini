import { View, Text } from '@tarojs/components'
import { formatTimestamp } from '@/utils/date'
import './index.scss'

export default function ActivityCard({ e, navigateToDetail }) {
  return (
    <View key={e.id} className="event-card">
      <View className="event-main">
        <Text className="event-title">{e.title || e.name}</Text>
        <View className="event-address-name">
          地址：{e.cityName} {e.address}
        </View>
        <View className="event-movie-name">{e.movieName}</View>
        <View className="tags">
          {(Array.isArray(e.tags) ? e.tags : []).map((t) => (
            <Text
              key={t}
              className={`tag ${t === "IMAX激光" ? "blue" : ""} ${t === "IMAX海报" ? "orange" : ""}`}
            >
              {t}
            </Text>
          ))}
        </View>
      </View>
      <View className="event-meta">
        <Text className="group">评分：{e.doubanRating}</Text>
        <Text className="datetime">{formatTimestamp(e.screeningTime)}</Text>
        <View
          className="btn-detail"
          onClick={() =>
            navigateToDetail(e.id)
          }
        >
          <Text>查看详情</Text>
        </View>
      </View>
    </View>
  );
}
