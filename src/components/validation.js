export function hasNull(array) {
    return array==='' ? true  : false ;
}
export function isRequired(value) {
    return (value === "") || (value === undefined)
}