const config=require('config')
const Joi = require('joi') //For Validation
var helmet = require('helmet') // For Security
var morgan = require('morgan') //For Loging
const crud_Operation=require('./routes/crud')
const render_Operation=require('./routes/render')
const express = require('express');
const app = express();
var path = require('path');
var fs=require('fs');


app.use(express.json()) //For json data Transformation
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

//using Boostrap
app.use('/bootstrap' , express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/mdbootstrap' , express.static(__dirname + '/node_modules/mdbootstrap/css'))
app.use("/jquery", express.static(__dirname + "/node_modules/jQuery/dist"));
app.use("/slick-carousel", express.static(__dirname + "/node_modules/slick-carousel/slick"));

//Router
app.use('/',render_Operation)
app.use('/car',crud_Operation)
// app.use('/getdata/cardata',crud_Operation)

app.set('/views' + express.static(__dirname + '/views'))
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs')   
app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));
app.use('/public' , express.static(path.join(__dirname , '/public')));
app.use('/node_modules' , express.static(path.join(__dirname , '/node_modules')));

// app.use('/public/images/', express.static('./public/images'));





//Configuration
// console.log('Developer Name       ' + config.get('name'))
// console.log('Project Name         ' + config.get('projectName'))
// console.log('Frontend Technology  ' + config.get('Technologies.frontend'))
// console.log('Backend Technology   ' + config.get('Technologies.Backend'))
// console.log('Database Technology  ' + config.get('Technologies.Database'))


if (app.get('env')=="development") {
    app.use(morgan('tiny'))
    // console.log('Using Morgan')

    // console.log(`Node Environment: ${process.env.NODE_ENV}`)
    // console.log(`app Environment: ${app.get('env')}`)
}


//Array for car objs

app.listen(3000,  function( req,resp) {
    
  });

