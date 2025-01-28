document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.querySelector(".product-container"); // Ensure this matches the actual class name
    const loadingImage = document.createElement('img');
    loadingImage.src = 'sources/loading-fun-2.gif'; // Replace with the actual URL of the loading image
    loadingImage.classList.add('loading-image');
    loadingImage.style.display = 'block'; // Ensure the loading image is visible initially

    console.log('Product Container:', productContainer); // Log the product container to check if it is selected

    async function products() {
        const productId = new URLSearchParams(window.location.search).get('code');
        console.log('Product ID:', productId); // Log the product ID to check if it is correctly retrieved
        if (!productId) {
            console.error("Product ID is missing in the URL.");
            return;
        }

        try {
            productContainer.appendChild(loadingImage); // Show loading image
            const response = await fetch(`https://script.google.com/macros/s/AKfycbwG2CqkPgJDXqiqmvPZibsl4WnnOnDErXvagPpp9qkLqcCyEbP3Efy5qkujeFOwVZBZTQ/exec?code=${productId}`); // Replace with actual API URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Product Data:', data); // Log the product data
            displayProducts(data);
        } catch (err) {
            console.error("Failed to fetch API data:", err);
        } finally {
            loadingImage.style.display = 'none'; // Hide loading image
        }
    }

    function displayProducts(data) {
        if (!data || !productContainer) {
            console.error("Product data or container is missing.");
            return;
        }

        // Log the product object to check its structure
        console.log('Product Object:', data);

        // Assuming the data structure is { "data": [ { ... } ] }
        const product = data.data[0]; // Access the first element of the data array

        productContainer.innerHTML = `
            <div class="product-description">
                ${product.description || 'No description available'}
            </div>
            
            <!-------------------------------- Swiper  Banners ----------------------------->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="swiper-zoom-container">
                            <img src="${product['image-1'] || ''}" alt="Image 1" srcset="" id="thumblain">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-zoom-container">
                            <img src="${product['image-2'] || ''}" alt="Image 2" srcset="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-zoom-container">
                            <img src="${product['image-3'] || ''}" alt="Image 3" srcset="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-zoom-container">
                            <img src="${product['image-4'] || ''}" alt="Image 4" srcset="">
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>

            <!-- Product Pricing Details -->
            <div class="product-price">
                <div><b class="sale-price">${product.wholesale || 'N/A'}<span>+ ${product.gst || 'N/A'} GST</span></b><b class="mrp">MRP <span>${product.mrp || 'N/A'}</span></b><a>📦MOQ <span>${product.moq || 'N/A'} ${product.units || ''}</span> </a></div>
                <div>${product.discount || 'No discount available'}</div>
            </div>

            <!-- Product Detailed Table -->
            <table>
                <tr>
                    <td>Item Name</td>
                    <td>${product.name || 'N/A'}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>${product.category || 'N/A'}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>${product.brand || 'N/A'}</td>
                </tr>
                <!-- Add more rows as needed -->
            </table>
        `;

        // Log the inner HTML to check if it is correctly set
        console.log('Inner HTML set:', productContainer.innerHTML);

        // Initialize Swiper
        var swiper = new Swiper(".mySwiper", {
            zoom: {
                maxRatio: 5,
            },
            spaceBetween: 30,
            loop: false,
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        // Insert meta og:image tag
        const thumbnailImage = document.getElementById('thumblain');
        if (thumbnailImage) {
            const imageUrl = thumbnailImage.src;
            const metaOgImage = document.createElement('meta');
            metaOgImage.setAttribute('property', 'og:image');
            metaOgImage.content = imageUrl;
            document.head.appendChild(metaOgImage);
            console.log('Meta og:image set to:', imageUrl); // Log the image URL to check if it is correctly set
            console.log('Meta tag appended to head:', metaOgImage.outerHTML); // Log the meta tag to check if it is correctly appended
        } else {
            console.error('Thumbnail image with ID "thumblain" not found.');
        }

        // Insert meta description tag
        const productDescription = document.querySelector('.product-description');
        if (productDescription) {
            const descriptionContent = productDescription.textContent.trim();
            const metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = descriptionContent;
            document.head.appendChild(metaDescription);
            console.log('Meta description set to:', descriptionContent); // Log the description to check if it is correctly set
            console.log('Meta tag appended to head:', metaDescription.outerHTML); // Log the meta tag to check if it is correctly appended

            // Insert text inside title tag
            document.title = descriptionContent;
            console.log('Title set to:', descriptionContent); // Log the title to check if it is correctly set
        } else {
            console.error('Product description element with class "product-description" not found.');
        }
    }

    products();
});