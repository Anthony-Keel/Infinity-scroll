const imageConatiner = document.getElementById('image-conatiner');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
let apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

// Check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if ( imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;      
    }
}
// create hel;per for set attribute
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
//create element for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
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
        // event listener check when photos are loaded 
        img.addEventListener('load', imageLoaded);

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
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30); 
            isInitialLoad = false;
          } 
    }catch(error){

    }
}
// check to see if scrolling near bottom of page  load more photos

window.addEventListener('scroll', ()=>{
  if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready){
    ready=false;
    getPhotos();
  }
});
// on load
getPhotos();