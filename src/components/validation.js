export function hasNull(array) {
	console.log(array);
    return array==='' ? true  : false ;
}
export function isRequired(value) {
    return (value === "") || (value === undefined)
}