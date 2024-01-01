
function listen(io){
    io.on('connect', (socket)=>{

        socket.on("join", (avatarName, avatarImage, code)=>{
            socket.join(code);
            socket.to(code).emit("newuserjoin",avatarName)
        })

        socket.on("message", (message, avatarName, avatarImage,code)=>{
            socket.to(code).emit("message",message, avatarName, avatarImage);
        })


    })

}

module.exports = {
    listen
}