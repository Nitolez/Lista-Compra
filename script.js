document.addEventListener('DOMContentLoaded', () => {


    const arrayStock = [
        { producto: 'Lechuga', id: '1' },
        { producto: 'Arroz', id: '2' },
        { producto: 'Chocolate', id: '3' },
        { producto: 'Lágrimas', id: '4' },
        { producto: 'Café', id: '5' },
        { producto: 'Carne', id: '6' },
        { producto: 'Agua', id: '7' },
        { producto: 'Nestea', id: '8' }
    ];
    const listaStock = document.querySelector('#productos');
    const fragment = document.createDocumentFragment();
    const ulLista = document.querySelector('#stock');
    const ulCompra = document.querySelector('#listaCarrito');


    //Eventos
    //Evento para pintar carrito de la compra    
    document.addEventListener('click', ({ target }) => {
        const boton = target.closest('.botonAniadir');
        if (boton) {
            const id = boton.id;
            obtenerProductos(id);

        } else if (target.matches('.botonEliminar')) {
            const id = target.dataset.id;
            eliminarProducto(id);
        } else if (target.matches('#clear')) {
            localStorage.clear();
            pintarCarrito();
        }
    });

    //Evento limpiar todo el localStorage


    //Funciones
    //Función pintar lista de productos stock
    const pintarLista = () => {
        arrayStock.forEach(({ producto, id }) => {
            const elementoLista = document.createElement('li');
            const buttonElemento = document.createElement('button');
            buttonElemento.innerHTML = 'Añadir';
            buttonElemento.id = id;
            buttonElemento.className = 'botonAniadir';
            elementoLista.innerHTML = producto;
            elementoLista.append(buttonElemento);
            fragment.append(elementoLista);
        })
        ulLista.append(fragment);
    };

    //Funcion almacenar en localStorage
    const obtenerProductos = (id) => {
        const productoElegido = arrayStock.find((objeto) => objeto.id === id);
        let productosEnCarrito = JSON.parse(localStorage.getItem("productos")) || [];

        const productoExistente = productosEnCarrito.find((objeto) => objeto.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            productoElegido.cantidad = 1;
            productosEnCarrito.push(productoElegido);
        }
        localStorage.setItem("productos", JSON.stringify(productosEnCarrito));
        pintarCarrito();
    };


    //Función pintar en el carrito
    const pintarCarrito = () => {
        const productosCarrito = JSON.parse(localStorage.getItem("productos"));
        ulCompra.innerHTML = '';

        if (productosCarrito && productosCarrito.length > 0) {
            productosCarrito.forEach((elemento) => {
                const elementoCarrito = document.createElement('li');
                const botonEliminar = document.createElement('button');
                botonEliminar.classList.add('botonEliminar');
                botonEliminar.innerHTML = 'Eliminar';
                botonEliminar.dataset.id = elemento.id; 
                elementoCarrito.textContent = `${elemento.producto} - Cantidad ${elemento.cantidad}`;
                elementoCarrito.append(botonEliminar);
                ulCompra.append(elementoCarrito);
            });
        } else {
            const mensajeVacio = document.createElement('li');
            mensajeVacio.innerHTML = 'El carrito está vacío.';
            ulCompra.append(mensajeVacio);
        }

    };

    //Función eliminar del carrito
    const eliminarProducto = (id) => {
        let productosEnCarrito = JSON.parse(localStorage.getItem("productos")) || [];
        productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
        localStorage.setItem("productos", JSON.stringify(productosEnCarrito));
        pintarCarrito();
    };

    /*pintarCarrito 
    innerHTML = '';
    pintar*/
    pintarLista();


    pintarCarrito();

});//LOAD