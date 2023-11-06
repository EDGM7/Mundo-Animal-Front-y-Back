const publicar = document.getElementById('publicar-animal')

function enviarData(animal) {
    fetch('http://localhost:3060/animales/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(animal)
    }).then(response => response.text())
        .then(data => {
            /** Procesar los datos **/
            datos = JSON.parse(data)
            console.log(datos)
        });
}

function recibirDatos() {
    const nombre = document.getElementById('nombre')
    const cientifico = document.getElementById('cientifico')
    const habitat = document.getElementById('habitat')
    const peligro = document.getElementById('peligro')
    const tipo = document.getElementById('tipo')


    if (nombre.value.trim() == 0 || cientifico.value.trim() == 0 || habitat.value.trim() == 0 || peligro.value.trim() == 0 || tipo.value.trim() == 0) {
        return alert('Has ingresado datos no validos')
    }

    animal = {
        "nombre": nombre.value,
        "nombre_cientifico": cientifico.value,
        "habitat": habitat.value,
        "peligro_extincion": peligro.value,
        "tipo_animal": tipo.value,
    }

    console.log(JSON.stringify(animal))

    nombre.value = '';
    cientifico.value = '';
    habitat.value = '';
    peligro.value = '';
    tipo.value = '';

    enviarData(animal)
}

publicar.addEventListener('click', (e) => {
    e.preventDefault()
    recibirDatos()
})