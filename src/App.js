
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

const [query, setQuery] = useState('')
const [meals, setMeals] = useState([])
const [suggestions, setSuggestions] = useState([])

const styles = {
  display:'inline',
  width:'30%',
  height: 'fit-content',
  float:'left',
  padding:5,
  border:'0.5px solid antiquewhite',
  marginBottom: 15,
  marginRight: 10,
  marginLeft: 30
  }

useEffect(() => {
  const loadMeals = async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    console.log(response.data)
    setMeals(response.data.meals)
  }
  loadMeals()
}, [])

const onChangeHandler = (query) => {
  let matches = []
  if (query.length > 0) {
    matches = meals.filter(meal => {
      const regex = new RegExp(`${query}`,"gi")
      return meal.strMeal.match(regex)
    })
  }
  console.log('matches', matches)
  setSuggestions(matches)
  setQuery(query)
}


  return (
    <div className="App">
      <header className='App-header'>
        <h2>Search seafood meal by name</h2>
        <input style={{marginBottom:40, width: 300, height: 30, fontSize: 25}} className="search" type="text"  placeholder="Search..." onChange={(e) => onChangeHandler(e.target.value)} value={query} />
      </header>
       <div>
        {suggestions && suggestions.map((suggestions, idMeal) => 
        <li key={idMeal} style={styles}>
          <div>
          {suggestions.strMeal}
          </div>
          <div style={{margin:5}}>
            <img width={'50'} height={'50'} src={suggestions.strMealThumb}/>
          </div>
        </li>)}
        </div>
    </div>
  );
}

export default App;
