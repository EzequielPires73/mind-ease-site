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