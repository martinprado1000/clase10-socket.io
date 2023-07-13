// Socket.io:   IMPORTANTE:: Recordar que la configuracion de nuestro server app y el server io deben ir antes de las rutas

const express = require("express");
const app = express();  
const viewRoutes = require ("./routes/viewRoutes.js")
const handlebars = require("express-handlebars");
const { Server } = require("socket.io") //  npm i socket.io  1-Requerimos socket.io, requerimos Server destructurado.

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// *** Todo esto ponerla ANTES DE LAS RUTAS **************************************************************
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor express corriendo en el puerto ${PORT}`)); // 2-Al server de express lo guardamos en una variable
const io = new Server(httpServer);  // 3-Creamos el servidor io y lo metemos dentro de http, sobre el mismo puerto corren los 2 servidores a la vez.
// const io = new Server(httpServer,{ cors:{origin:"*"} }); // En el caso que el front lo hagamos con otro servidor asi le diriamos que permita todos los origenes.
//********************************************************************************************************
// Hasta este punto si esta todo bien accediendo a http://localhost:8080/socket.io/socket.io.js podemos ver la aplicacion io accediendo desde el lado del cliente.
// Solo restaria desde el front configurar el server que se va a usar, eso seria poniendo en los html los script que vamos a usar:
// <script src="/socket.io/socket.io.js"></script>   <!-- LLamamos a io para ejecutarlo aca en el frontend --> Este es el script que levanta el server io del lado del servidor
// <script src="/js/websockets.js"></script>   <!-- Aca le puedo pasar nuestro js publico --> Este seria el script donde esta configurado el servidor que vamos a usar

io.on("connection",(socket)=>{  // io.on("connection")  Escucha si hay una nueva conexion. Osea esta es el socket de connexion. (sockets): es lo que nos retorna la conexion. A partir de aca ya esta abierto el canal de comunicacion.
  console.log("Nuevo cliente conectado")
  socket.on("mensajeDesdeFront",(data)=>{  // socket.on: recibimos la data que viene desde el front, y le especificamos el nombre con el que viene ese mensaje (mensajeDesdeFront), esto tiene que conicidir con el nombre del front.
    console.log(data) // Aca imprimo la data que me mando el front con el nombre mensajeDesdeFront
  })
  socket.emit("mensajeDesdeBack", "Esto es la dato que estoy enviando desde el back hacia el front") // socket.emit: envia la data que queremos pasarle el front.
})

// Importante: los emit SOLO pueden enviar strings.
//socket.emit("nombreDelMensaje", "Envio este mensaje solo al que debe recibir el socket")
//socket.broadcast.emit("nombreDelMensaje", "Envio este mensaje a todos los sockets que estan conectados, menos al socket que envio el mensaje")
//socketServet.emit("nombreDelMensaje", "Este mensaje lo reciben todos los sockets conectados")


app.use("/",viewRoutes);

//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ "Error" : "La ruta deseada no existe" });
});


