


const MongoClient = require('mongodb').MongoClient
const express = require('express')
const userServices = require('./service/userServices')
const bodyParser= require('body-parser')
const app = express()
var logger = require('./logs/logger');
logger.setLevel('debug');

var sprintf = require('sprintf-js').sprintf;


// TODO : delete the next line in prod - is only for test the db
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

var db


// MogoDb configure
MongoClient.connect('mongodb://alutapp:alutapp1234@ds019063.mlab.com:19063/alutappdb', (err, client) => {
  if (err) return console.log(err)
  db = client.db('alutappdb') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})



  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })


  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)

      // TODO : delete the next line in prod - is only for test the db
      res.render('index.ejs', {quotes: result})
    })
  })
  app.get('/SignIn/:email/:password', userServices.SignIn);



  app.post('/IsEmailExist',(req, res)=>{
    userServices.IsEmailExist(req, res)

    // userServices.IsEmailExist((req)=>{
    //   if (err) return console.log(err)
    //   else   console.log('user exist ')

    // });
  });
 
 
  app.post('/AddUser',(req, res)=>{
    userServices.addUser(req,(err, result) => {
      console.log('saved to database')
      res.redirect('/')
    })
  })
 

  // app.post('/addChild', (req, res) => {
  //   db.collection('child').save(req.body, (err, result) => {
  //     if (err) return console.log(err)
  
  //     console.log('saved child to database')
  //     //res.redirect('/')
  //   })
  // })


  // app.post('/addUser', (req, res) => {
  //   db.collection('user').save(req.body, (err, result) => {
  //     if (err) return console.log(err)
  
  //     console.log('saved user to database')
  //     //res.redirect('/')
  //   })
  // })
  

