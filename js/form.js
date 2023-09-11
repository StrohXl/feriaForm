const firstName = document.querySelector("#name")
const labelName = document.querySelector("#labelName")
const lastName = document.querySelector("#lastName")
const lastNameLabel = document.querySelector("#lastNameLabel")
const rut = document.querySelector("#rut")
const rutLabel = document.querySelector("#rutLabel")
const date = document.getElementsByClassName("date")[0]
const datos = document.getElementsByClassName("date")
const options = document.querySelector("#options")
const $form = document.querySelector('#email-form')
const dateLabel = document.querySelector("#dateLabel")
const invitedBy = document.querySelector("#invitedBy")
const notification = document.getElementsByClassName('notification')
const invitedByLabel = document.querySelector("#invitedByLabel")
const email = document.querySelector('#email')
const emailLabel = document.querySelector('#emailLabel')
const option = document.getElementsByClassName('option')
const optionsShow = document.getElementById('options')



// Evitar las letras, puntos y guion
rut.addEventListener("keydown", function (event) {

    // Obtiene el código de la tecla presionada
    const keyCode = event.keyCode || event.which;
    // Obtiene la tecla correspondiente al código
    const key = String.fromCharCode(keyCode);
    // Verifica si la tecla presionada es un número (entre 0 y 9)
    if (
        keyCode > 75 && keyCode < 96 ||
        keyCode > 105 || keyCode == 46 || keyCode == 45 || key === '.' || key === '-'
    ) {
        // Evita que se ingrese el carácter no numérico
        event.preventDefault();
    }
});


// Cerrar select al presionar en otro lado

document.addEventListener("click", function (event) {
    var targetElement = event.target; // Elemento en el que se hizo clic

    // Verificar si el clic ocurrió fuera de la ventana emergente
    if (!optionsShow.contains(targetElement) && targetElement != document.getElementsByClassName("date")[0]) {

        if (date.innerText == '') {
            requiredDate.classList += ' required-show'
            dateLabel.classList = 'field-label-2 label-red'
            date.classList = 'text-field-2 w-input text-red date'
            options.classList = "options"
        }
        else {
            options.classList = "options"
        }
    }
});



// Control de la fecha

const fecha = new Date()
const month = fecha.getMonth() + 1
const getHours = fecha.getHours()
const getDay = fecha.getDate()
console.log(month)

// Control de la informacion en el formulario

const quest = ' (M sin cargo hasta las 00:30 / H descuento hasta las 00:30)'
const quest2 = ' (M sin cargo hasta las 00:30)'
const eventsDays = [
    {
        month: 9,
        day: 14
    },
    {
        month: 9,
        day: 15
    },
    {
        month: 9,
        day: 16
    },

]

for (let index = 0; index < eventsDays.length; index++) {
    if (month > eventsDays[index].month) {
        option[index].innerHTML = option[index].id + "Evento finalizado"
    }
    if (month == eventsDays[index].month && getDay > eventsDays[index].day) {
        option[index].innerHTML = option[index].id + "Evento finalizado"
    }
    if (month == eventsDays[index].month && getDay == eventsDays[index].day && getHours >= 22) {

        option[index].innerHTML = option[index].id + "Evento en curso"
    }

}




// required
const requiredName = document.getElementsByClassName('requiredName')
const requiredLast = document.getElementsByClassName('requiredLast')
const requiredRut = document.getElementsByClassName('requiredRut')
const requiredInvi = document.getElementsByClassName('requiredInvi')
const requiredDate = document.getElementsByClassName('requiredDate')[0]
const requiredEmail = document.getElementsByClassName('requiredEmail')



