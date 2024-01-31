// This program uses QuaggaJS library to scan barcodes and open html pages
// Source: [QuaggaJS]

// Initialize the QuaggaJS scanner
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#scanner')    // Select the scanner element
    },
    decoder : {
      readers : ["code_128_reader"] // Specify the barcode format
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

// Define a callback function to handle the scanned result
Quagga.onDetected(function(result) {
    var code = result.codeResult.code; // Get the barcode value
    console.log("Detected barcode: " + code);
    var url = "/" + code + ".html"; // Construct the html page url
    window.open(url, "_blank"); // Open the html page in a new tab
});