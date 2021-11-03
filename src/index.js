'use strict'
window.addEventListener("load", function() {
    document.getElementById('Nuevo').addEventListener('click', function() {
        document.getElementById('coches').classList.add("hide")
        document.getElementById('formulario').classList.remove("hide")
        fuel();
    });
    
    document.getElementById('Home').addEventListener('click', function() {
        document.getElementById('coches').classList.remove("hide")
        document.getElementById('formulario').classList.add("hide")
    });
    
    document.getElementById('formulario').addEventListener('submit', (event) => {
        
            
        if(!document.getElementById('formulario').checkValidity()) {
	    const inputName = document.getElementsByTagName('input');
        const selectName = document.getElementsByTagName('select');
        const fotoinput = document.getElementsByTagName('input')[4];
        var foto = fotoinput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.webp)$/i;
        

        if(!allowedExtensions.exec(foto)){
            fotoinput.setCustomValidity('La extension de la imagen no es correcta');
            document.getElementById('photo').innerHTML = inputName[4].validationMessage;
        }else{
            fotoinput.setCustomValidity(' ');
            document.getElementById('photo').innerHTML = inputName[4].validationMessage;
        }

        selectName[0].setCustomValidity("Campo Obligatiorio");

        document.getElementById('name').innerHTML = inputName[0].validationMessage;    
        document.getElementById('original_price').innerHTML = inputName[1].validationMessage;
        document.getElementById('discount_price').innerHTML = inputName[2].validationMessage;
        document.getElementById('stars').innerHTML = inputName[3].validationMessage;
        
        document.getElementById('fuelError').innerHTML = selectName[0].validationMessage;
        document.getElementById('marcha').innerHTML = inputName[5].validationMessage;
        document.getElementById('km').innerHTML = inputName[7].validationMessage;
        document.getElementById('Acepto').innerHTML = inputName[8].validationMessage;
    } else {
        let nombreCoche = document.getElementById('name1').value;
        let precioOriginal = Number(document.getElementById('original_price1').value)
        let precioDescuento =  Number(document.getElementById('discount_price1').value)
        let kilom =  Number(document.getElementById('km1').value)
        let estars =  Number(document.getElementById('stars1').value)
        let combus = Number(document.getElementById('fuel1').value) 
        let camb = document.getElementById('marcha1').value
        let coche = {
            name:nombreCoche,
            km:kilom,
            original_price:precioOriginal,
            discount_price:precioDescuento,
            stars:estars,
            sale: true,
            fuel:combus,
            manual_gear:camb
        }
        crearProducto(coche);
    }
    fuel();
})

    iniciar()
})



function iniciar(){
    for (let index = 0; index <= products.length; index++) {
        crearProducto(products[index]);
    }
}



function cambio(manual_gear){
    if(manual_gear){
        return 'Cambio manual';
    } else {
        return 'Cambio automático';
    }
}

function combustible(combustible){
    let tipoCombustible = typesOfFuel.find(tipoCombustible => tipoCombustible.id === combustible);
    return tipoCombustible.fuel;
}

function renderFuel(type){
    type.forEach(element => fuel(element));
}

function fuel(){
    let tipoCombustible = document.getElementById('fuel1');
    for (let index = 0; index <= typesOfFuel.length; index++) {
        let opcion = document.createElement('option');
        opcion.textContent=typesOfFuel[index].fuel
        opcion.value=typesOfFuel[index].id
        tipoCombustible.appendChild(opcion)
    }
    
}

function puntuacion(estrella){
    let puntos = '';
    for (let index = 0; index < estrella; index++) {
        puntos += '<div class="bi-star-fill"></div>';
    }
    return puntos;
}

function precioDescuento(original_price, discount_price){
    let span = '';
    if(discount_price){
        span = '<span class="text-muted text-decoration-line-through">'+ original_price +' €  </span>' + discount_price + ' €'
    } else {
        span = original_price + ' €'
    }
    return span;
}

function vendido(sale){
    let estado = '';
    if(sale){
        estado = 'Sale'
    } else {
        estado = ''
    }
    return estado;
}
function crearProducto(product){
    const divBuscar = document.getElementById('products')
    let newProduct = document.createElement('div');
    
    newProduct.className = 'col mb-5';
    newProduct.innerHTML = `<div class="card h-100">
    <!-- Sale badge, sólo si está vendido-->
    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${vendido(product.sale)}</div>
    <!-- Product image-->
    <img class="card-img-top" src="media/photos/${product.img}" alt="${product.name}" />
    <!-- Product details-->
    <div class="card-body p-4">
        <div class="text-center">
            <!-- Product name-->
            <h5 class="fw-bolder">${product.name}</h5>
            <!-- Product reviews, un div bi-star para cada estrella a pintar-->
            <div class="d-flex justify-content-center small text-warning mb-2">
                ${puntuacion(product.stars)}
            </div>
            <!-- Product price-->
                ${precioDescuento(product.original_price, product.discount_price)}
            <!-- Product details -->
            <p>
                <br>${combustible(product.fuel)}
                <br> ${cambio(product.manual_gear)}
                <br>${product.km}km
            </p>
        </div>
    </div>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class=" mostrar btn btn-outline-dark mt-auto" href="">Mostrar</a></div>
    </div>
</div>`

    divBuscar.appendChild(newProduct)
    newProduct.querySelector('.mostrar').addEventListener('click', () => {
        showProduct(product)   
    })
    }




function showProduct(product){
    console.log(product);
} 

