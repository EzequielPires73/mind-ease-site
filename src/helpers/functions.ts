import { IUser } from "../types/interfaces";

export const checkRealEstate = (user) => {
    let realEstate = null;
    if (user.isRealEstate) realEstate = user;
    if (user.realEstate && !user.isRealEstate) realEstate = user.realEstate;
    if (!realEstate || !user) throw new Error('É necessário uma imobiliária.');

    return realEstate;
}

export function findInOptions(param: string, options) {
    let optionSelected;
    options.forEach(option => {
        { option.enum === param ? optionSelected = option : null }
    });
    return optionSelected;
}

export const normalizeString = (url: string) => {
    if(!url) return null;
    url = url?.replaceAll(' ', '-');
    url = url?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
    return url;
}

export const findNameInOptions = (param: string, options) => {
    let optionSelected = null;
    options.forEach(option => {
        { option.enum === param ? optionSelected = option.name : null }
    });
    return optionSelected;
}

export const normalizeStringToQuery = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();