const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Node at port: ", 3000)
})


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/about', (req, res) => {
    const about = "About Page"
    res.render("about.ejs", { about })
})
