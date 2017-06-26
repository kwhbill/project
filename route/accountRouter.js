/**
 * Created by Administrator on 2017/6/25.
 */
// 引入模块
const express =  require('express');
// 调用模块
const app = express();
// 引入控制器模块
const accountController = require('../controller/accountController.js');

const router = express.Router();

// 登陆页面
router.get('/login',accountController.login);
// 登陆
router.post('/logindata',accountController.logindata);

// 验证码
router.get('/vcode',accountController.vcode)

//注册页面
router.get('/register',accountController.register);

//提交注册
router.post('/registerdata',accountController.registerdata);


exports.router = router;