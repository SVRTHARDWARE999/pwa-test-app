document.addEventListener("DOMContentLoaded", function() {
  const productContainer = document.querySelector(".product-container");
  const loadingImage = document.createElement('img');
  loadingImage.src = 'sources/loading-fun-2.gif';
  loadingImage.classList.add('loading-image');
  loadingImage.style.display = 'block';

  console.log('Product Container:', productContainer);

  async function products() {
    const productId = new URLSearchParams(window.location.search).get('code');
    console.log('Product ID:', productId);
    if (!productId) {
      console.error("Product ID is missing in the URL.");
      return;
    }

    try {
      productContainer.appendChild(loadingImage);
      const response = await fetch(`https://script.google.com/macros/s/AKfycbwG2CqkPgJDXqiqmvPZibsl4WnnOnDErXvagPpp9qkLqcCyEbP3Efy5qkujeFOwVZBZTQ/exec?code=${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Product Data:', data);
      displayProducts(data);
    } catch (err) {
      console.error("Failed to fetch API data:", err);
    } finally {
      loadingImage.style.display = 'none';
    }
  }

  function displayProducts(data) {
    if (!data || !productContainer) {
      console.error("Product data or container is missing.");
      return;
    }

    console.log('Product Object:', data);
    const product = data.data[0];

    const imageUrl = product['image-1'] || '';
    const descriptionContent = product.description || 'No description available';

    localStorage.setItem('shareText', descriptionContent);

    const metaOgImage = document.createElement('meta');
    metaOgImage.setAttribute('property', 'og:image');
    metaOgImage.content = imageUrl;
    document.head.appendChild(metaOgImage);
    console.log('Meta og:image set to:', imageUrl);
    console.log('Meta tag appended to head:', metaOgImage.outerHTML);

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = descriptionContent;
    document.head.appendChild(metaDescription);
    console.log('Meta description set to:', descriptionContent);
    console.log('Meta tag appended to head:', metaDescription.outerHTML);

    document.title = descriptionContent;
    console.log('Title set to:', descriptionContent);

    productContainer.innerHTML = `
      <div class="product-description">
        ${descriptionContent}
      </div>

      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="swiper-zoom-container">
              <img src="${imageUrl}" alt="Image 1" srcset="" id="thumblain">
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

      <div class="product-price">
        <div><b class="sale-price">${product.wholesale || 'N/A'}<span>+ ${product.gst || 'N/A'} GST</span></b><b class="mrp">MRP <span>${product.mrp || 'N/A'}</span></b><a>📦MOQ <span>${product.moq || 'N/A'} ${product.units || ''}</span> </a></div>
        <div class="discount">${product.discount || 'No discount available'}</div>
        <button id="shareButton"><i class="fa-solid fa-share-nodes"></i> Share</button>
      </div>

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
      </table>
    `;

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
    });

    const shareButton = document.getElementById('shareButton');
    shareButton.addEventListener('click', async () => {
      const thumbnailImage = document.getElementById('thumblain');
      const pageUrl = window.location.href;

      if (thumbnailImage) {
        const imageUrl = thumbnailImage.src;
        const descriptionContent = localStorage.getItem('shareText') || 'No description available';
        console.log("Description from localStorage:", descriptionContent); // Log the retrieved text

        if (navigator.share) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const imageBitmap = await createImageBitmap(blob);

            if (imageBitmap.width === imageBitmap.height) {
              const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

              await navigator.share({
                title: document.title,
                text: descriptionContent,
                url: pageUrl,
                files: [file]
              });
            } else {
              const canvas = document.createElement('canvas');
              const size = Math.max(imageBitmap.width, imageBitmap.height);
              const padding = size * 0.05;
              const paddedSize = size + padding * 2;
              canvas.width = paddedSize;
              canvas.height = paddedSize;
              const ctx = canvas.getContext('2d');

              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, paddedSize, paddedSize);

              const xOffset = (paddedSize - imageBitmap.width) / 2;
              const yOffset = (paddedSize - imageBitmap.height) / 2;
              ctx.drawImage(imageBitmap, xOffset, yOffset);

              const newBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
              const file = new File([newBlob], 'image.jpg', { type: 'image/jpeg' });

              await navigator.share({
                title: document.title,
                text: descriptionContent,
                url: pageUrl,
                files: [file]
              });
            }

            console.log('Content shared successfully');
          } catch (error) {
            console.error('Error sharing content:', error);

            if (error.name === 'NotAllowedError') {
              alert('Sharing permission denied by the user.');
            } else if (error.name === 'AbortError') {
              console.log('User canceled the sharing action.');
            } else {
              console.error('An unexpected error occurred:', error);
            }
          }
        } else {
          console.error('Web Share API is not supported in this browser.');
        }
      } else {
        console.error('Thumbnail image not found.');
      }
    });

    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('shareText');
    });
  }

  products();
});