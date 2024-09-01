const google_icons = document.createElement("link");
google_icons.rel = "stylesheet";
google_icons.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
document.head.appendChild(google_icons);

const fontawesome = document.createElement("link");
fontawesome.rel = "stylesheet";
fontawesome.href = "https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css";
document.head.appendChild(fontawesome);

const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "style.css";
document.head.appendChild(style);


const links = document.createElement("link");
links.rel = "stylesheet";
links.href = "links.css";
document.head.appendChild(links);

const script = document.createElement("script");
script.src = 'links.js';
script.type = 'text/javascript';
document.body.appendChild(script);
