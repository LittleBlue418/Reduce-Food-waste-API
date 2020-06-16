import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classes from './SearchBox.module.css'

const SearchBox = ({ingredients, selectedIngredients, setSelectedIngredients}) => {
  const [inputValue, setInputValue] = useState ("")

  return (
    <Autocomplete
      id="combo-box-demo"
      options={ingredients.filter((ingredient) => !selectedIngredients.includes(ingredient))}
      inputValue={inputValue}
      onInputChange={(event, value, reason) => {
        if (reason === 'reset') {
          setInputValue("")
        } else {
          setInputValue(value)
        }
      }}
      value={null}
      onChange={(event, value, reason) => {
        setSelectedIngredients((oldValue) => [...oldValue, value])
      }}
      getOptionLabel={(option) => option.name}
      className={classes.SearchBox}
      renderInput={(params) => <TextField {...params} label="Select Ingredient" variant="outlined" />}
    />
  );
};


export default SearchBox;