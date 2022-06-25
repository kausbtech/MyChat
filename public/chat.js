const socket=io();
let name;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message__area')
do {
    name=prompt('please enter your username: ');
} while (!name);

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    {
           sendMessage(e.target.value);
    }
});

sendMessage=(message)=>{
    let msg={
        user: name,
        message: message.trim()
    }
    appendMessage(msg,'outgoing');
    scrolldown();
    textarea.value='';
    socket.emit('message',msg);
}

function appendMessage(msg,type) {
    let mainDiv=document.createElement('div');
    let className=type;
    mainDiv.classList.add(className,'message');

    let markup= `
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
    `
     
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);

}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrolldown();
})

function scrolldown() {
    messageArea.scrollTop=messageArea.scrollHeight;
}