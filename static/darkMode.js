function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
  
    // Save the dark mode preference to a cookie
    const isDarkMode = body.classList.contains('dark-mode');
    setCookie('darkMode', isDarkMode ? 'enabled' : 'disabled', 365);
  }
  
  // Function to set a cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Function to get a cookie value by name
  function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
  
  // Check if dark mode preference exists in cookie
  window.onload = function() {
    const darkModePreference = getCookie('darkMode');
    if (darkModePreference === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }