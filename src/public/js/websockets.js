const socket = io()  // Con esto le indicamos que servidor io vamos a usar, 
//aca se establece la comun icacion entre los servidores del front y el back, llamado handcheck
console.log(socket) // Esto me muestra en el front cuando se establecion la comunicacion socket

socket.emit("mensajeDesdeFront", "Esto es la dato que estoy enviando desde el front") // io.emit: es para emitr el mensaje que a ir al back
// El primer parametro es el nombre del mensaje que tiene que coicidir con el del back, y luego la data que le voy a enviar

socket.on("mensajeDesdeBack",(data)=>{  // socket.on: recibimos la data que viene desde el back, y le especificamos el nombre con el que viene ese mensaje (mensajeDesdeBack), esto tiene que conicidir con el nombre del back.
    console.log(data) // Aca imprimo la data que me mando el back con el nombre mensajeDesdeBack
  })