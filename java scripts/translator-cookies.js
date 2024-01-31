// Set the original/default language
var lang = "en";
var currentClass = "currentLang";

// Load the language lib
google.load("language", 1);

// When the DOM is ready....
window.addEvent("domready", function() {
    // Retrieve the DIV to be translated.
    var translateDiv = document.id("languageBlock");
    // Define a function to switch from the currentlanguage to another
    var callback = function(result) {
        if (result.translation) {
            translateDiv.set("html", result.translation);
        }
    };

    // is language set? if so, auto translate
    (function() {
        // to avoid "lost in translation" on stacking up, i.e.
        // translate from english to spanish, then from translated spanish back to english or others
        // with errors, always use english as base language.

        if (!translateDiv.retrieve("orig_en")) {
            translateDiv.store("orig_en", translateDiv.get("html"));
        }

        // check cookie and if so, translate and set new base language
        var toLang = Cookie.read("googleLang");
        if (toLang && toLang != lang) {
            google.language.translate(translateDiv.retrieve("orig_en"), lang, toLang, callback);
            lang = toLang;
        }
    })();

    // Add a click listener to update the DIV
    $$("#languages a").addEvent("click", function(e) {
        // Stop the event
        if (e) e.stop();
        // Get the "to" language
        var toLang = this.get("rel");

        if (toLang === lang)
            return;

        // Set the translation into motion
        google.language.translate(translateDiv.get("html"), lang, toLang, callback);
        // Set the new language
        lang = toLang;
        // Add class to current
        this.getSiblings().removeClass(currentClass);
        this.addClass(currentClass);
        // ... and add here the code to save the last choice
        Cookie.write("googleLang", toLang, {
            path: "/"
        });
    });
});