function showLoadingSpinner() {
    document.getElementById("loadingSpinner").classList.remove("visually-hidden")
    document.getElementById("translateBtn").classList.add("visually-hidden")
}

// Function to hide loading spinner and reset Translate button
function hideLoadingSpinner() {
    document.getElementById("loadingSpinner").classList.add("visually-hidden")
    document.getElementById("translateBtn").classList.remove("visually-hidden")
}

document.getElementById("InputText").addEventListener("input", function() {
    var text = this.value;
    var count = text.length;
    console.log(count)
    document.getElementById("charCount").textContent = count + "/500";
});

document.getElementById("translateBtn").addEventListener("click", function () {
    var selectedLanguage = document.getElementById("dropdownMenuButton").innerText.trim();
    var data = document.getElementById('translateBtn').value;
    console.log(data);
    if (selectedLanguage == "Select Language") {
        document.getElementById("alertBlock").classList.remove("visually-hidden");
        return console.log("Select Language");
    } else {
        document.getElementById("alertBlock").classList.add("visually-hidden");
        showLoadingSpinner();
        // Get the text data from textarea
        const textData = document.getElementById("InputText").value;
        const selectedLanguage = document.querySelector("#dropdownMenuButton").innerText

        // Construct the data object in the required format
        const postData = {
            "text": textData,
            "type": selectedLanguage
        };

        // Make API request
        fetch(data + "/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Sending JSON data, so set Content-Type accordingly
            },
            body: JSON.stringify(postData) // Convert JavaScript object to JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Assuming the API returns text response
            })
            .then(data => {
                console.log("API response:", data);
                // Parse the JSON string into a JavaScript object
                const parsedData = JSON.parse(data);
                // Display the translated text in Traditional Chinese in the textarea
                document.getElementById("TextAreaEn").value = parsedData.translated_en;
                document.getElementById("TextAreaTw").value = parsedData.translated_tw;
                document.getElementById("TextAreaTh").value = parsedData.translated_th;
                hideLoadingSpinner();
            })
            .catch(error => {
                console.error("Error:", error);
                hideLoadingSpinner();
            });
    }

});
