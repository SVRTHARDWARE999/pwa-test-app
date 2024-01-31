// top nav-bar script
const nav = document.querySelector('.navigation')
fetch('/nav-bar.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    eval(doc.querySelector('script').textContent)
})

    // When the user scrolls down 20px from the top of the document, slide down the navbar
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("search-header").style.top = "0";
      } else {
        document.getElementById("search-header").style.top = "-50%";
      }
    }


// <!-- ------------------menu script-------------------- -->

    function openNav() {
    document.getElementById("menu").style.width = "75%";
    document.getElementById("overlay").style.width = "100%";
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
    }
    
    function closeNav() {
    document.getElementById("menu").style.width = "0%";
    document.getElementById("overlay").style.width = "0%";
    const body = document.querySelector("body");
    body.style.overflowY = "scroll";
    }


