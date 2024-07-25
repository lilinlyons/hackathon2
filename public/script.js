console.log("Starting ...");

let clear = document.getElementById("clear")


const getRecipes = async (ingredients) => {
    console.log("Working ...");
    const recipes = [];
    const query = ingredients.map(ingredient => encodeURIComponent(ingredient)).join(',');

    try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=43a2ea30&app_key=9f2d1a202b20e89cfbce0e7e5085d2ec&q=${query}`);
        console.log(`https://api.edamam.com/api/recipes/v2?type=public&app_id=43a2ea30&app_key=9f2d1a202b20e89cfbce0e7e5085d2ec&q=${query}`)
        if (!response.ok) {
            throw new Error("Failed fetch");
        }
        const data = await response.json();
        data.hits.forEach((item) => {
            recipes.push(item.recipe);
        });
    } catch (error) {
        console.log(`We got the error: ${error}`);
    }
    console.log("Work Done ...");
    return recipes;
};

let initialIngredients = JSON.parse(localStorage.getItem('ingredients'))
getRecipes(JSON.parse(localStorage.getItem('ingredients'))).then((recipes) => {
        // initialIngredients.forEach((element)=>{
        //     const selectedItem = document.createElement('div');
        //     selectedItem.textContent = element;
        //     selectedItem.classList.add('selected-item');
        //     document.getElementById('selectedItems').appendChild(selectedItem);
        //
        // })
    let existingElement = document.getElementsByClassName('img-grid')[0];
    let rowElement = null;

    recipes.forEach((item, index) => {
        if (index % 5 === 0) {
            rowElement = document.createElement('div');
            rowElement.classList.add('row');
            existingElement.append(rowElement);
        }

        let newElement = document.createElement('div');
        newElement.classList.add('img-wrapper');

        let newImg = document.createElement('img');
        newImg.src = item['image'];
        newImg.style.width = '200px';

        let newLink = document.createElement('a');
        newLink.href = item['url'];

        let newText = document.createElement('h4');
        newText.textContent = item['label'];

        newElement.append(newImg);
        newElement.append(newText);

        newElement.append(newLink);

        rowElement.append(newElement);
    });

})


let ingredients = [];
const config = {
    placeHolder: "Search for Food...",
    data: {
        src: [
            "Goat", "Chicken", "Beef", "Pork", "Salmon", "Tofu", "Broccoli", "Carrots",
            "Spinach", "Tomatoes", "Garlic", "Onions", "Butter", "Eggs", "Milk",
            "Cream", "Yogurt", "Flour", "Sugar", "Salt", "Cumin", "Paprika", "Oregano",
            "Basil", "Thyme", "Rosemary", "Ginger", "Coriander", "Vinegar", "Honey",
            "Mustard", "Ketchup", "Mayonnaise", "Soybeans", "Chickpeas", "Lentils",
            "Pasta", "Rice", "Quinoa", "Barley", "Potatoes", "Squash", "Zucchini",
            "Eggplant", "Mushrooms", "Avocado", "Almonds", "Walnuts", "Cashews",
            "Pecans", "Raisins", "Pine", "Sunflower", "Pumpkin", "Chia", "Flax",
            "Sriracha", "Tabasco", "Hot", "Coconut", "Sesame", "Ghee", "Tahini",
            "Ricotta", "Cream", "Miso", "Seaweed", "Apple", "Banana", "Orange",
            "Peach", "Pear", "Plum", "Grape", "Kiwi", "Mango", "Papaya", "Fig",
            "Date", "Pineapple", "Melon", "Apricot", "Guava", "Lychee", "Cherry",
            "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Lemon", "Lime",
            "Grapefruit", "Tangerine", "Pomegranate", "Cucumber", "Lettuce", "Cabbage"
        ]
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = '';

                const selectedItem = document.createElement('div');
                selectedItem.textContent = selection;
                selectedItem.classList.add('selected-item');
                ingredients.push(selectedItem.textContent);

                const removeBtn = document.createElement('span');
                removeBtn.textContent = 'x';
                removeBtn.classList.add('remove');
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    const index = ingredients.indexOf(selection);
                    if (index > -1) {
                        ingredients.splice(index, 1);
                    }
                    selectedItem.remove();
                    console.log(ingredients);

                    getRecipes(ingredients).then((recipes) => {
                        let existingElement = document.getElementsByClassName('img-grid')[0];
                        existingElement.innerHTML = ''; // Clear previous results
                        let rowElement = null;

                        recipes.forEach((item, index) => {
                            if (index % 5 === 0) {
                                rowElement = document.createElement('div');
                                rowElement.classList.add('row');
                                existingElement.append(rowElement);
                            }

                            let newElement = document.createElement('div');
                            newElement.classList.add('img-wrapper');

                            let newImg = document.createElement('img');
                            newImg.src = item['image'];
                            newImg.style.width = '200px';

                            let newLink = document.createElement('a');
                            newLink.href = item['url'];

                            let newText = document.createElement('h4');
                            newText.textContent = item['label'];

                            newElement.append(newImg);
                            newElement.append(newText);

                            newElement.append(newLink);

                            rowElement.append(newElement);
                        });
                    }).catch((error) => {
                        console.error(`Could not get recipes: ${error}`);
                    });
                };

                selectedItem.appendChild(removeBtn);

                document.getElementById('selectedItems').appendChild(selectedItem);
                const promise = getRecipes(ingredients);
                promise
                    .then((recipes) => {
                        let existingElement = document.getElementsByClassName('img-grid')[0];
                        existingElement.innerHTML = ''; // Clear previous results
                        let rowElement = null;

                        recipes.forEach((item, index) => {
                            if (index % 5 === 0) {
                                rowElement = document.createElement('div');
                                rowElement.classList.add('row');
                                existingElement.append(rowElement);
                            }

                            let newElement = document.createElement('div');
                            newElement.classList.add('img-wrapper');

                            let newImg = document.createElement('img');
                            newImg.src = item['image'];
                            newImg.style.width = '200px';

                            let newLink = document.createElement('a');
                            newLink.href = item['url'];

                            let newText = document.createElement('h4');
                            newText.textContent = item['label'];

                            newElement.append(newImg);
                            newElement.append(newText);

                            newElement.append(newLink);

                            rowElement.append(newElement);
                        });

                    })
                    .catch((error) => {
                        console.error(`Could not get recipes: ${error}`);
                    });

            }
        }
    }
};

const autoCompleteJS = new autoComplete(config);
