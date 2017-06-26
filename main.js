// 引入模块
const express =  require('express');
const path = require('path');
// 调用模块
const app = express();
// 设置session 模块
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
}))
//共有的中间件放在主模块中处理
// 引入登陆获取参数的模块
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 设置静态文件中间件
app.use(express.static(path.join(__dirname,'public')));

// 引入用户登陆注册模块
const router = require('./route/accountRouter.js').router;
// account路由
app.use('/account',router);
app.listen(3000,(err,data)=>{
    if(err)throw err;
    console.log('服务器登陆了');
});