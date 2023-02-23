const socket = io()

socket.emit('mensaje', "Cliente conectado")

socket.on('evento-admin', datos => {
    console.log(datos)
})

socket.on('evento-general', datos => {
    console.log(datos)
})