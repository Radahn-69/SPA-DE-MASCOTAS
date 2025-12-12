// Arreglos simples para guardar datos
var dueños = [];
var mascotas = [];
var citas = [];
var carrito = [];

// Catálogo básico
var productos = [
    { nombre: "Baño básico", precio: 10 },
    { nombre: "Baño completo", precio: 18 },
    { nombre: "Corte de uñas", precio: 5 },
    { nombre: "Juguete peluche", precio: 8 }
];


// ---------------- LOGIN ----------------
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var u = document.getElementById("usuario").value;
    var p = document.getElementById("contrasena").value;

    if (u === "admin" && p === "123") {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");
        mostrarModulo("principal");
        cargarCatalogo();
        actualizarResumen();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

function cerrarSesion() {
    location.reload();
}


// --------- MOSTRAR MÓDULOS -------------
function mostrarModulo(id) {
    var modulos = document.getElementsByClassName("modulo");
    for (var i = 0; i < modulos.length; i++) {
        modulos[i].classList.add("hidden");
    }
    document.getElementById(id).classList.remove("hidden");
}


// --------- REGISTRO DUEÑOS -------------
document.getElementById("formDueño").addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = document.getElementById("dueñoNombre").value;
    var tel = document.getElementById("dueñoTel").value;
    var correo = document.getElementById("dueñoCorreo").value;

    dueños.push(nombre);

    alert("Dueño registrado");

    document.getElementById("formDueño").reset();
    actualizarResumen();
});


// --------- REGISTRO MASCOTAS ----------
document.getElementById("formMascota").addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = document.getElementById("mascotaNombre").value;
    var especie = document.getElementById("mascotaEspecie").value;
    var raza = document.getElementById("mascotaRaza").value;

    mascotas.push(nombre);

    alert("Mascota registrada");

    document.getElementById("formMascota").reset();
    actualizarResumen();
});


// --------- AGENDA ----------------------
document.getElementById("formAgenda").addEventListener("submit", function (e) {
    e.preventDefault();

    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var mascota = document.getElementById("mascotaAgendada").value;
    var servicio = document.getElementById("servicioAgendado").value;

    var texto = fecha + " | " + hora + " | " + mascota + " | " + servicio;

    citas.push(texto);

    mostrarCitas();
    actualizarResumen();

    document.getElementById("formAgenda").reset();
});

function mostrarCitas() {
    var lista = document.getElementById("listaCitas");
    lista.innerHTML = "";

    for (var i = 0; i < citas.length; i++) {
        var li = document.createElement("li");
        li.textContent = citas[i];
        lista.appendChild(li);
    }
}


// --------- CATÁLOGO Y CARRITO ---------
function cargarCatalogo() {
    var cont = document.getElementById("catalogo");
    cont.innerHTML = "";

    for (var i = 0; i < productos.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = productos[i].nombre + " - $" + productos[i].precio +
            " <button onclick='agregarCarrito(" + i + ")'>Comprar</button>";
        cont.appendChild(div);
    }
}

function agregarCarrito(i) {
    carrito.push(productos[i]);
    mostrarCarrito();
}

function mostrarCarrito() {
    var lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    var subtotal = 0;

    for (var i = 0; i < carrito.length; i++) {
        var li = document.createElement("li");
        li.textContent = carrito[i].nombre + " - $" + carrito[i].precio;
        lista.appendChild(li);

        subtotal += carrito[i].precio;
    }

    document.getElementById("subtotal").textContent = subtotal;
    document.getElementById("total").textContent = subtotal;
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}


// --------- RESUMEN DEL PANEL ----------
function actualizarResumen() {
    document.getElementById("totalDueño").textContent = dueños.length;
    document.getElementById("totalMascota").textContent = mascotas.length;
    document.getElementById("totalCita").textContent = citas.length;
}
