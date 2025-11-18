// GET THE VALUES
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const result = document.querySelector("#result");

// CLICK EVENT
searchBtn.addEventListener("click", () => {
    const userInput = searchInput.value.trim();

    // Check empty input
    if (userInput === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: 'Please enter a recipe name to search.',
            confirmButtonColor: '#d33'
        });
        return;
    }

    // Call API function
    fetchRecipe(userInput);
});

// FUNCTION TO FETCH RECIPE
async function fetchRecipe(userInput) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;

    try {
        // 1. Fetch data from API
        const response = await fetch(url);

        // 2. Convert to JSON
        const data = await response.json();

        // 3. Check if recipe exists
        if (data.meals === null) {
            Swal.fire({
                icon: 'error',
                title: 'No Recipe Found!',
                text: 'Try searching with a different dish name.',
                confirmButtonColor: '#d33'
            });
            result.innerHTML = ""; // clear previous results
            return;
        }

        // 4. Extract first recipe
        const meal = data.meals[0];
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;
        const mealCategory = meal.strCategory;
        const mealArea = meal.strArea;
        const mealInstructions = meal.strInstructions;

        
}
