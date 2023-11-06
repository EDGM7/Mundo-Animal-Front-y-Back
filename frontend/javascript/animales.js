const lista = document.querySelector(".lista-animales")
let datos = []

function introducirAnimales(animales) {

    animales.forEach(animal => {
        const div = document.createElement("div")
        div.className = "tarjeta-producto animacion-color"
        lista.appendChild(div);

        const img = document.createElement("img")
        img.src = 'https://www.telesurtv.net/__export/1536773161941/sites/telesur/img/news/2018/09/12/animales-extinsixn--blog-nuncajamascocker-compressor.jpg'
        img.alt = "imagen-del-animal"
        img.className = "img-producto animacion-color"
        div.appendChild(img);

        const h3 = document.createElement("h3")
        h3.className = "primario titulo-producto animacion-color-texto"
        h3.textContent = animal.nombre
        div.appendChild(h3);

        const nombre = document.createElement("h4")
        nombre.className = "cienftífico"
        nombre.textContent = "Nombre Científico: " + animal.nombre_cientifico
        div.appendChild(nombre);

        const peligro = document.createElement("p")
        peligro.className = "descripcion"
        peligro.textContent = "En Peligro: " + animal.peligro_extincion
        div.appendChild(peligro);

        const habitat = document.createElement("p")
        habitat.className = "descripcion"
        habitat.textContent = "Hábitat Natural: " + animal.habitat
        div.appendChild(habitat);

        const tipo = document.createElement("p")
        tipo.className = "descripcion"
        tipo.textContent = "Tipo de Animal: " + animal.tipo_animal
        div.appendChild(tipo);
    });
}

function traerData() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    fetch('http://localhost:3060/animales/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.text())
        .then(data => {
            /** Procesar los datos **/
            datos = JSON.parse(data)
            console.log(datos)
            introducirAnimales(datos.totalAnimales)
        });
}

traerData()