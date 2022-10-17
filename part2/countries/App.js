import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterValue, onFilterChange}) => {
  return (
    <div>
      <input type = 'search'
      value = {filterValue} 
      onChange = {onFilterChange}/>
    </div>
  )
  }

const Countries = ({countries, set}) => {
console.log(countries)

const count = countries.length

console.log(count)

if(count > 10) {
    return (
    <p>Too many matches, refine search</p>);
  } else if (count > 1 && count <= 10) {
  return(
    <ul>
    {countries.map((country) => (
      <Country key = {country.name.common}
        country = {country} set = {set}
      />
    ))}
   </ul>
    )} else if (count === 1) {
        //set(countries[0]);
        return(
          <DetailCountry country = {countries[0]}/>
        )
    }
  }
  
const Country = ({country,set}) => {
    return (
      <li>{country.name.common}
      <button value={country.name.common} onClick = {() => set(country)} >show more</button></li>
    )
  }

const DetailCountry = ({country}) => {
console.log(country)
if (country === null) {
  return (null)
}
 
 return(
<div>
  <h1>Official country name: {country.name.official}</h1>
        <h2>Commonly known as: {country.name.common}</h2>
        <p>Capital city: </p>
          <ul>
            {country.capital.map(capital=>
            <li key={capital}>
              {capital}
            </li>)}</ul>
          <p>Country size: {country.area} square meters</p>
          <p>Languages spoken:</p>
          <ul>
          {Object.keys(country.languages).map(id =>
          <li key = {id}>
            {country.languages[id]}
          </li>)}
          </ul>
          <b>Flag:  </b>
          <p></p>
          <img src = {country.flags['png']} alt = 'Official flag of country'/>
        </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')
  const [oneCountry, setOneCountry] = useState(null)

  const handleFiltering = (event) => {
    setFilter(event.target.value) 
    setOneCountry(null)
    console.log(event.target.value)
 }

  useEffect(() => {    
    console.log('effect')    
    axios      
    .get('https://restcountries.com/v3.1/all')      
    .then((response) => {        
      console.log('promise fulfilled')        
      setCountries(response.data);      
    }) ; 
  }, [])  ;

  const countriesToShow = filter === '' 
  ? countries
  : countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return(
    <div>
      <p>Find countries:</p>
     <Filter filterValue={filter} onFilterChange={handleFiltering} />
     <Countries countries={countriesToShow} set = {setOneCountry}/>
     <DetailCountry country={oneCountry}/>

    </div>
)
  }
export default App
