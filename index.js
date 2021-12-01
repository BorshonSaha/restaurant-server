const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const uri = `mongodb+srv://dbUser2:test123@cluster0.2hugv.mongodb.net/restaurant-management?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    // console.log(err);
    const foodCollection = client.db("restaurant-management").collection("allFood");
    console.log('database connected');

    app.post('/addFood', (req, res) => {
        const newFood = req.body;
        foodCollection.insertOne(newFood)
            .then(result => {
                console.log('food added');
            })
    })

    app.get('/getFood', (req, res) => {
        foodCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/delete/:id', (req, res) => {
        foodCollection.deleteOne({_id: objectId(req.params.id)})
        .then(result => {
            console.log('deleted Successfully');
        })
    })


    app.patch('/update/:id', (req, res) => {
        foodCollection.updateOne({_id: objectId(req.params.id)},
        {
            $set: {name: req.body.updateName, price: req.body.updatePrice}
        })
    })


});



client.connect(err => {
    const adminCollection = client.db("restaurant-management").collection("adminList");

    app.post('/makeAdmin', (req, res) => {
        const newAdmin = req.body;
        adminCollection.insertOne(newAdmin)
            .then(result => {
                console.log('admin added');
            })
    })

    app.get('/getAdmin', (req, res) => {
        adminCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/deleteAdmin/:id', (req, res) => {
        adminCollection.deleteOne({_id: objectId(req.params.id)})
        .then(result => {
            console.log('admin deleted Successfully');
        })
    })

});


client.connect(err => {
    const staffCollection = client.db("restaurant-management").collection("staffList");

    app.post('/addStaff', (req, res) => {
        const newStaff = req.body;
        staffCollection.insertOne(newStaff)
            .then(result => {
                console.log('staff added');
            })
    })

    app.get('/getStaff', (req, res) => {
        staffCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/deleteStaff/:id', (req, res) => {
        staffCollection.deleteOne({_id: objectId(req.params.id)})
        .then(result => {
            console.log('staff deleted Successfully');
        })
    })
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
  })