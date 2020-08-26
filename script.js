const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API URI

const count = 5;
const apiKey = 'V1yjBVsjZs-805L2wOotFJmq8p4KIW1I8gWbX-n4ars';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function setAttributes(item, attributes) {
    for(const key in attributes) {
        item.setAttribute(key, attributes[key]);
    }
}


// Display photos
function displayPhotos() {
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description,
        });

        // Put <img> inside <a>, then put inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


// Fetch photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        console.log(erro);
    }
}

getPhotos();