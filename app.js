const express = require('express');
const connectToDb = require('./database/database');
//contactSchema
const Blog = require('./Model/blogModel')

const app = express()

app.use(express.json())//
app.use(express.urlencoded({extended: true}))//

app.set('view engine', 'ejs')//
app.use(express.static("./Storage"))//


//to give acces to node for only Storage folder
// app.use(express.static,"./Storage")

connectToDb();

const {multer,storage} = require("./Middleware/multerConfig")
const upload = multer({storage:storage})


app.listen(3000, () => {
    console.log("Node at port: ", 3000)
})


app.get('/', (req, res) => {
    const page = "Home Page"
    res.render('home.ejs',{page})
})

app.get('/blog', async(req, res) => {
    const page = "Blog Page"
    const blogs = await Blog.find({});
    res.render("blog.ejs",{page,blogs})
})

app.get('/create-blog', (req, res) => {
    const page = "Create Blog Page"
    res.render("createBlog.ejs",{page})
})

app.get('/contact_list', (req, res) => {
    // const page = "Contact Page"
    res.render("contact_list.ejs")
})


app.get('/about',async(req, res) => {
    const page = "About Page"
    // const blogs = await Blog.find({});
    res.render("about.ejs",{page})
})

app.post('/create-blog', upload.single("image"), async(req,res)=>{
    res.send("Data Sent")
    console.log(req.body)
    const {name,title,email,message} = req.body;
    await Blog.create({
        name,
        title,
        email,
        message,
        image: req.file.filename
    })

})

