let counter = 4;

const root = document.createElement('div');
 document.body.appendChild(root);

const container = document.createElement('div');
 container.className = 'container';
 root.appendChild(container);

const footer = document.createElement('footer');
root.appendChild(footer);

const pages = [
 { background: 'red', text: 'Home' },
 { background: 'green', text: 'Movies' },
 { background: 'yellow', text: 'Add' },
 { background: 'gray', text: 'Music' },
 { background: 'blue', text: 'Tools' }
];

const footers = [
 { id: 'home', icon: 'home', text: 'Home' },
 { id: 'videos', icon: 'subscriptions', text: 'Videos' },
 { id: 'add', icon: 'add_circle', text: '' },
 { id: 'audios', icon: 'music_note', text: 'Audios' },
 { id: 'scripted', icon: 'video_library', text: 'Scripted' }
];

pages.forEach(page => {
 const div = document.createElement('div');
 div.className = 'page';
 div.style.color = page.background;
 div.innerHTML = `<h1>${page.text}</h1>`;
 container.appendChild(div);
});


footers.forEach(footerItem => {
 const div = document.createElement('div');
 div.className = 'footer';
 div.id = footerItem.id;
 div.innerHTML = `<span class="material-symbols-outlined">${footerItem.icon}</span><p>${footerItem.text}</p>`;
 footer.appendChild(div);
});

const pageElements = document.querySelectorAll('.page');
const footerElements = document.querySelectorAll('.footer');
updateSlide(counter);

footerElements.forEach((footer, index) => footer.addEventListener('click', () => setSlide(index + 1)));
function changeSlide(n) {
 updateSlide(counter += n);
}

function setSlide(n) {
 updateSlide(counter = n);
}

function updateSlide(n) {
 if (n > pageElements.length) counter = 1;
 if (n < 1) counter = pageElements.length;
 pageElements.forEach(page => page.style.display = 'none');
 footerElements.forEach(footer => footer.classList.remove('active'));
 pageElements[counter - 1].style.display = 'block';
 footerElements[counter - 1].classList.add('active');
}
