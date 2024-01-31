const searchForm = document.getElementById("searchbar-container");
const searchButton = document.getElementById("search");

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchinput = searchForm.searchinput.value;

    if (searchinput === "ayla")
    {
        location.href="/products/example-product.html";
        return false;
    }

    else if (searchinput === "amy")
    {
        location.href="/download-app.html";
        return false;
    }
    else if (searchinput === "fuck"){
        location.href="/products/example-product.html";
        return false;
    }
   
    else {
        location.href="/no-search-result.html";
    }
})