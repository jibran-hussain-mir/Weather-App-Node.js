// fetch('http://puzzle.mead.io/puzzle').then((response)=>response.json().then((data)=>{
//     console.log(data);
// }))



console.log('hi')
const weatherInfo=document.querySelector('form');
const place=document.querySelector('input');
weatherInfo.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=place.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{response.json().then((data)=>{
    if(data.error) console.log(data.error);
    else{
        console.log(data.location);
        console.log(data.Forecast)
    }
})})
    console.log(location);    
})



