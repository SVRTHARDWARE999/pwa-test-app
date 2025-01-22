document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.querySelector(".dynamic-products");
    const loadingImage = document.createElement('img');
    loadingImage.src = 'sources/loading-animation.gif'; // Replace with the actual URL of the loading image
    loadingImage.classList.add('loading-image');

    productsContainer.appendChild(loadingImage);

    const API = "https://script.google.com/macros/s/AKfycbwG2CqkPgJDXqiqmvPZibsl4WnnOnDErXvagPpp9qkLqcCyEbP3Efy5qkujeFOwVZBZTQ/exec";
    let allProducts = [];
    let loadedCount = 0;
    const loadIncrement = 10;
    let isLoading = false;

    async function products() {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Check the full data structure
            allProducts = shuffleArray(data.data); // Assuming data contains a property 'data' that holds the array
            loadMoreProducts(); // Load initial set of products
        } catch (err) {
            console.error("Failed to fetch API data:", err);
        } finally {
            productsContainer.removeChild(loadingImage); // Remove loading image
        }
    }

    products();

    // Function to load more products
    function loadMoreProducts() {
        if (isLoading || loadedCount >= allProducts.length) return;
        isLoading = true;
        console.log(`Loading more products... Loaded count: ${loadedCount}`);
        const nextProducts = allProducts.slice(loadedCount, loadedCount + loadIncrement);
        displayProducts(nextProducts);
        loadedCount += loadIncrement;
        isLoading = false;
    }

    // Displaying API Products Data in HTML template Page
    function displayProducts(data) {
        if (productsContainer) { // Check if container is not null
            data.forEach((product, index) => {
                console.log(`Product ${index}:`, product);
                const productTemplate = `
                <button class="product" onclick="window.location.href='product-details.html'">
                <img src="${product['image-1']}" alt="" srcset="">
                <p class="product-description">${product.description}</p>
                <p class="product-price"><a><span>${product.wholesale}</span><span>MRP ${product.mrp}</span></a><a>${product.discount}</a></p>
                </button>
                `;
                productsContainer.insertAdjacentHTML('beforeend', productTemplate);
                console.log(`Inserted product ${index} into container`);
            });
        } else {
            console.log("productsContainer is null. Ensure your HTML contains an element with class 'dynamic-products'.");
        }
    }

    // Function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Infinite scroll event listener
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            console.log('Scrolled to bottom, loading more products...');
            loadMoreProducts();
        }
    });
});