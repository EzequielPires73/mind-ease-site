import { IProperty } from "../types/interfaces";
import { propertyTypeData } from "../utils/data";

function findInOptions(param: string, options) {
    let optionSelected;
    options.forEach(option => {
        { option.enum === param ? optionSelected = option : null }
    });
    return optionSelected;
}

export function getImmobileTitleCard({ address, adType, type }: IProperty) {
    let title = '';
    const typeOption = findInOptions(type, propertyTypeData); 
    {type ? title = title + typeOption.name : null}
    {adType && adType === 'aluguel' ? title = title + ' para alugar ' : null}
    {adType && adType === 'venda' ? title = title + ' à venda ' : null}
    { address?.district?.name ? title = title + 'no bairro ' + address.district.name : null }
    { !address?.district?.name && address?.city?.name ? title = title + 'em ' + address.city.name : null }
    return title;
}

export function getSmallTitle({ adType, type }: IProperty) {
    let title = '';
    const typeOption = findInOptions(type, propertyTypeData); 
    {type ? title = title + typeOption.name : null}
    {adType && adType === 'aluguel' ? title = title + ' para alugar ' : null}
    {adType && adType === 'venda' ? title = title + ' à venda ' : null}
    return title;
}