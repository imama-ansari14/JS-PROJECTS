// GET THE VALUES
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const result = document.querySelector("#result");

searchBtn.addEventListener("click", () => {
    const userInput = searchInput.value.trim();
    // Check empty input
    if (userInput === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter something!',
        });
        return;
    }

    // Call the API function (VERY IMPORTANT)
    fetchRecipe(userInput);
});

// Function structure (we will fill logic next)
async function fetchRecipe(userInput) {

    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;


}
