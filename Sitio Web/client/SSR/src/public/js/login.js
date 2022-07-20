const inputs = document.querySelectorAll( '#caja-login input' )

const expresiones = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    user    : /^[a-zA-ZÀ-ÿ\s]{5,}$/,
}

const validarFormulario = ( e ) => {
    switch ( e.target.name ) {
    case 'password':
        if ( expresiones.password.test( e.target.value ) ) {
            document.getElementById( 'p-error' ).innerHTML = ''
        } else {
            document.getElementById( 'p-error' ).innerHTML =
                    'La contraseña debe incluir una letra mayúscula, minuscula y un numero'
        }
        break
    case 'user':
        if ( expresiones.user.test( e.target.value ) ) {
            document.getElementById( 'c-error' ).innerHTML = ''
        } else {
            document.getElementById( 'c-error' ).innerHTML =
                    'Nombre de usuario no válido'
        }
        break
    }
}

inputs.forEach( ( input ) => {
    input.addEventListener( 'keyup', validarFormulario )
    input.addEventListener( 'blur', validarFormulario )
} )
