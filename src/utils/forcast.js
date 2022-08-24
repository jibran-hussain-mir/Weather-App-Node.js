const request=require('request');

const forcast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=1d400d2f4abafbb5ca94033842af23e0&query=${latitude},${longitude}`;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to Fetch the forcast....",undefined);
        }
        else if(response.body.error){
            callback("Unable to find the location",undefined);
        }
        else{
            const {temperature,precip}=response.body.current;
            callback(undefined,`Temperature is ${temperature}.There are ${precip} % chances of rain`);
        }
    })
}


module.exports=forcast;