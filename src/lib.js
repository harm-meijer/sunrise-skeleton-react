//in React you can just return the observable
//  because React does not usually have observable
//  in React it will be: export const getValue = (observable) => observable;
export const getValue = (observable) => observable;
export const getAttributeValue = (attribute, locale) => {
  if (
    typeof attribute === 'object' &&
    typeof attribute?.label === 'string'
  ) {
    return attribute.label;
  }
  if (
    typeof attribute === 'object' &&
    typeof attribute?.[locale] === 'string'
  ) {
    return attribute?.[locale];
  }
  if (
    typeof attribute === 'object' &&
    typeof attribute?.label === 'object' &&
    typeof attribute?.label?.[locale] === 'string'
  ) {
    return attribute?.label?.[locale];
  }
  return attribute;
};
