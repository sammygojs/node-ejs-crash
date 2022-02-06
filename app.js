const express = require('express')
const app = express()

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
})

app.get('/about-me',(req,res)=>{
    res.redirect('/about')
})

app.use((req,res)=>{
    res.status(404).render('404')
})

