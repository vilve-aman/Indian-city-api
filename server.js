const http = require('http');
const fs = require('fs')

let utility = {
    'msg' : 'sending utility'
}

let rawData = fs.readFileSync('./final.txt','utf-8')
let countNames = JSON.parse(rawData)

const handleReq = (req)=>{
    console.log(`req handled .........................................................`);
    let a=[]
    if(req.query.length !=0 ){
        for(let i=0 ; i<countNames.length ; i++){
            if(countNames[i].toLowerCase().indexOf(req.query) == 0)   a.push(countNames[i])
        }
    }

    let responseMsg = {
        'msg' : a
    }
    return JSON.stringify(responseMsg);
}


const valid= (req)=>{
    console.log(`request valid .........................................................`);
    if(req['auth-token']==1234)       return true;
    else    return false;
}


const server= http.createServer((req,res)=>{
    console.log(`server is up here`);
    res.setHeader('Access-Control-Allow-Origin', '*');

    let body = ''
    req.on('data', function(data) {
      body += data
    })
    
    req.on('end', respondingfn = ()=>{
        console.log('body generated') 
        // console.log(body)

        // handling recieved request        --validation        --handling
        let reqbody = JSON.parse(body)
        if(valid(reqbody)){
            response = handleReq(reqbody)
        }
        else{
            let errorMsg= {
                'msg' : 'API KEY not valid !!!'
            }
            response = JSON.stringify(errorMsg)
        }



        // sending back responses
        console.log('sending response')
        res.setHeader('Content-type', 'application/json')
        res.write (response);
        res.end();
    } )

})

server.listen(3000,'localhost',()=>{
    console.log(`Server Running at 3000`);
})