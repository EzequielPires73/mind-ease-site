import axios from "axios";

export const getImageUrl = (path: string) => {
    if (!path) {
        return '/no-image.png';
    }
    return path.startsWith('storage') || path.startsWith('assets') ? `${process.env.NEXT_PUBLIC_URL_DEFAULT}${path}` : path;
}

export const getImageFile = async (url) => {
    const blob = await axios({
        url: 'https://m.media-amazon.com/images/I/51t9M1lT7sL._SX328_BO1,204,203,200_.jpg',
        method: 'GET',
        responseType: 'blob'
    }).then(res => new Blob([res.data]));

    const file = new File([blob], 'image.jpeg', {
        type: blob.type,
    });
    
    const data = new FormData();
    data.append('file', file);
    return data;
}