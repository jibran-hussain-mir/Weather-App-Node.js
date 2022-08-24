const request=require('request');   


const geoCode=(address,callback)=>{
    const url=`http://api.positionstack.com/v1/forward?access_key=adc24ab1dcfa7e605212a384855cd573&query=${address}`;
   request({url:url,json:true},(error,response)=>{
       if(error) callback("Unable to Process.....",undefined);
       else{
           callback(undefined,{
               latitude:response.body.data[0].latitude,
               longitude:response.body.data[0].longitude,
               location:response.body.data[0].locality
           })
   
       }
   })
   }
  
module.exports=geoCode;