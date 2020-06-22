import React, { useState, useEffect } from 'react';
import classes from './AddRecipePage.module.css';

import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import ImageUploader from './ImageUploader/ImageUploader';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import APIClient from '../../apiClient';
import { capitalize } from '../../utilityFunctions';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#006400',
    },
  },
});



const AddRecipePage = () => {
  const [API] = useState(new APIClient())
  const [allIngredients, setAllIngredients] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    image_data: "",
    image_content_type: "",
    method: [],
    ingredients: [],
  })

  useEffect(() => {
    API.list_ingredients().then(ingredients => {
      setAllIngredients(ingredients)
    })
  }, [API])


  const usedIngredients = newRecipe.ingredients.map(ingredient => ingredient.ingredient)

  const setName = (name) => setNewRecipe({ ...newRecipe, name: name });
  const setDescription = (description) => setNewRecipe({ ...newRecipe, description: description });
  const setImage = (image_data, image_content_type) => setNewRecipe({
    ...newRecipe,
    image_data: image_data,
    image_content_type: image_content_type
  });

  const addMethodStep = () => {
    newRecipe.method.push("")
    setNewRecipe({ ...newRecipe })
  }

  const updateMethodStep = (step, index) => {
    newRecipe.method[index] = step
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientEntry = (ingredient) => {
    newRecipe.ingredients.push({
      ingredient: ingredient,
      amount: "",
      unit: ""
    })
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientAmount = (amount, index) => {
    newRecipe.ingredients[index].amount = amount
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientUnit = (unit, index) => {
    newRecipe.ingredients[index].unit = unit
    setNewRecipe({ ...newRecipe })
  }

  const saveToDatabase = () => {
    API.create_recipe(newRecipe).then(() => {
      console.log('saved')
      setNewRecipe({
        name: "",
        description: "",
        image_data: "",
        image_content_type: "",
        method: [],
        ingredients: [],
      })
    }).catch((error) => {
      console.log(error)
    })
  }


  return (
    <div className={classes.AddRecipePage}>

      <h2>Add Recipe</h2>


      <div className={classes.TitleDiv}>
        <TextField label="Recipe Name" value={newRecipe.name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Brief Description" value={newRecipe.description} onChange={(e) => setDescription(e.target.value)} />
      </div>


      <div className={classes.ImageUploaderDiv}>
        <ImageUploader setImage={setImage} />
      </div>

      <div className={classes.Line}></div>

      <div className={classes.MethodHeadingDiv}>
        <h3>Method</h3>
        <Button onClick={addMethodStep} color="primary">
          <AddCircleOutlineIcon />
        </Button>
      </div>
      {newRecipe.method.map((step, index) => (
        <TextField
          fullWidth
          multiline
          key={"method" + index}
          label={"Method Step " + index}
          value={step}
          onChange={(e) => updateMethodStep(e.target.value, index)}
        />
      ))}


      <div className={classes.Line}></div>


      <h3 className={classes.IngredientsHeading}>Ingredients</h3>

      <Autocomplete
        options={allIngredients.filter((ingredient) => !usedIngredients.includes(ingredient))}
        inputValue={inputValue}
        onInputChange={(event, inputValue, reason) => {
          if (reason === 'reset') {
            setInputValue("")
          } else {
            setInputValue(inputValue)
          }
        }}
        value={null}
        loading={allIngredients.length === 0}
        onChange={(event, ingredient, reason) => {
          addIngredientEntry(ingredient)
        }}
        getOptionLabel={(option) => capitalize(option.name)}
        className={classes.SearchBox}
        renderInput={(params) => <TextField {...params} label="Select Ingredient" variant="outlined" />}
      />


      {newRecipe.ingredients.map((ingredientEntry, index) => (
        <div className={classes.IngredientEntry} key={"ingredient" + index}>

          <div>{capitalize(ingredientEntry.ingredient.name)}</div>

          <div className={classes.IngredientFields}>
            <div className={classes.IngredientField}>
              <TextField label="Amount"
                value={ingredientEntry.amount}
                onChange={(e) => addIngredientAmount(e.target.value, index)}
              />
            </div>
            <div className={classes.IngredientField}>
              <TextField label="Unit"
                value={ingredientEntry.unit}
                onChange={(e) => addIngredientUnit(e.target.value, index)}
              />
            </div>
          </div>
        </div>
      ))}


      <div className={classes.Line}></div>

      <div className={classes.ButtonDiv}>
        <ThemeProvider theme={buttonTheme}>
          <Button variant="outlined" color="primary" onClick={saveToDatabase}>
            Save Recipe
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AddRecipePage;