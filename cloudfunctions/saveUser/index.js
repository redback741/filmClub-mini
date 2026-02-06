// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const usersCollection = db.collection('users')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  const { nickName, avatarUrl, lastLoginTime } = event

  // 安全构建待写入的数据，避免 undefined/非法类型导致报错
  const buildData = () => {
    const data = {}
    if (typeof nickName === 'string') {
      data.nickName = nickName
    }
    if (typeof avatarUrl === 'string' && avatarUrl.length > 0) {
      data.avatarUrl = avatarUrl
    }
    if (typeof lastLoginTime === 'string') {
      data.lastLoginTime = lastLoginTime
    }
    return data
  }
  
  try {
    // 检查用户是否存在
    const userRes = await usersCollection.where({
      _openid: openid
    }).get()

    if (userRes.data.length > 0) {
      // 用户存在，更新信息
      const dataToUpdate = buildData()
      dataToUpdate.updatedAt = db.serverDate()

      await usersCollection.where({
        _openid: openid
      }).update({
        data: dataToUpdate
      })
      console.log('用户数据同步云端成功 Update')
      return {
        action: 'update',
        success: true
      }
    } else {
      // 用户不存在，创建新用户
      const dataToAdd = buildData()
      dataToAdd._openid = openid
      dataToAdd.createdAt = db.serverDate()
      dataToAdd.updatedAt = db.serverDate()

      await usersCollection.add({
        data: dataToAdd
      })
      console.log('用户数据同步云端成功 Add')
      return {
        action: 'create',
        success: true
      }
    }
  } catch (err) {
    console.error('saveUser error:', err)
    
    // 针对集合不存在的错误进行友好提示
    if (err.errMsg && (err.errMsg.includes('collection not exists') || err.errMsg.includes('not exist'))) {
      return {
        success: false,
        errMsg: '数据库集合[users]不存在，请在云开发控制台创建该集合',
        error: err
      }
    }

    // 针对属性类型非法的错误进行提示
    if (err.errMsg && err.errMsg.includes('type of property')) {
      return {
        success: false,
        errMsg: '字段类型非法，请确保 avatarUrl、nickName、lastLoginTime 为字符串类型且不为 undefined',
        error: err
      }
    }

    return {
      success: false,
      errMsg: err.message
    }
  }
}
