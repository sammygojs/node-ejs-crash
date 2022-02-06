const express = require('express')
const app = express()

//register view engine
app.set('view engine','ejs');
//custom setting of folder if not views
//app.set('views','myviews')

app.listen(3000)

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

