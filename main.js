// Window.onload para que se ejecute cuando todo termino y no haya riesgos ;) //

window.onload = () =>{
	mostrarProductos(productos);
	mostrarCarrito(localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : []);
	
}

//-----Variables----// pasar a Jquery 
let subtotal = 0;
let listaProductos;

//let carrito = []

$.getJSON("productos.json", function(req,res){
	if(res === "success"){
	  let misDatos= req;
	  listaProductos = new Productos(misDatos); 
	  listaProductos.render("#contenedor");
	}  
  });
  

const contenedor_productos = document.getElementById('contenedor-productos');
const contenedor_carrito = document.getElementById('contenedor-carrito');

// Funcion listar productos

function mostrarProductos(productos){
	productos.forEach((producto) => {
		let div_producto = document.createElement ('div');
		div_producto.className = 'producto';

		let marca = document.createElement ('h3');
		marca.className = 'marca';
		marca.textContent = `${producto.marca} ${producto.nombre}`;
		

		let imagen = document.createElement ('img');
		imagen.src = producto.imagen;
		imagen.className = 'imagen'

		let precio = document.createElement ('h4');
		precio.className = 'precio';
		precio.textContent = '$' + producto.precio;
		
		let boton = document.createElement ('button');
		boton.innerHTML = 'Añadir al carrito';
		boton.className = 'btn agregar';
		boton.id = producto.id;

		div_producto.appendChild(marca);
		div_producto.appendChild(imagen);
		div_producto.appendChild(precio);
        div_producto.appendChild(boton);

		contenedor_productos.appendChild(div_producto);

	});
}

// funciones crear y agregar al carrito ---- esta funcion de contar los clicks, te dice: si el if esta en target, en el agregar entonces dame el atributo 'id' de ese click, y lo agrego al carrito//

contenedor_productos.addEventListener('click', e=>{
	if(e.target.classList.contains('agregar')){
		let id=e.target.getAttribute ('id');
		let producto= productos.find(e=>e.id==id);

		agregarCarrito(producto);
	}
});


function agregarCarrito(producto) {
	let carrito = localStorage.getItem ('carrito') ?
	JSON.parse (localStorage.getItem('carrito')): [];
	carrito.push(producto)
	//guardar Storage
	//let carritoParseado = JSON.stringify(carrito); mejor hacer =>
	localStorage.setItem('carrito', JSON.stringify(carrito));
	mostrarCarrito(carrito);

}

// QUITAR productos de carrito

contenedor_carrito.addEventListener('click', e=>{
	//let carrito= JSON.parse(localStorage.getItem('carrito'));
	if(e.target.classList.contains('quitar')){
		let id=parseInt(e.target.getAttribute('id'));
		quitarProductoCarrito(id);
	}

});


function quitarProductoCarrito(id){
	let carritoQuitar = localStorage.getItem('carrito')? JSON.parse(localStorage.getItem('carrito')) : [];
	let productoEncontrado= carritoQuitar.find(e=>e.id==id);
	carritoQuitar.splice(carritoQuitar.indexOf(productoEncontrado), 1); //se le agrega el uno por una cuestion del index del array, que empieza en 0
	localStorage.setItem ('carrito', JSON.stringify(carritoQuitar));
	mostrarCarrito(carritoQuitar);
}
/////////////////////////
const titulo = document.getElementById('titulo')
const contenedor = document.getElementById('contenedor')
const tableBody = document.getElementById('tabla-contenedor')
const carrito = []
function agregarAlCarrito(prodId) {

    let producto = productos.find( (el) => el.id === prodId )
    carrito.push( producto )
 
    mostrarCompra()
    console.log(carrito.precio)

    document.getElementById("total").innerHTML = carrito.reduce(getSum, 0);

    function getSum(total, num) {
        return total + Math.round(num);
     }
    }

const mostrarCompra = () => {

    tableBody.innerHTML = ""

    carrito.forEach( (prod) => {
        const tr = document.createElement('tr')
        tr.className = "table table-dark table-striped"
        tr.innerHTML = `
            
            <td>${prod.nombre}</td>
            <td>x${prod.cantidad}</td>
            <td>$${prod.precio}</td>
            
        `    
        tableBody.appendChild(tr)
    })
    
}


// Funciones mostrar productos del carrito // con un While que limpia el HTML:

 function mostrarCarrito(carrito){
	while (contenedor_carrito.firstChild) {
		contenedor_carrito.removeChild
		(contenedor_carrito.firstChild);
	}

	for(producto of carrito){
		let div_carrito = document.createElement
		('div');
		div_carrito.className = 'producto';
		div_carrito.id = producto.id

		let marca = document.createElement ('h3');
		marca.className = 'marca' ;
		marca.textContent = `${producto.marca} ${producto.nombre}`; 

		let stock = document.createElement ('h5');
		stock.className = 'stock';
		if (producto.stock > 0) {
			stock.textContent = 'Stock: ' + producto.stock;
		}else stock.textContent = 'No Disponible';

		let imagen = document.createElement ('img');
		imagen.src = producto.imagen;
		imagen.className = 'imagen';

		let precio = document.createElement('h4');
		precio.className = 'precio';
		precio.textContent = '$' + producto.precio;

		let boton = document.createElement('button');
		boton.innerHTML = 'Eliminar de carrito';
		boton.className = 'btn quitar';
		boton.id = producto.id;

		div_carrito.appendChild(marca);
		div_carrito.appendChild(imagen);
		div_carrito.appendChild(precio);
		div_carrito.appendChild(boton);

		contenedor_carrito.appendChild(div_carrito);
	}
}
 
// ======================API Coronavirus===============================
let url = "https://api.covid19api.com/summary"

$(document).ready(function() {
    contador()
    function contador() {
        var data = ``
        
        $.get(url,function(data){


            data = `
            <td>${data.Global.TotalConfirmed} </td>
            <td>${data.Global.TotalDeaths} </td>
            <td>${data.Global.NewConfirmed} </td>
            `
            $("#data").html(data)
        })
    }

})

//---------- ordenar productos-----------//

$("#ordenar").on("change", (e)=>{ 
    console.log(e.target.value)
    switch(e.target.value){
        case "menor":
            let menorPrecio=(listaProductos.productos).sort(function (a, b) {
                if (a.precio > b.precio) {
                  return 1;
                }
                if (a.precio < b.precio) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });    
            let produtoOrdenado= new Productos(menorPrecio);
            console.log(produtoOrdenado);
            produtoOrdenado.render("#producto-carrito");            
            break;
        case "mayor":
            let mayorPrecio=(listaProductos.productos).sort(function (a, b) {
                if (b.precio > a.precio) {
                  return 1;
                }
                if (b.precio < a.precio) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });    
            let ordenadoMayorPrecio= new Productos(mayorPrecio);
            console.log(ordenadoMayorPrecio);
            ordenadoMayorPrecio.render("#producto-carrito");
            
		} 
});