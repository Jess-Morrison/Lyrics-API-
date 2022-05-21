// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
// import { render } from 'sass';
import '../styles/main.scss';

const renderToDom = (divId, textToRender) => {
  const selectElement = document.querySelector(divId);
  selectElement.innerHTML = textToRender;
};

const getLyrics = (artist, title) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const lyricsOnDom = (artist, title) => {
  getLyrics(artist, title).then((response) => {
    renderToDom('#app', response.lyrics);
  });
};
const form = () => {
  const domString = `<div id="form" class="input-group">
  <span class="input-group-text">Artist and Title</span>
  <input id="artist" type="text" aria-label="Artist name" class="form-control">
  <input id="title" type="text" aria-label="Title" class="form-control">
  <button class="btn btn-primary" id="button" type="submit" style="background-color: brown; border-color: black" >Get lyrics!</button>
</div>`;
  renderToDom('#app', domString);
};

// const button = () => {
//   const domString = '<button class="btn btn-primary" id="button" type="button" value="submit">Get lyrics!</button>';
//   renderToDom('#button', domString);
// };
const eventListeners = () => {
  document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    const userArtistInput = document.querySelector('#artist').value;
    const userTitleInput = document.querySelector('#title').value;
    lyricsOnDom(userArtistInput, userTitleInput);
  });
};

const startApp = () => {
  form();
  // button();
  eventListeners();
  // getLyrics('Coldplay', 'Yellow').then((response) => {
  //   document.querySelector('#app').innerHTML = response.lyrics;
  // });
};

startApp();
