const imageConatiner = document.getElementById('image-conatiner');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// create hel;per for set attribute
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
//create element for links and photos
function displayPhotos(){
    // run function for each object in the photosArray
    photosArray.forEach((photo) => {
        // create anchor element to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create image for photo
        const img= document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        item.appendChild(img);
        imageConatiner.appendChild(item);
    });
}

// get photos from unsplash
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    }catch(error){

    }
}
// on load
getPhotos();