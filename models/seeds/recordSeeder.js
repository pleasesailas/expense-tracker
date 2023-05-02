const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')

//載入database
const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const SEED_USERS = require('../seedsData/user.json')
const SEED_RECORDS = require('../seedsData/record.json')

// user records 分配
SEED_USERS[0].recordsList = [0, 1, 2, 4]
SEED_USERS[1].recordsList = [3]

db.once('open', async () => {
  try {
    // “先“ 撈出資料庫的所有資料
    const categoryData = await Category.find({})
    return Promise.all(
      //create user: 目前有 2 user 使用 map進行
      SEED_USERS.map(async (user) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const createdUser = await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
        console.log(`${createdUser} created!`)

        // 處理 records 與users 的關係
        const userRecords = user.recordsList.map(index => {
          // 將所有資料依[index]分配給不同user 
          const record = SEED_RECORDS[index]
          // 把不同的user._id 記錄到各自的records中
          record.userId = createdUser._id
          //處理records 與 category 的關係
          const referenceCategory = categoryData.find((data) => {
            //找到第一筆data.name 與record.category 完全相同並用return 返回資訊記錄在referenceCategory
            return data.name === record.category
          })
          //紀錄 categoryId 並回傳
          record.categoryId = referenceCategory._id
          return record
        })
        await Record.create(userRecords)
      })
    )
      .then(() => {
        console.log('all done')
        process.exit()
      })
      .catch(err => console.log(err))
  } catch (err) {
    console.log(err)
  }
})
