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
  /*  var pattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{6})$/;
    return pattern.test(String(array).toLowerCase());*/
    return array==='' ? true  : false ;
}

export function hasValidPassword(array) {
    var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,100}$/;
    return pattern.test(String(array).toLowerCase());
}

export function hasValidUrl(array) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 
    return pattern.test(String(array).toLowerCase());
}

export function hasValidDate(array){
    return array==='' ? true  : false ;
  /*  if(array!==''){
       // if(new Date(array.value) > new.Date())
        var pattern= /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12][0-9]|3[01])$/;
        return pattern.test(String(array).toLowerCase());
    }else{
        return false;
    }*/
}   


export function hasNumeric(array){
    if(array!==''){
        var pattern=/^[0-9]+$/;
        return pattern.test(String(array).toLowerCase());
    }else{
        return false;
    }
}