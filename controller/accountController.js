/**
 * Created by Administrator on 2017/6/25.
 */
const fs = require('fs');
const path = require('path');
//验证码模块
const captchapng = require('captchapng');
// 寻找服务器模块
const dbHelp = require('../tools/dbHelp.js');


// 登陆页面器控制
exports.login = (req,res)=>{
    fs.readFile(path.join(__dirname,'../view/login.html'),(err,data)=>{
        // 设置浏览器读取文件的方式；
        if(err){
            throw  err;
        }else{
            res.setHeader('Content-type','text/html;charset=utf-8');
            res.send(data);
        }

    })
}
// 提交登陆信息
exports.logindata = (req,res)=>{

    if(req.session.vcode==req.body.vcode){
        // 去服务器查询有没有这个用户
        dbHelp.findOne('user',{username:req.body.username,pwd:req.body.pwd},(err,data)=>{
            if(data){
                res.send('用户名存在');
            }else{
                res.send('用户名或密码错误,重新登陆');
            }
        })
    }else{
        res.send('请输入验证码');
    }

}
// 获取验证码
exports.vcode = (req,res)=>{
    req.session.vcode = parseInt(Math.random()*9000+1000);
    var p = new captchapng(80,30,req.session.vcode);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.setHeader( 'Content-Type','image/png');
    res.end(imgbase64);
}
//注册页面控制器
exports.register = (req,res)=>{
    fs.readFile(path.join(__dirname,'../view/register.html'),(err,data)=>{
        if(err)throw err;
        res.setHeader('Content-type','text/html;charset=utf-8');
        res.send(data);
    })
}
// 提交登陆信息
exports.registerdata = (req,res)=>{
    dbHelp.findOne('user',{username:req.body.username,pwd:req.body.pwd},(err,docs)=>{
        if(docs){
            res.send('您已经注册过了');
        }else{
            dbHelp.insertOne('user',{username:req.body.username,pwd:req.body.pwd},(err,result)=>{
                if(err)throw err;
                res.send('注册成功');
            })
        }
    })
}