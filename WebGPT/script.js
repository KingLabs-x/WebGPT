const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatContainer = document.getElementById('chat-container');
const model = 'text-davinci-003';
const max_tokens = 750;
const apiKey = ''; // Your OpenAI API Key
const stop = '';
const url = `https://api.openai.com/v1/completions`;
let prompt = [
  `You are a web chat bot inside of the website: https://example.com`,
  ``,
`If users ask you for code, return any code in code format`,
].join('\n');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    prompt: [prompt],
    model,
    max_tokens,
    stop,
  }),
};

// Send user's message to the API when the send button is clicked
sendButton.addEventListener('click', sendMessage);

// Send user's message to the API when the enter key is pressed
inputField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

const clearButton = document.getElementById('clear-button');

// Clear the chat container when the clear button is clicked
clearButton.addEventListener('click', () => {
  chatContainer.innerHTML = '';
});

function sendMessage() {
  const userMessage = inputField.value;
  // Clear the input field
  inputField.value = '';

  // Display the user's message in the chat container
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user-message');
  userMessageElement.innerHTML = `<span><img src="images/user-avatar.jpg"> <b>You</b></span>`;
  
  const userMessageText = document.createElement('p');
  userMessageText.innerText = userMessage;
  userMessageElement.appendChild(userMessageText);
  chatContainer.appendChild(userMessageElement);

  // Send the user's message to the API
  options.body = JSON.stringify({
    prompt: prompt + userMessage,
    model,
    max_tokens,
    stop,
  });

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const aiMessage = data.choices[0].text;

      // Display the AI's response in the chat container
      const aiMessageElement = document.createElement('div');
      aiMessageElement.classList.add('message', 'ai-message');
      aiMessageElement.innerHTML = `<span id="ai-avatar-name"><img src="images/openai-avatar.png"> <b>WebGPT</b></span>`;
      
      const aiMessageText = document.createElement('p');
      aiMessageText.innerText = aiMessage;
      aiMessageElement.appendChild(aiMessageText);
      chatContainer.appendChild(aiMessageElement);
    })
    .catch((error) => console.log(error));
}