const sendData = () => {
    const contentItemForm = document.getElementsByClassName('content-items-form')[0]
    const XHR = new XMLHttpRequest();
    const form = new FormData($form)
    let object = {};
    form.forEach(function (value, key) {
        object[key] = value;
    });

    const dateNow = new Date()
    const timeZonedDate = dateNow.toLocaleString('es-MX', {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    )

    let formDataFormated = {}
    formDataFormated.$formdata = []
    formDataFormated.$formdata.push(
        {
            key: "dateDay",
            value: date.id
        }
    )
    formDataFormated.$formdata.push(
        {
            key: "firstName",
            value: object.firstName
        }
    )
    formDataFormated.$formdata.push(
        {
            key: "lastName",
            value: object.lastName
        }
    )
    formDataFormated.$formdata.push(
        {
            key: "rut",
            value: object.rut
        }
    )
    formDataFormated.$formdata.push(
        {
            key: "invitedBy",
            value: object.invitedBy
        }
    )
    formDataFormated.$formdata.push(
        {
            key: "email",
            value: object.email
        }
    )
    formDataFormated.$formdata.push(
        {
            key: "date",
            value: timeZonedDate
        }
    )

    // Enviar a Excell
    let json = JSON.stringify(formDataFormated)
    XHR.addEventListener("load", function (event) {
        /// aqui se agrega la redireccion:
        contentItemForm.style.zIndex = '-1'
        notification[0].classList = 'notification notification-show'
        setTimeout(() => {
            notification[0].classList = 'notification notification-blur'
            setTimeout(() => {
                window.location.href = "https://laferia23.laferia.cl//";
            }, 2000)
        }, 4000)
    })

    XHR.addEventListener("error", function (event) {
        alert('Oops! algo salio mal');
    })
    XHR.open("POST",
        `https://prod-03.brazilsouth.logic.azure.com:443/workflows/eeb149352625428a8b908e8abfd34544/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=F5tSG5udmkJXh3Y2BiP7zEAuwQSb_hq1PifDz_V0uJ0`);
    XHR.setRequestHeader("Content-Type", "application/json");

    // The data sent is what the user provided in the form
    XHR.send(json)




}

// nombre

firstName.addEventListener('focus', () => {
    labelName.classList = 'field-label-2 label-focus'
})
firstName.addEventListener('blur', () => {
    if (firstName.value.length > 0) {
        labelName.classList = 'field-label-2 label-complet'
        firstName.classList = 'text-field-2 w-input name-2'
        requiredName[0].classList = 'required requiredName'
    }
    else {
        requiredName[0].classList += ' required-show'
        labelName.classList = 'field-label-2 label-red'
        firstName.classList = 'text-field-2 w-input text-red'

    }
})

// Date
date.addEventListener('click', () => {
    if (dateLabel.classList == 'field-label-2 label-focus') {
        if (date.innerText == '') {
            requiredDate.classList += ' required-show'
            dateLabel.classList = 'field-label-2 label-red'
            date.classList = 'text-field-2 w-input text-red date'
            options.classList = "options"
        }
        else {

            if (options.classList == "options-show") {
                options.classList = "options"
            }
            else {
                if (eventsDays.length == 4) {
                    options.classList = "options-show options-show-2"
                }
                if (eventsDays.length == 5) {
                    options.classList = "options-show options-show-3"
                }
                else {
                    options.classList = "options-show"
                }
            }

        }
    }

    else {
        date.classList = 'text-field-2 w-input text-red date'
        dateLabel.classList = 'field-label-2 label-focus'
        if (eventsDays.length == 4) {
            options.classList = "options-show options-show-2"

        }
        if (eventsDays.length == 5) {
            options.classList = "options-show options-show-3"

        }
        else {
            options.classList = "options-show"
        }

    }

})


for (let index = 0; index < option.length; index++) {
    if (month > eventsDays[index].month || month == eventsDays[index].month && getDay > eventsDays[index].day
        || month == eventsDays[index].month && getDay == eventsDays[index].day && getHours >= 22) {
    }
    else {
        option[index].addEventListener("click", () => {
            index == 7 ?
                date.innerHTML = option[index].id + quest2
                :
                date.innerHTML = option[index].id + quest
            date.id = option[index].id
            dateLabel.classList = 'field-label-2 label-complet'
            date.classList = 'text-field-2 w-input date'
            requiredDate.classList = 'required requiredDate'
            options.classList = "options"
        })
    }


}


// apellido 

lastName.addEventListener('focus', () => {
    lastNameLabel.classList = 'field-label-2 label-focus'


})
lastName.addEventListener('blur', () => {
    if (lastName.value.length > 0) {
        lastNameLabel.classList = 'field-label-2 label-complet'
        lastName.classList = 'text-field-3 w-input'
        requiredLast[0].classList = 'required requiredLast'
    }
    else {
        lastNameLabel.classList = 'field-label-2 label-red'
        requiredLast[0].classList = 'required requiredLast required-show'
        lastName.classList = 'text-field-3 w-input text-red'
    }
})

// rut

rut.addEventListener('focus', () => {
    rutLabel.classList = 'field-label-2 label-focus'
    rut.placeholder = "26765501k"

})
let rutvalid = ''
function valideKey(e) {
    const char = String.fromCharCode(e.keyCode) // Get the character
    // Match with regex
    if (/^[0-9\-|‐|kK]+$/i.test(char)) {
        return true
    } else { e.preventDefault() } // If not match, don't add to input text */
}
rut.oninput = (e) => {
    rutValidator(e.target.value)
    function rutValidator(value) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(value)) {
            requiredRut[0].classList = 'required requiredRut required-show'
            requiredRut[0].innerHTML = "Formato del RUT inválido"
        }

        const tmp = value.split('')
        const split = tmp.filter((i, index) => index != (tmp.length - 1))
        const rutArray = [Number(split.join(''))]

        if (rutArray[0].length < 7) {
            requiredRut[0].classList = 'required requiredRut required-show'
            requiredRut[0].innerHTML = "Faltan dígitos en el RUT"
        }
        else {
            let digv = tmp[(tmp.length - 1)]

            if (digv == 'K' || digv == 'k') {
                digv = 'k'
            }
            const isValid = validator(rutArray) === digv
            rutvalid = isValid

            if (isValid) {

                rutLabel.classList = 'field-label-2 label-complet'
                rut.classList = 'text-field-4 w-input'
                requiredRut[0].classList = 'required requiredRut'
                requiredRut[0].innerHTML = "RUT Correcto"

            }
            else {

                requiredRut[0].innerHTML = "RUT Inválido"
                requiredRut[0].classList = 'required requiredRut required-show'
                rut.classList = 'text-field-4 w-input text-red'
            }
        }

    }
    function validator(T) {
        let M = 0;
        let S = 1

        for (0; T; T = Math.floor(T / 10)) {
            S = (S + T % 10 * (9 - M++ % 6)) % 11
        }

        return S ? (S - 1).toString() : 'k'
    }


}
rut.addEventListener('blur', () => {
    if (rut.value.length > 0) {
    }
    else {
        requiredRut[0].innerHTML = 'Este campo es requerido'
        rut.placeholder = ""
        rutLabel.classList = 'field-label-2 label-red'
        rut.classList = 'text-field-4 w-input text-red'
        requiredRut[0].classList = 'required requiredRut required-show'
    }
})

