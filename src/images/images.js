let images = {
    clouds: 'https://image.flaticon.com/icons/svg/414/414927.svg',
    rain: 'https://image.flaticon.com/icons/svg/414/414974.svg',
    clear: 'https://image.flaticon.com/icons/svg/439/439842.svg' 
}

const getImageURL = function(imageName) {
    switch(imageName) {
        case 'Rain':
            return images.rain;
        case 'Clouds':
            return images.clouds;
        case 'Clear':
            return images.clear;
        default:
            return 'Picture not existant'
    }
}

export {getImageURL};