(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message'),
      nickName = null,
      colourB = document.querySelector(".colour"),
      colours = ["black", "navy", "blue", "aqua", "teal", "olive", "green", "lime", "yellow", "orange", "red", "maroon", "fuchsia", "purple"],
      i = 0;

  function setNickname() {
    //debugger;
    nickName = this.value;
  }

  function handleSendMessage(e) {
    e.preventDefault();
    nickName = (nickName && nickName.length > 0) ? nickName : 'user';  
    msg = `${nickName} says ${chatMessage.value}`;
    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

  function appendMessage(msg) {
    let newMsg = `<li>${msg.message}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg) {
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function changeColour() {
    colourB.style.color = colours[i];
    messageList.style.color = colours[i];
    i++;
    if(i == 14) {
      i=0;
    }
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
  colourB.addEventListener('click', changeColour, false);
})();