// invitado

invitedBy.addEventListener('focus', () => {
    invitedByLabel.classList = 'field-label-2 label-focus'

})
invitedBy.addEventListener('blur', () => {
    if (invitedBy.value.length > 0) {
        invitedByLabel.classList = 'field-label-2 label-complet'
        invitedBy.classList = 'text-field-5 w-input'
        requiredInvi[0].classList = 'required requiredInvi'

    }
    else {
        invitedByLabel.classList = 'field-label-2 label-red'
        invitedBy.classList = 'text-field-5 w-input text-red'
        requiredInvi[0].classList = 'required requiredInvi required-show'

    }
})

const verificationEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,11})+$/;
// email
email.addEventListener('focus', () => {
    emailLabel.classList = 'field-label-2 label-focus'
    email.placeholder = 'correo@mail.com'
})
email.addEventListener('blur', () => {
    if (email.value.length > 0) {
        if (verificationEmail.test(email.value)) {
            requiredEmail[0].classList = 'required requiredEmail'
            email.classList = 'text-field-5 w-input'
            emailLabel.classList = 'field-label-2 label-complet'
        }
        else {
            requiredEmail[0].innerHTML = 'Correo electronico invalido'
            requiredEmail[0].classList = 'required requiredEmail required-show'
            email.classList = 'text-field-5 w-input text-red'
        }

    }
    else {
        email.placeholder = ''
        requiredEmail[0].innerHTML = 'Este campo es requerido'
        emailLabel.classList = 'field-label-2 label-red'
        email.classList = 'text-field-5 w-input text-red'
        requiredEmail[0].classList = 'required requiredEmail required-show'
    }
})


$form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (rutvalid == false) {
        alert('Rut Invalido')
    }
    if (verificationEmail.test(email.value) == false) {
        alert('Correo electronico invalido')
    }
    if (date.innerText == '') {
        alert('Porfavor seleccione un dia')
        dateLabel.classList = 'field-label-2 label-focus'
        options.classList = "options-show"
    }
    if (rutvalid == true && verificationEmail.test(email.value) == true
        && date.innerText != ''
    ) {
        sendData()
    }

})
