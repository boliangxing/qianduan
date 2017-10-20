var crypto = require('crypto');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Initialize connection once
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/runoob", function(err, database) {
    if(err) throw err;

    db = database;


});
app.get("/add", function(req, res) {
    var file="f:\\appleid.json";
    var json=JSON.parse(fs.readFileSync( file));

    db.collection("test").insert(json, function(err, doc){
        if(err)
            console.error(err);
        else
            console.log("OK!"+doc);
    });
    res.end();
});

app.get("/aa",function (req,res) {
    var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // 数据库为 r unoob
    MongoClient.connect(DB_CONN_STR , function(err, db) {

        console.log("连接成功！");

        selectData(db, function(result) {
            console.log(result);

            db.close();
            res.json(result);
        });
    });
    var selectData = function(db, callback) {
        //连接到表
        var collection = db.collection('site');
        //原子操作
        collection.findAndModify(
            { "id": "36" },
            [['_id','asc']],
            {$set: {status: '0'}},

            function(err,doc) {

                callback(doc);
            }

        );

    }

    })



app.get('/mongo',function (req,res) {
    var MongoClient = require('mongodb').MongoClient;
    var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // 数据库为 runoob
    var file="f:\\appleid.json";
    var data=JSON.parse(fs.readFileSync( file));

    MongoClient.connect(DB_CONN_STR , function(err, db) {

        console.log("连接成功！");
        insertData(db, function(result) {
            console.log(result);

            db.close();
            //res.json(result);
        });
        selectData(db, function(result) {
            console.log(result);

            db.close();
            res.json(result);
        });
    });
    var insertData = function(db, callback) {
        //连接到表 site
        var collection = db.collection('success');
        //插入数据
      //  var data = [{"name":"ccc","url":"www.ccc.com"},{"name":"ccc","url":"c.cccc.com"}];
        collection.insert(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    var selectData = function(db, callback) {
        //连接到表
        var collection = db.collection('site');
        //查询数据
        var whereStr = {"id":'36'};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

})
app.post('/html/Api_GetTask' , function(req,res){
 var imei=req.query.imei;
 if(imei==''){
   var result=[];
   myArray.push({error:'250'});
   res.json(result);

 }
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = "SELECT a.id, a.product_ID, a.keyword,a.vpn_enable,a.download_per , a.apple_batch FROM task AS a WHERE  a.count < a.tocount AND a.status !=1 ORDER BY a.round_count, rand( ) ASC LIMIT 1";
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {

          var product_ID = result[0]['product_ID'];
          var UdidSql= "SELECT udid FROM udid a  WHERE    a.udid NOT  IN (  SELECT udid  FROM success  WHERE product_ID = '"+product_ID+"'  )  AND  a.IMEI = '0'   LIMIT 1"
          console.log(UdidSql)
          var  UdidSqlParams = [];
          var connection = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : 'root',
           port: '3306',
           database: 'shuaji',
          });
          connection.query(UdidSql,UdidSqlParams,function (Udiderr, Udidresult) {
          //console.log(UdidSqlParams)


        })
        res.json(Udidresult);
        return ;


});

connection.end();
});





// view engine setup
//  app.set('views', path.join(__dirname, 'views'));
//  app.set('view engine', 'jade');
//app.set('views', path.join(__dirname, 'views'));
//app.engine('.html', ejs.__express);
//app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/test', function (req, res) {
res.render('login'); // √
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/html/task/select_key' , function(req,res){
 var keyword=req.query.keyword;
var mysql  = require('mysql');
var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});
connection.connect();
//sql
var  addSql = 'select * from task where keyword like "%'+keyword+'%"     order by id desc';
console.log(addSql)
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});


app.get('/api/products' , function(req,res){

    var id=req.query.id;
    console.log(id)
    var mysql  = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'lengfanbasic',
    });
    connection.connect();
//sql
        var  addSql = 'select * from zb_Product';




    console.log(addSql)
//参数
    var  addSqlParams = [];
//增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.json(result);
        return ;
    });

    connection.end();
});
app.get('/api/product' , function(req,res){

    var id=req.query.id;
    console.log(id)
    var mysql  = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'lengfanbasic',
    });
    connection.connect();
//sql


        var  addSql = 'select * from zb_Product where id = "'+id+'" ';


    console.log(addSql)
//参数
    var  addSqlParams = [];
