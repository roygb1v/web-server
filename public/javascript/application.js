// const toFetch = async (address) => {
//   const url = 'http://localhost:3333/weather?address=' + address;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       return {error: 'There was a problem with your search. Try again.'}
//     }

//     return response.json();

//   } catch(error) {
//     return {error: 'There was a problem with your search. Try again.'}
//   }
// }

// toFetch('boston');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let messageOne = document.getElementById('forecast');
const messageTwo = document.getElementById('place');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  messageOne.textContent = '';
  messageTwo.textContent = '';
  
  const searchTerm = search.value;

  fetch('http://localhost:3333/weather?address=' + searchTerm).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  })
})