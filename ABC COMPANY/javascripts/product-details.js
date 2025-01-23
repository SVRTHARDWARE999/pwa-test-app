document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.querySelector(".product-container"); // Ensure this matches the actual class name

    console.log('Product Container:', productContainer); // Log the product container to check if it is selected

    async function products() {
        const productId = new URLSearchParams(window.location.search).get('code');
        console.log('Product ID:', productId); // Log the product ID to check if it is correctly retrieved
        if (!productId) {
            console.error("Product ID is missing in the URL.");
            return;
        }

        try {
            const response = await fetch(`https://script.google.com/macros/s/AKfycbwG2CqkPgJDXqiqmvPZibsl4WnnOnDErXvagPpp9qkLqcCyEbP3Efy5qkujeFOwVZBZTQ/exec?code=${productId}`); // Replace with actual API URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Product Data:', data); // Log the product data
            displayProducts(data);
        } catch (err) {
            console.error("Failed to fetch API data:", err);
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
                    <div class="swiper-slide"><div class="swiper-zoom-container"><img src="${product['image-1']}"></div></div>
                    <div class="swiper-slide"><div class="swiper-zoom-container"><img src="${product['image-2']}"></div></div>
                    <div class="swiper-slide"><div class="swiper-zoom-container"><img src="${product['image-3']}"></div></div>
                    <div class="swiper-slide"><div class="swiper-zoom-container"><img src="${product['image-4']}"></div></div>
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
					<td>item name</td>
					<td>corner shelf clear</td>
				</tr>
				<tr>
					<td>purpose</td>
					<td>multi purpose <br> living room / kitchen / balcony / bathroom</td>
				</tr>
				<tr>
					<td>item brand</td>
					<td translate="no">${product.brand}</td>
				</tr>
				<tr>
					<td>item code</td>
					<td>shiva - 03</td>
				</tr>
				<tr>
					<td>item size</td>
					<td>7" , 9" , 11" ( inches )</td>
				</tr>
				<tr id="price">
					<td>item weight</td>
					<td>250 grams</td>
				</tr>
				<tr>
					<td>MRP</td>
					<td translate="no"> RS -/ <span id="tubc-01"></span> inclusive GST</td>
				</tr>
				<tr>
					<td>Box Contents</td>
					<td>1 set corner Shelf <br>
						1 set screw's <br>
						1 N scratch card 
					</td>
				</tr>
				<tr>
					<td>BPLID</td>
					<td translate="no"> WP.90<sup>+</sup> / MOQ.250P / FP.79<sup>+</sup></td>
				</tr>
				<tr>
					<td>country of origin</td>
					<td> made in india</td>
				</tr>
				<tr>
					<td>warranty</td>
					<td> replacement for only manufacturing defeactes</td>
				</tr>
			</table>
        `;

        // Initialize Swiper
        var swiper = new Swiper(".mySwiper", {
            zoom:true,
            spaceBetween: 30,
            loop:false,
            centeredSlides: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: false,
              type:"bullets",
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    }

    products();
});