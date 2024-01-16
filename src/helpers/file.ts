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

export function checkFileType(arquivo) {
    var extensoesAudio = ['.mp3', '.wav', '.aac', '.flac', '.ogg', '.m4a', '.wma'];
    var extensoesVideo = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm'];
    var extensoesImagem = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg'];

    if (extensoesAudio.some(extensao => arquivo.includes(extensao))) {
        return 1;
    } else if (extensoesVideo.some(extensao => arquivo.includes(extensao))) {
        return 2;
    } else if (extensoesImagem.some(extensao => arquivo.includes(extensao))) {
        return 3;
    } else {
        return 0;
    }
}