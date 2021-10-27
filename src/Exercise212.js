import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'

const App6 = () => {
   const [data, setData] = useState([])
   const [filterStr, setFilterStr] = useState('')
   const [displayList, setDisplayList] = useState([])
   const [weatherData, setWeatherData] = useState([])
   const ourCountryRef = useRef()

   useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all').then((res) => {
         console.log(res.data)
         setData(res.data)
      })

   }, [])

   useEffect(()=>{
    axios.get(`http://api.weatherstack.com/current?access_key=45fc95b517c87909fd9beeb123f84ce8&query=${ourCountryRef.current}`)
    .then(res=> {
        console.log(res)
        setWeatherData(res.data.current)
    })
   
   },[ourCountryRef.current])

   const changeHandler = (e) => {
      setFilterStr(e.target.value.trim())
  
   }


   const showHandler = (commonname) => {
    setFilterStr(commonname)
   }

   const countries =
      filterStr &&
      data
         .filter((each) => {
            return each.name.common.toLowerCase().includes(filterStr.toLowerCase())
         })
         .map((each) => {
            return <li>{each.name.common} <button onClick={() => showHandler(each.name.common) }>show</button></li>
         })

   const country = data
      .filter((each) => {
         return each.name.common.toLowerCase().includes(filterStr.toLowerCase())
      })
      .map((each) => {
        ourCountryRef.current = (each.name.common)
         return (
            <>
               <div>{each.name.common}</div>
               <div>capital {each.capital}</div>
               <div>population {each.population}</div>
               <h3>Languages:</h3>
               <ul>
                  {each.languages
                     ? Object.values(each.languages).map((each) => {
                          return <li>{each}</li>
                       })
                     : null}
               </ul>
               <img src={each.flags.png} alt="country flag" />





               <div></div>
            </>
         )
      })

   return (
      <center style={{backgroundColor: "lightgrey"}}>
         find country: <input type="text" onChange={changeHandler} />
         <ul className="list-of-ten">
            {countries.length > 1 && countries.slice(0, 10)}
            {countries.length === 1 && country}
            
         </ul>
         temperature: {countries.length === 1 && weatherData.temperature}
         {countries.length === 1 && <img src={weatherData.weather_icons[0]}/>}
        
      </center>
   )
}

export default App6
