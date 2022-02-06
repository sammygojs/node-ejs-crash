const express = require('express')
const app = express()

<<<<<<< HEAD
app.listen(3000)

app.get('/',(req,res)=>{
    res.sendFile('./views/index.html', {root: __dirname})
})

app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html', {root: __dirname})
=======
//register view engine
app.set('view engine','ejs');
//custom setting of folder if not views
//app.set('views','myviews')

app.listen(3000)

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
>>>>>>> f1ca6f0 (simple views with ejs)
})

app.get('/about-me',(req,res)=>{
    res.redirect('/about')
})

app.use((req,res)=>{
<<<<<<< HEAD
    res.sendFile('./views/404.html', {root: __dirname})
=======
    res.status(404).render('404')
>>>>>>> f1ca6f0 (simple views with ejs)
})

