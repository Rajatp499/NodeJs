require("dotenv").config()
const express = require('express');
const connectToDb = require('./database/database');
//contactSchema
const Blog = require('./Model/blogModel')
//userSchema
const User = require('./Model/userModel')
//bcrypt
const bcrypt = require('bcrypt')
//jsonWebToken
const jwt = require("jsonwebtoken")
//isAuthenticated
const isAuthenticated = require("./Middleware/isAuthenticated");
//cokkir-parser
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())//
app.use(express.urlencoded({ extended: true }))//
app.use(cookieParser())

app.set('view engine', 'ejs')//
app.use(express.static("./Storage"))//
app.use(express.static("./Css"))//



//to give acces to node for only Storage folder
// app.use(express.static,"./Storage")

connectToDb();

const { multer, storage } = require("./Middleware/multerConfig");
const upload = multer({ storage: storage })


app.listen(3000, () => {
    console.log("Node at port: ", 3000)
})


app.get('/' ,(req, res) => {
    res.render('home.ejs')
})

app.get('/blog', async (req, res) => {
    const page = "Blog Page"
    const blogs = await Blog.find({});
    res.render("blog.ejs", { page, blogs })
})

app.get('/create-blog', (req, res) => {
    const page = "Create Blog Page"
    res.render("createBlog.ejs", { page })
})

app.get('/contact_list', (req, res) => {
    // const page = "Contact Page"
    res.render("contact_list.ejs")
})


app.get('/about', async (req, res) => {
    const page = "About Page"
    // const blogs = await Blog.find({});
    res.render("about.ejs", { page })
})

app.post('/create-blog', upload.single("image"), async (req, res) => {
    // console.log(req.body)
    const { name, title, email, message } = req.body;
    await Blog.create({
        name,
        title,
        email,
        message,
        image: req.file.filename
    })

    res.send("Data Sent")
})

app.get("/blog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.render("readBlog", { blog })
})

app.get("/editblog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.render("editBlog", { blog })
})

app.get("/register", (req, res) => {
    res.render('register.ejs')
})


app.post('/editblog/:id', upload.single("image"), async (req, res) => {
    // console.log(req.body)
    const { name, title, email, message } = req.body;
    const id = req.params.id;
    await Blog.findByIdAndUpdate(id, {
        name: name,
        title: title,
        email: email,
        message: message,
    })
    res.send("Data Updated")

})

app.get('/deleteblog/:id', async (req, res) => {
    const id = req.params.id;

    await Blog.findByIdAndDelete(id)
    res.send("Data Deleted")
})

app.post('/register', async (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body;
    await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 12),
    })
    const page = "Home Page"
    res.render('home.ejs', { page })
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.find({ email: email })
    if (user.length
        === 0) {
        res.send("Invalid email")
    } else {
        // check password now 
        const isMatched = bcrypt.compareSync(password, user[0].password)
        if (!isMatched) {
            res.send("Invalid password")
        } else {
            const token = jwt.sign({userId : user[0].id},process.env.SECRET,{
                expiresIn : "20d"
        })
        res.cookie("token", token)
            res.send("logged in successfully")
            // res.redirect("/")
        }
    }

    // console.log(user)
})