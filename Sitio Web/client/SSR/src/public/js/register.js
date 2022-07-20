const inputs = document.querySelectorAll( '#caja-registro input' )

const expresiones = {
    nombre_cliente: /^[a-zA-Z ]{10,15}$/,
    cedula        : /^\d{10}$/,
    password      : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    facultad      : /^[a-zA-Z ]{3,}/,
    user          : /^[a-zA-ZÀ-ÿ\s\d]{5,}$/,
    telefono      : /^\d{10}$/,
    edad          : /^\d{1,2}$/,
}

const validarFormulario = ( e ) => {
    switch ( e.target.name ) {
    case 'nombre_cliente':
        if ( expresiones.nombre_cliente.test( e.target.value ) ) {
            document.getElementById( 'a-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'a-error' ).innerHTML =
                    'Nombre no válido'
        }
        break
    case 'cedula':
        if ( expresiones.cedula.test( e.target.value ) ) {
            document.getElementById( 'n-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'n-error' ).innerHTML =
                    'Cedula no válida'
        }
        break
    case 'user':
        if ( expresiones.user.test( e.target.value ) ) {
            document.getElementById( 'nu-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'nu-error' ).innerHTML =
                    'Nombre de usuario no válido'
        }
        break
    case 'password':
        if ( expresiones.password.test( e.target.value ) ) {
            document.getElementById( 'p-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'p-error' ).innerHTML =
                    'La contraseña debe incluir una letra mayúscula, minuscula y un numero'
        }
        break
    case 'facultad':
        if ( expresiones.facultad.test( e.target.value ) ) {
            document.getElementById( 'f-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'f-error' ).innerHTML =
                    'Facultad no valida'
        }
        break
    case 'telefono':
        if ( expresiones.telefono.test( e.target.value ) ) {
            document.getElementById( 'c2-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'c2-error' ).innerHTML =
                    'Telefono no válido'
        }
        break
    case 'edad':
        if ( expresiones.edad.test( e.target.value ) ) {
            document.getElementById( 'd-error' ).innerHTML = ''
            document.getElementById( 's-error' ).innerHTML = ''
        } else {
            document.getElementById( 'd-error' ).innerHTML =
                    'Edad no válido'
        }
        break
    }
}

inputs.forEach( ( input ) => {
    input.addEventListener( 'keyup', validarFormulario )
    input.addEventListener( 'blur', validarFormulario )
} )
