const display = document.querySelector("#message-container")
const messageInput = document.querySelector("#message-input")
const sendBtn = document.querySelector("#send-btn");
const avatarName = sessionStorage.getItem("avatarName") || "Random"
const avatarImage = sessionStorage.getItem("avatarImage") || 1
const code = window.location.href.split("/").pop();
const socket = io();
const roomLinkShare = document.querySelector(".room-link-share")






function generateMyMessage(message, avatarImage){
      const res = `<div class="d-flex   flex-row justify-content-end mb-4">
      <div class="p-3   me-3 border word"  style="border-radius: 15px; background-color: #fbfbfb;">
        <p class="small mb-0">${message}</p>
      </div>
        <img src="/images/ava${avatarImage}-bg.png"
        alt="avatar 1" style="width: 45px; height: 100%;">
    </div>`
    return res
      
}




function generateOthersMessage(message,avatarName, avatarImage){
    const res = `      
    <div class="d-flex flex-row justify-content-start mb-4">
      <img src="/images/ava${avatarImage}-bg.png"
      alt="avatar 1" style="width: 45px; height: 100%;">
      <div class="p-3 pt-2 ms-3 word"  style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
        <span><b>${avatarName}</b></span>
        <p class="small mb-0" >${message}</p>
      </div>
    </div>
    `
  return res
}

sendBtn.addEventListener("click", ()=>{
  const userMessage = messageInput.value;
  if(userMessage.length < 1 || userMessage == undefined) return;
  socket.emit("message", userMessage, avatarName, avatarImage, code)
  display.innerHTML += generateMyMessage(userMessage, avatarImage)
  messageInput.value = ""
  display.scrollTop = display.scrollHeight;

})


socket.on("message", (message,avatarName, avatarImage)=>{
  display.innerHTML += generateOthersMessage(message,avatarName, avatarImage) ;
  display.scrollTop = display.scrollHeight;
})




socket.on('connect',()=>{
  socket.emit("join", avatarName, avatarImage, code)
})

socket.on("disconnect", ()=>{
  socket.emit("leave", avatarName)
})






const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


roomLinkShare.addEventListener("click", ()=>{
  const copyurl = window.location.href.split('/')
  copyurl.splice(3,1)
  navigator.clipboard.writeText(copyurl.join("/"))

})