//增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.json(result);
        return ;
    });

    connection.end();
});
app.get('/api/Comments' , function(req,res){

    var id=req.query.id;
    console.log(id)
    var mysql  = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'lengfanbasic',
    });
    connection.connect();
//sql


    var  addSql = 'select * from Comment where productId = "'+id+'" ';


    console.log(addSql)
//参数
    var  addSqlParams = [];
//增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.json(result);
        return ;
    });

    connection.end();
});
app.get('/api/productSearch' , function(req,res){

    var title=req.query.title;
    var price=req.query.price;
    var category=req.query.category;

    var mysql  = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: '3306',
        database: 'lengfanbasic',
    });
    connection.connect();
//sql

    if(category == '-1'){
        var  addSql = 'select * from zb_Product where title like "%'+title+'%"  and  price > "'+price+'"  ';

    }else{
        var  addSql = 'select * from zb_Product where title like "%'+title+'%"  and  price > "'+price+'" and category = "'+category+'"  ';

    }


    console.log(addSql)
//参数
    var  addSqlParams = [];
//增
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.json(result);
        return ;
    });

    connection.end();
});

app.get('/html/applecount' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select count(*) as c from appleid';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});



app.get('/html/imei' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = "SELECT count( DISTINCT IMEI ) AS imei , date_format( times, '%y-%m-%d %H' ) AS times FROM success WHERE times > '2017-07-13 10:00:00' GROUP BY date_format( times, '%y-%m-%d %H' )  order by times desc";
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});


app.get('/html/appleerrorcount' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select count(*)  as c from appleid  where errorcode!=0';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});
app.get('/html/appletruecount' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select count(*)  as c from appleid  where errorcode=0';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});


app.get('/html/udidcount' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select count(*)  as c from udid  ';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});


app.get('/html/udidIMEI' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select count(*)  as c from udid  where imei!=0';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       //console.log()
       var myArray=[];
       myArray.push({uid:'001'});

       res.json(result);
        return ;
});

connection.end();
});
app.post('/html/getTask' , function(req,res){
 var imei=req.body.imei;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select count(*)  as c from udid  where imei!=0';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       //console.log()
       var myArray=[];
       myArray.push({uid:'001'});

       res.json(result);
        return ;
});

connection.end();
});


    app.post('/html/login' , function(req,res){
     var user_name=req.body.username;
      var password=req.body.password;
      //connection.escape(user_name);
      //  connection.escape(password);
     var md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列,此处所示为MD5方式加密
     var end_paw= md5.update(password).digest('hex');//加密后的密码
    console.log(end_paw)
    var mysql  = require('mysql');

    var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : 'root',
     port: '3306',
     database: 'shuaji',
    });

    connection.connect();
    //sql
  var  addSql = 'select * from admin where UserPassWord ="'+end_paw+'"  and  userID="'+user_name+'"';
  console.log(addSql)
    //参数
    //where UserID ="'+username+'" and UserPassWord ="'+password+'"
    var  addSqlParams = [];
    //增
    connection.query(addSql,addSqlParams,function (err, result) {
           if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
           }
           res.json(result);
            return ;
    });

    connection.end();
    });
app.get('/html/success' , function(req,res){
 var user_name=req.body.user;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
var  addSql = 'select * from task order by id desc';
//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});

app.post('/html/update_task' , function(req,res){
 var status=req.body.id;
 var id=req.body.status;
var mysql  = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'root',
 port: '3306',
 database: 'shuaji',
});

connection.connect();
//sql
if(status==0){
 var  addSql = 'update task set status=1 where id="'+id+'" ';
}else{
 var  addSql = 'update task set status=0 where id ="'+id+'"';

}

//参数
var  addSqlParams = [];
//增
connection.query(addSql,addSqlParams,function (err, result) {
       if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        return;
       }
       res.json(result);
        return ;
});

connection.end();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

// error handler
app.use(function(err, req, res, next) {
 // set locals, only providing error in development

 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
});
// app.use(cookieParser());
// app.use(session({
// resave: true, // don't save session if unmodified
// saveUninitialized: false, // don't create session until something stored
// secret: 'love'
// }));

// app.post('/html/login',function(req,res){
// if(req.body.username=="love" && req.body.password=="love"){
// var user = {'username':'love'};
// req.session.user = user;
// res.redirect('/admin/app/list');
// }
// else
// {
// res.redirect('/html/login');
// }
// });
// app.get('/html/logout',function(req,res){
// req.session.user = null;
// res.redirect('/html/login');
// });

module.exports = app;
