function changeLanguage(language) {
    document.getElementById('dropdownMenuButton').innerText = language;
}

function EnglsihcopyToClipboard() {
    var textarea = document.getElementById("TextAreaEn");
    textarea.select();
    document.execCommand("copy");
    // alert("Text copied to clipboard!");
}

function ChinesecopyToClipboard() {
    var textarea = document.getElementById("TextAreaTw");
    textarea.select();
    document.execCommand("copy");
    // alert("Text copied to clipboard!");
}

function ThaicopyToClipboard() {
    var textarea = document.getElementById("TextAreaTh");
    textarea.select();
    document.execCommand("copy");
    // alert("Text copied to clipboard!");
}

