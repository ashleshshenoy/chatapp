
function listen(io){
    io.on('connect', (socket)=>{

        socket.on("join", (avatarName, avatarImage, code)=>{
            socket.join(code);
            console.log(avatarName + " joined the chat at " + code )
        })

        socket.on("message", (message, avatarName, avatarImage,code)=>{
            socket.to(code).emit("message",message, avatarName, avatarImage);
        })


    })

}

module.exports = {
    listen
}