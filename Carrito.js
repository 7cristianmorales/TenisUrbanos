// ========================= CARGA DEL DOM ========================= //

// Esto hace que el código se ejecute cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', () => {
    
    // ========================= SELECCIONAR ELEMENTOS ========================= //
    const botonesAgregar = document.querySelectorAll('.btn-primary'); // Botones para agregar productos
    const listaCarrito = document.querySelector('#lista-carrito tbody'); // Donde se muestran los productos en el carrito
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // Botón para vaciar todo el carrito

    // ========================= CARGAR CARRITO DESDE LOCALSTORAGE ========================= //
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recupera los productos guardados en el carrito o lo deja vacío

    ACTUALIZAR_CARRITO(); // Muestra los productos del carrito al cargar la página

    // ========================= EVENTOS ========================= //
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', AGREGAR_PRODUCTO); // Cada botón de "Agregar" llama a la función AGREGAR_PRODUCTO
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = []; // Borra todos los productos del carrito
        GUARDAR_CARRITO(); // Guarda el carrito vacío en localStorage
        LIMPIAR_CARRITO(); // Limpia la tabla del carrito en la página
    });

    // ========================= FUNCIONES ========================= //

    // ---------- Agregar un producto al carrito ----------- //
    function AGREGAR_PRODUCTO(event) {
        const producto = event.target.parentElement; // Encuentra el producto que se agregó

        const infoProducto = {
            imagen: producto.querySelector('img').src, // Imagen del producto
            nombre: producto.querySelector('p:nth-of-type(1)').textContent, // Nombre del producto
            precio: producto.querySelector('p:nth-of-type(2)').textContent, // Precio del producto
            cantidad: 1, // Siempre empieza con 1 unidad
            talla: 35 // Talla predeterminada
        };

        const existe = carrito.find(prod => prod.nombre === infoProducto.nombre); // Busca si el producto ya está en el carrito

        if (existe) {
            existe.cantidad++; // Si el producto ya está, aumenta la cantidad
        } else {
            carrito.push(infoProducto); // Si es nuevo, lo agrega al carrito
        }

        GUARDAR_CARRITO(); // Guarda los cambios en localStorage
        MOSTRAR_NOTIFICACION("Producto agregado al carrito 🛒"); // Muestra un mensaje al usuario
        ACTUALIZAR_CARRITO(); // Refresca la tabla del carrito en la página
    }

    // ---------- Mostrar mensaje cuando agregamos un producto ----------- //
    function MOSTRAR_NOTIFICACION(mensaje) {
        const notificacion = document.createElement('div'); // Crea un cuadrito de mensaje
        notificacion.classList.add('notificacion'); // Le da estilo
        notificacion.textContent = mensaje; // Muestra el mensaje

        document.body.appendChild(notificacion); // Lo agrega a la página

        setTimeout(() => {
            notificacion.remove(); // Borra el mensaje después de 3 segundos
        }, 3000);
    }

    // ---------- Actualizar el carrito en la página ----------- //
    function ACTUALIZAR_CARRITO() {
        LIMPIAR_CARRITO(); // Borra lo que hay en la tabla antes de actualizar

        carrito.forEach(producto => {
            const fila = document.createElement('tr'); // Crea una nueva fila para la tabla

            fila.innerHTML = `
                <td><img src="${producto.imagen}" width="40"></td> <!-- Muestra la imagen -->
                <td>${producto.nombre}</td> <!-- Muestra el nombre -->
                <td>${producto.precio}</td> <!-- Muestra el precio -->
                <td>${producto.cantidad}</td> <!-- Muestra la cantidad -->
                <td>
                    <select class="seleccionar-talla" data-nombre="${producto.nombre}"> <!-- Menú de tallas -->
                        ${GENERAR_OPCIONES_TALLA(producto.talla)}
                    </select>
                </td>
                <td><button class="eliminar-producto" data-nombre="${producto.nombre}">❌</button></td> <!-- Botón para eliminar -->
            `;

            listaCarrito.appendChild(fila); // Agrega la fila a la tabla del carrito
        });

        ASIGNAR_EVENTOS(); // Vuelve a asignar eventos a los botones de eliminar y a los menús de talla
        GUARDAR_CARRITO(); // Guarda los cambios en localStorage
    }

    // ---------- Generar opciones de talla en el menú desplegable ---------- //
    function GENERAR_OPCIONES_TALLA(tallaSeleccionada) {
        let opciones = '';
        for (let i = 35; i <= 41; i++) {
            opciones += `<option value="${i}" ${tallaSeleccionada == i ? 'selected' : ''}>${i}</option>`;
        }
        return opciones;
    }

    // ---------- Asignar eventos a botones y menús desplegables ---------- //
    function ASIGNAR_EVENTOS() {
        document.querySelectorAll('.eliminar-producto').forEach(boton => {
            boton.addEventListener('click', ELIMINAR_PRODUCTO); // Asigna la función ELIMINAR_PRODUCTO
        });

        document.querySelectorAll('.seleccionar-talla').forEach(select => {
            select.addEventListener('change', (e) => {
                const nombreProducto = e.target.getAttribute('data-nombre');
                const nuevaTalla = e.target.value;
                carrito.forEach(producto => {
                    if (producto.nombre === nombreProducto) {
                        producto.talla = nuevaTalla;
                    }
                });
                GUARDAR_CARRITO(); // Guarda la talla seleccionada en localStorage
            });
        });
    }

    // ---------- Eliminar un producto del carrito ---------- //
    function ELIMINAR_PRODUCTO(event) {
        const nombreProducto = event.target.getAttribute('data-nombre'); // Obtiene el nombre del producto a eliminar

        carrito = carrito.filter(producto => producto.nombre !== nombreProducto); // Quita el producto del carrito

        GUARDAR_CARRITO(); // Guarda los cambios en localStorage
        ACTUALIZAR_CARRITO(); // Refresca la tabla del carrito en la página
    }

    // ---------- Limpiar la tabla del carrito en la página ---------- //
    function LIMPIAR_CARRITO() {
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild); // Borra todos los productos de la tabla
        }
    }

    // ---------- Guardar el carrito en localStorage ----------- //
    function GUARDAR_CARRITO() {
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito como texto en localStorage
    }
});
