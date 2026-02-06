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
  
  try {
    // 检查用户是否存在
    const userRes = await usersCollection.where({
      _openid: openid
    }).get()

    if (userRes.data.length > 0) {
      // 用户存在，更新信息
      await usersCollection.where({
        _openid: openid
      }).update({
        data: {
          nickName,
          avatarUrl,
          lastLoginTime,
          updatedAt: db.serverDate()
        }
      })
      console.log('用户数据同步云端成功 Update')
      return {
        action: 'update',
        success: true
      }
    } else {
      // 用户不存在，创建新用户
      await usersCollection.add({
        data: {
          _openid: openid,
          nickName,
          avatarUrl,
          lastLoginTime,
          createdAt: db.serverDate(),
          updatedAt: db.serverDate()
        }
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

    return {
      success: false,
      errMsg: err.message
    }
  }
}
