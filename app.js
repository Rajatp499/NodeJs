const express = require('express');
const connectToDb = require('./database/database');
const contact = require('./Model/contactModel')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectToDb();

app.listen(3000, () => {
    console.log("Node at port: ", 3000)
})


app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/blog', (req, res) => {
    res.render("blog.ejs")
})

app.get('/contact', (req, res) => {
    res.render("contact.ejs")
})

app.post('/contact', async(req,res)=>{
    res.send("Data Sent")
    console.log(req.body)
    const {name,email,message} = req.body;
    await contact.create({
        name,
        email,
        message
    })

})
