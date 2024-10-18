document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.querySelector(".products-container");
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Loading...';
    loadingText.classList.add('loading-text');

    productsContainer.appendChild(loadingText);

    const API = "https://script.google.com/macros/s/AKfycbwrgNJEF8HusuLaku2XMDbK9uQ5bXn3ICF50Fn4nYDEcGcMiCiXzCfustbKOgKE9iJu/exec";

    async function products() {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Check the full data structure
            displayProducts(data.data); // Assuming data contains a property 'data' that holds the array
        } catch (err) {
            console.error("Failed to fetch API data:", err);
        } finally {
            productsContainer.removeChild(loadingText); // Remove loading text
        }
    }

    products();

    // Displaying API Products Data in HTML template Page
    function displayProducts(data) {
        if (productsContainer) { // Check if container is not null
            data.forEach((product, index) => {
                console.log(`Product ${index}:`, product);
                const productTemplate = `
                    <div class="product">
                        <p>${product.name}</p>
                        <p>${product.code}</p>
                        <p>${product.category}</p>
                        <p>MRP ₹${product.mrp} <span>${product.discount}</span></p>
                    </div>
                `;
                productsContainer.insertAdjacentHTML('beforeend', productTemplate);
                console.log(`Inserted product ${index} into container`);
            });
        } else {
            console.log("productsContainer is null. Ensure your HTML contains an element with class 'products-container'.");
        }
    }
});
