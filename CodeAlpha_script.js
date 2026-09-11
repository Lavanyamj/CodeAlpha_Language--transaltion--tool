const translateBtn = document.getElementById("translateBtn");
const inputText = document.getElementById("inputText");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const outputText = document.getElementById("outputText");

translateBtn.addEventListener("click", translateText);

async function translateText() {

    const text = inputText.value.trim();
    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    // Check empty input
    if (text === "") {
        outputText.textContent = "Please enter some text to translate.";
        return;
    }

    // Same language
    if (source === target) {
        outputText.textContent = text;
        return;
    }

    // Show loading message
    outputText.textContent = "Translating...";
    translateBtn.disabled = true;

    try {

        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(text) +
            "&langpair=" +
            source +
            "|" +
            target;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        console.log("API Response:", data);

        if (
            data.responseData &&
            data.responseData.translatedText
        ) {

            let translation =
                data.responseData.translatedText;

            // Clean extra spaces
            translation = translation
                .replace(/\s+/g, " ")
                .trim();

            outputText.textContent = translation;

        } else {

            outputText.textContent =
                "Translation could not be found.";

        }

    } catch (error) {

        console.error("Error:", error);

        outputText.textContent =
            "Unable to connect to the translation service.";

    } finally {

        translateBtn.disabled = false;

    }
}
