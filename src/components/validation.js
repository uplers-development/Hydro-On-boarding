export function hasNull(array) {
	console.log(array);
    return array==='' ? true  : false ;
}
export function isRequired(value) {
    return (value === "") || (value === undefined)
}
export function hasValidEmail(array) {
    if (array !== '') {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(pattern.test(String(array).toLowerCase()));
        return array=pattern.test(String(array).toLowerCase());
    } else {
        return false;
    }
}
export function hasValidMobile(array) {
    var pattern = /^([0-9]{10})+$/;
    return pattern.test(String(array).toLowerCase());
}

export function hasValidPassword(array) {
    var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,100}$/;
    return pattern.test(String(array).toLowerCase());
}