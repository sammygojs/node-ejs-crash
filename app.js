const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//register view engine
app.set('view engine','ejs');
app.use(express.urlencoded({ extended:true}))
//custom setting of folder if not views
//app.set('views','myviews')

const dbURI = 'mongodb+srv://admin:secret1234@cluster0.nfqjy.mongodb.net/test'
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))

//mongoose and mongo sandbox routes
app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title:"new title 2",
        snippet:"this is the snippet",
        body:"more about new blog"
    })

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })    
})

app.get('/all-blogs',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })    
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('61ffccf49234a546e61a4c48')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })    
})

app.get('/blogs',(req,res)=>{
    //reverse Blog.find().sort({ createdAt: -1})
    Blog.find()
        .then((result)=>{
            res.render('index', {title:'All Blogs', blogs:result})
        })
        .catch((err)=>{
            console.log(err)
        })    
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body)
    
    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err)
        })    
})


app.use((req, res, next)=>{
    console.log("new request made")
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    next()
})

app.use((req, res, next)=>{
    console.log("next middleware called")
    next()
})

//static files and middleware
//http://localhost:3000/styles.css can be used to access
app.use(express.static('public'))

app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Sumit finds a job', snippet:'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
        {title: 'Rumit finds a job', snippet:'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
        {title: 'Zumit finds a job', snippet:'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    ]
    res.render('index', { title:'Home' , blogs})
})



app.get('/about',(req,res)=>{
    res.render('about' , { title:'About' })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create', { title:'Create Blog' })
})

app.use((req,res)=>{
    res.status(404).render('404', { title:'Not found' })
})

