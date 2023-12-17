import slugify from "slugify";

export const normalizeString = (value: string) => slugify(value, {lower: true});

export function findValueInOptions(param: string, options) {
    let optionSelected;
    options.forEach(option => {
        { option.enum === param ? optionSelected = option : null }
        { !optionSelected && normalizeString(option.name) === normalizeString(param) ? optionSelected = option : null }
    });
    return optionSelected;
}