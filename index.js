const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
document.getElementById('searchWeather').addEventListener('click',()=>{
    let loc=document.getElementById('location');
    loc.style.display="none";
    let wthr=document.getElementById('weather');
    wthr.style.display="none";
    let search=document.getElementById('search');
    search.style.display="flex";
})

document.getElementById('yourWeather').addEventListener('click',()=>{
    let loc=document.getElementById('search');
    loc.style.display="none";
    let search=document.getElementById('location');
    search.style.display="flex";
    let wthr=document.getElementById('weather');
    wthr.firstElementChild.innerHTML="";
    wthr.lastElementChild.innerHTML="";

})
let grantAccess=document.querySelector('[data-grantAccess]');
grantAccess.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition);
        let loc=document.getElementById('location');
        loc.style.display="none";
    }
    else{
        alert('GeoLocation not available!');
    }
})
function showposition(position){
    const userCoordinate={
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    //to understand
    //    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinate))
       fetchUserWeatherInfo(userCoordinate) 
}
async function fetchUserWeatherInfo(userCoordinate){
    const {lat, lon}=userCoordinate;
    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data=await response.json();
        showWeatherInfo(data);
    }
    catch(err){
        alert(err);
    }
    
}
 function showWeatherInfo(data){
    // let weatherInfo=data.main.temp;
    // let name= data;
    console.log(data);
    let wthr=document.getElementById('weather');
    let info=wthr.firstElementChild;
    info.innerHTML=data.main.temp;
    info.style.fontSize="26px";
    // wthr.appendChild(info);
    let city=wthr.lastElementChild;
    city.innerHTML=data.name;
    // wthr.appendChild(city);
}
document.getElementById('searchBtn').addEventListener('click',()=>{
    let searchBr=document.getElementById('searchBar');
    // console.log(searchBr.value);
   
    showCityWeather(searchBr.value);
    searchBr.value="";
})
async function showCityWeather(city){
    
    try{
        const response=await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const data=await response.json();
        let long=data[0].lon;
        let lat=data[0].lat;
        
        // console.log(data);
        // console.log(long);
        // console.log(lat);
        try{
            const resp=await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
            )
            const inf=await resp.json();
            console.log(inf);
            let wthr=document.getElementById('weather');
        //    let info=wthr.p:firstchild;
           let info = wthr.firstElementChild;
           info.innerHTML=inf.main.temp;
           info.style.fontSize="26px";
        //    wthr.appendChild(info);
           let city=wthr.lastElementChild;
           city.innerHTML=inf.name;
        //    wthr.appendChild(city);
           wthr.style.display="flex";
        }
        catch(err){
            alert(`Invalid Place`);
        }
    }
    catch(err){
        alert(`Invalid Place: ${err}`);
    }
}