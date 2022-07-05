//Copied from old project, sort out if it is needed in the future

enum ImageNames {
    Test = 'test',
}

function setupImages() {
    const imageDiv = document.getElementById('images');

    for (let imageName in ImageNames) {
        const image = new Image();
        image.src = 'images/' + ImageNames[imageName] + '.png';
        imageDiv.append(image);
        images[ImageNames[imageName]] = image;
    }
}

let images = {} as Record<ImageNames, HTMLImageElement>;
