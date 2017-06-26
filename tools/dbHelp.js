
//引用模块
const MongoClient = require('mongodb').MongoClient;
// 服务器地址
const url = 'mongodb://localhost:27017/itcast';


// 封装连接数据库的函数
function getDb(callback) {
    MongoClient.connect(url,(err,db)=>{
        if(err){
            callback(err);
        }else{
            callback(null,db);
        }
        db.close();  // 处理完数据后关闭数据库；
    })
}
// 查找一条数据
exports.findOne = (collectionName,data,callback)=> {
    //连接数据库找数据
    getDb((err,db)=>{
        if(err){
            callback(err);
        }else{
            db.collection(collectionName).findOne(data,(error,docs)=>{
                if(error){
                    callback(error);
                }else{
                    callback(null,docs);
                }
            })
        }
    })
}
// 插入一条数据
exports.insertOne = (collectionName,data,callback) => {
    //连接数据库找数据
    getDb((err,db)=>{
        if(err){
            callback(err);
        }else{
            db.collection(collectionName).insertOne(data,(error,result)=>{
                if(error){
                    callback(error);
                }else{
                    callback(null,result);
                }
            })
        }
    })
}
