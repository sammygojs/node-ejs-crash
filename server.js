const http = require('http')

const server = http.createServer(()=>{
    console.log('request made');
})

server.listen(3000,()=>{
    console.log('listening for requests on port 3000')
})