const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const https = require('https')
const { request } = require('http')
const app = express()
app.use(bodyParser.urlencoded({'extended':true}))
app.use(express.static('public'))


// route starts here
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/signup.html')
})

app.post('/',function(req,res){
    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const email = req.body.email

    var data = {
        members : [{email_address:email,status:'subscribed',merge_fields:{
            FNAME: firstName,
            LNAME: lastName
        }}]
    }
    var jsonData = JSON.stringify(data)

    var url = 'https://us9.api.mailchimp.com/3.0/lists/250108def4'

    var options = {
        method:'post',
        auth:'dickson:691cc59e80c949e95efa90c9a8c05968-us9'
    }

    var request = https.request(url,options,function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }
        // response.on('data',function(data){
        //     console.log(JSON.parse(data))
        // })
    })

    request.write(jsonData);
    request.end();
    // res.send('Received');
})

app.get('/failure',(req,res)=>{
    res.redirect('/')
})
app.listen(port, ()=>{
    console.log('project running on port '+ port)
})

// api key 
// 691cc59e80c949e95efa90c9a8c05968-us9

// list id
// 250108def4