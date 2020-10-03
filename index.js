const express = require('express')
const bodyParser = require('body-parser');
const cors =require('cors');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASS}@cluster0.603oj.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;



const app = express()
  //middleware
app.use(bodyParser.json());
app.use(cors());
const port = 5000;
 
// console.log(process.env.DB_User);
// console.log(process.env.DB_PASS);



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection= client.db("emaJohnStore").collection("products");
  console.log('database connected')
  // perform actions on the collection object

  
  app.post('/addProduct',(req,res)=>{
     const products=req.body;
     console.log(products)
    productsCollection.insertMany(products)
    .then(result =>{
      console.log(result)
      res.send(result.insertedCount)
    })
  })




  app.get('/products',(req,res)=>{
    productsCollection.find({}).limit(20)
    .torArray((err,documents)=>{
      res.send(documents);
    })
  })

});







app.get('/', (req, res) => {
  res.send('Hello Emma!')
})

app.listen(process.env.PORT||port)