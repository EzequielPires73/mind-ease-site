export const blobToFile = async (path: string) => {
    let myFile = null;
    await fetch(path)
        .then((res) => res.blob())
        .then((myBlob) => {
            myFile = new File([myBlob], 'image.jpeg', {
                type: myBlob.type,
            });
        });
    return myFile;
}

export function audioVideoFileFilter(file: File) {
    const allowedExtensions = /\.(mp3|wav|mp4|avi)$/;

    if (!file.name.match(allowedExtensions)) {
        return false;
    }

    return true;
}

export const imageFileFilter = (file: File) => {
    if (!file.name.match(/\.(jpg|jpeg|png|gif|webp|JPG)$/)) {
        return false
    }
    return true;
};

export function pngFileFilter(file: File) {
    if (!file.name.match(/\.(png)$/)) {
        return false;
    }
    return true;
}