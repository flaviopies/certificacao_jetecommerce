export function isValidEmail(emailToValidate){
    var email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u);

    if (email.test(emailToValidate))
        return true
    else
        return false
}

export function validarEmail(email) {
    // filtros
    var emailFilter = /^.+@.+\..{2,}$/;
    var illegalChars = /[\(\)\ \<\>\,\;\:\\\/\"\[\]]/;

    if (!(emailFilter.test(email)) || email.match(illegalChars)) return false;

    return true;
}

export function validPhone (phone) {
    var regex = new RegExp('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im');
    return regex.test(phone);
}