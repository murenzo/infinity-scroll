const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Unsplash API URI

const count = 10;
const apiKey = 'V1yjBVsjZs-805L2wOotFJmq8p4KIW1I8gWbX-n4ars';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function setAttributes(item, attributes) {
    for(const key in attributes) {
        item.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    console.log("Image Loaded");
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


// Display photos
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
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

        // Event listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);

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
        console.log(error);
    }
}

// Check to see if scrolling is near bottom, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();