function getShoppingList()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getActiveRange();
  var $arrRecipes = range.getValues();
  var $arrIngredients = new Array();
  var $arrShoppingList = new Array();

  //We identify all rows that correspond to an ingredient in a recipe,
  //and we create an ingredients only array
  for ($rowIndex in $arrRecipes) {
    //Before Adding, we test the correct structure for an ingredient. 
    //It must have:
    //[Name],[Unit],[Unitary_quantity],[Unitary_cost],[Total_quantity],[Total_cost]
    //(String),(String),(float),(float),(float),(float)
    if (
      typeof ($arrRecipes[$rowIndex][0]) == "string" &&
      typeof ($arrRecipes[$rowIndex][1]) == "string" &&
      typeof ($arrRecipes[$rowIndex][2]) == "number" &&
      typeof ($arrRecipes[$rowIndex][3]) == "number" &&
      typeof ($arrRecipes[$rowIndex][4]) == "number" &&
      typeof ($arrRecipes[$rowIndex][5]) == "number"
    ) {
      $arrIngredients.push(Array(
        $arrRecipes[$rowIndex][0],
        $arrRecipes[$rowIndex][1],
        $arrRecipes[$rowIndex][2],
        $arrRecipes[$rowIndex][3],
        $arrRecipes[$rowIndex][4],
        $arrRecipes[$rowIndex][5]
      ));
    } else {
      continue;
    }
  }

  //We check the ingredients array and sum the quantities of those ingredients
  //that are repeated inside the list, this is, ingredients that are in fact the same ingredient.
  for ($ingredientKey in $arrIngredients){
    $strIngredientName = $arrIngredients[$ingredientKey][0].toString();
    $strIngredientUnit = $arrIngredients[$ingredientKey][1].toString();
    $numIngredientCost = $arrIngredients[$ingredientKey][3] * 1;
    $numIngredientAmount = $arrIngredients[$ingredientKey][4] * 1;

    if ($arrShoppingList[$strIngredientName] !== undefined){

      //console.log("Sumar " + $strIngredientName + "; cantidades: " + $arrShoppingList[$strIngredientName] + " + " + $strIngredientAmount);

      $arrShoppingList[$strIngredientName][3] += $numIngredientAmount;

      //console.log("Resultado " + $strIngredientName + " " + $arrShoppingList[$strIngredientName]);
    } else {
      $arrShoppingList[$strIngredientName] = new Array();
      $arrShoppingList[$strIngredientName][0] = $strIngredientName;
      $arrShoppingList[$strIngredientName][1] = $strIngredientUnit;
      $arrShoppingList[$strIngredientName][2] = $numIngredientCost;
      $arrShoppingList[$strIngredientName][3] = $numIngredientAmount;

    }
  }

  return $arrShoppingList;
}
