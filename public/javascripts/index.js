const avatarContainer = document.querySelector('.avatar-container');
const joinBtn = document.querySelector('#join-btn');
const createRoomBtn = document.querySelector('#create-room-btn');
const nickNameInput = document.querySelector('#nickname-input')
const nicknameFeedback = document.querySelector('.nickname-feedback');
const chatRoomInput = document.querySelector('#chatroom-input');
const  chatRoomFeedback = document.querySelector('.chatroom-feedback');
const avatarFeedback = document.querySelector('.avatar-feedback');
let selectedAvatar = undefined;
const URL = window.location.origin

const code = window.location.href.split('/').pop();
chatRoomInput.value = code;



const avatars = avatarContainer.children;
for(let i = 0; i <avatars.length  ; i++){
    avatars.item(i).addEventListener('click',(e)=>{
        for(let j = 0; j < avatars.length; j++){
            avatars.item(j).className = ""
        }
        selectedAvatar = i;
        avatars.item(i).className = "selected-avatar";
    })

}


joinBtn.addEventListener('click', ()=>{
    if(nickNameInput.value == "" || nickNameInput.value == undefined){
        nicknameFeedback.innerHTML = "Nickname field is empty";
    }
    if(nickNameInput.value.length > 10){
        nicknameFeedback.innerHTML = "Too long. atmax 8 characters"
    }
    if(nickNameInput.value.length < 3){
        nicknameFeedback.innerHTML = "Too short. atleast 3 characters"
    }
    
    if(chatRoomInput.value == "" || chatRoomInput.value == undefined){
        chatRoomFeedback.innerHTML = "Chat room code not provided"
    }
    if(selectedAvatar == undefined){
        avatarFeedback.innerHTML = "Avatar not selected."
    }
    
    setTimeout(()=>{
        nicknameFeedback.innerHTML = "";
        chatRoomFeedback.innerHTML = "";
        avatarFeedback.innerHTML = ""
    }, 3000)

    if(nickNameInput.value == "" || nickNameInput.value == undefined ||nickNameInput.value.length > 10 || nickNameInput.value.length < 3
        || chatRoomInput.value == "" || chatRoomInput.value == undefined 
        || selectedAvatar == undefined)
        return ;

    sessionStorage.setItem('avatarImage', selectedAvatar);
    sessionStorage.setItem("avatarName", nickNameInput.value )
    window.location.href = URL + "/chat/" + chatRoomInput.value;
   
})



createRoomBtn.addEventListener('click',()=>{
    if(nickNameInput.value == "" || nickNameInput.value == undefined){
        nicknameFeedback.innerHTML = "Nickname field is empty";
    }
    if(nickNameInput.value.length > 10){
        nicknameFeedback.innerHTML = "Too long. atmax 8 characters"
    }
    if(nickNameInput.value.length < 3){
        nicknameFeedback.innerHTML = "Too short. atleast 3 characters"
    }
    
    if(selectedAvatar == undefined){
        avatarFeedback.innerHTML = "Avatar not selected."
    }
    
    setTimeout(()=>{
        nicknameFeedback.innerHTML = "";
        avatarFeedback.innerHTML = ""
    }, 3000)

    if(nickNameInput.value == "" || nickNameInput.value == undefined ||nickNameInput.value.length > 10 
    || nickNameInput.value.length < 3
        || selectedAvatar == undefined)
        return ;

    sessionStorage.setItem('avatarImage', selectedAvatar);
    sessionStorage.setItem("avatarName", nickNameInput.value )
    fetch(URL + "/createroom")
    .then(res =>  res.json())
    .then((res)=>{
        window.location.href = URL + "/chat/" + res.code
    }).catch((err) => {
        console.log(err)
    })
})