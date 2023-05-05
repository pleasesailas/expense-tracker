# 家庭私帳本

運用 Node.js + Express 製作的家庭記帳本。


![image](https://github.com/pleasesailas/expense-tracker/blob/main/public/readmeImage/img1.png)
![image](https://github.com/pleasesailas/expense-tracker/blob/main/public/readmeImage/img2.png)
![image](https://github.com/pleasesailas/expense-tracker/blob/main/public/readmeImage/img3.png)

## 特色功能

1. 可已一般註冊帳號
2. 可以用facebook 連結登入
3. 首頁可以一次瀏覽所有支出的清單
4. 可以在首頁看到所有支出清單的總金額
5. 可以新增支出
6. 可以編輯支出的屬性
7. 可以刪除任何一筆支出 
8. 可以根據「類別」篩選支出，並會同時加總該類別的金額


## 開發工具

* Node.js @v18.15.0
* Express @4.18.2
* express-handlebars @3.0.0
* Bootstrap @5.0.2
* mongoose @6.6.1
* body-parser@1.20.2
* dotenv@16.0.3
* method-override@3.0.0
* bcryptjs@2.4.3
* connect-flash@0.1.1
* express-session@1.17.1
* passport@0.4.1
* passport-local@1.0.0
* passport-facebook@3.0.0


## 安裝與使用

1. 請先確認有安裝 Node.js 、 npm

2. 將專案 clone 至本機:

3. 透過終端機進入資料夾，輸入：
```
npm install
```

4. 設定 MongoDB 連線：
```
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/restaurant?retryWrites=true&w=majority
```

5. 完成連線後輸入：
```
npm run seed
```
若看到All done! 表示種子載入完成，請繼續下一步。

6. 之後輸入：
```
npm run dev
```

7. 若看見此行訊息則代表伺服器已啟動
```
Express is listening on http://localost:3000
```

8. 打開瀏覽器進入到以下網址
```
http://localhost:3000
```

### 其他
1. 本案載入種子資訊，可提供測試
```
[
  {
    "name": "廣志",
    "email": "user1@example.com",
    "password": "12345678"
  },
  {
    "name": "小新",
    "email": "user2@example.com",
    "password": "12345678"
  }
]
```