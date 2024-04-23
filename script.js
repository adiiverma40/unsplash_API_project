
// Define the Unsplash API access token
const token = 'your unsplash token';

// Function to add images to the DOM
async function addImage(data) {
    try {
        let images = document.querySelector("#images");
        let searched = document.querySelector("#searched");
        searched.innerHTML = `Result related to: ${data.query}`;
        for (let i = 0; i < data.imageUrls.length; i++) {
            let image = document.createElement("img");
            image.src = data.imageUrls[i];
            image.classList.add("images");
            images.appendChild(image);
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to fetch images from Unsplash API
async function fetchImage(query) {
    try {
        let response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${token}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        const regularImageUrls = data.results.map(result => result.urls.regular);
        await addImage({ query: query, imageUrls: regularImageUrls });
        console.log(regularImageUrls);
    } catch (error) {
        console.log(error);
    }
}
let form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    let query = document.querySelector('#searchInput').value.trim();
    if (query === "") {
        alert('Please enter a search query');
    } else {
        fetchImage(query);
    }
}
