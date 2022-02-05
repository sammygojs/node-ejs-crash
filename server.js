const fs = require('fs');
const http = require('http')

const server = http.createServer((req, res)=>{
    //console.log(req.url,req.method); // -> / GET
    res.setHeader('Content-type', 'text/html')
    //res.write('<p>Hello</p>')
    let path =`./views/`;
    switch(req.url){
        case `/`:
            path+= `index.html`
            res.statusCode=200
            break
        case `/about`:
            path+= `about.html`
            res.statusCode=200
            break
        case `/about-me`:
            res.statusCode=301
            res.setHeader('Location',`/about`)
            res.end()
        default :
            path+= `404.html`
            res.statusCode=404
            break
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log('err', err)
            res.end()
        }
        else{
            //res.write(data)
            res.statusCode=200
            res.end(data)
        }
    })
})

server.listen(3000,()=>{
    console.log('listening for requests on port 3000')
})