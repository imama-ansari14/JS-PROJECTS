 const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const result = document.getElementById('result');
        const resultCard = document.getElementById('resultCard');

        searchBtn.addEventListener('click', function() {
            const userInput = searchInput.value.trim();
            
            if (userInput === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops!',
                    text: 'Please enter a recipe name to search.',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }
            
            fetchRecipe(userInput);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        async function fetchRecipe(userInput) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`);
                const data = await response.json();

                if (data.meals === null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No Recipe Found!',
                        text: 'Try searching with a different dish name.',
                        confirmButtonColor: '#dc3545'
                    });
                    result.innerHTML = '';
                    resultCard.classList.remove('active');
                    return;
                }

                const meal = data.meals[0];
                
                result.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2 class="text-center mb-4">${meal.strMeal}</h2>
                    <h4><strong>Category:</strong> ${meal.strCategory}</h4>
                    <h4><strong>Country:</strong> ${meal.strArea}</h4>
                    <h5 class="mt-4"><strong>Instructions:</strong></h5>
                    <p class="text-muted">${meal.strInstructions}</p>
                `;

                resultCard.classList.add('active');
                
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Something went wrong. Please try again later.',
                    confirmButtonColor: '#dc3545'
                });
                console.error('Error:', error);
            }
        }