const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> Brad <span>5</span></p>
  <p class="text">${message}</p>`;

  document.querySelector('.chat-messages').appendChild(div);
};

export default outputMessage;
