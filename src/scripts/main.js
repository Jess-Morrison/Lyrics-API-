// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
// import { render } from 'sass';
import '../styles/main.scss';

const getLyrics = (artist, title) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const renderToDom = (divId, textToRender) => {
  const selectElement = document.querySelector(divId);
  selectElement.innerHTML = textToRender;
};

const button = () => {
  const domString = '<button class="btn btn-primary" id="button" type="button" value="submit">Get lyrics!</button>';
  renderToDom('#button', domString);
};
const eventListeners = () => {
  const grabLyrics = document.getElementById('button');
  grabLyrics.addEventListener('click', (e) => {
    e.preventDefault();
    getLyrics('Coldplay', 'Yellow').then((response) => {
      document.querySelector('#app').innerHTML = response.lyrics;
    });
  });
};

const startApp = () => {
  button();
  eventListeners();
  // getLyrics('Coldplay', 'Yellow').then((response) => {
  //   document.querySelector('#app').innerHTML = response.lyrics;
  // });
};

startApp();
