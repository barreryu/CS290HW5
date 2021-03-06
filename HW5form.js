var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);


app.get('/',function(req,res){
    res.render('home.handlebars')
  });

app.get('/get',function(req,res){
var qParams = [];
for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
}
var context = {};
context.datalist = qParams;
res.render('get', context);
});

app.post('/post', function(req,res){
var qParams = [];
for (var p in req.body){
  qParams.push({'name':p,'value':req.body[p]})
}
console.log(qParams);
console.log(req.body);
var context = {};
context.datalist = qParams;
res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});