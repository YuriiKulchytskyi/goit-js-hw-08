import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = document.querySelector('#vimeo-player');
const vimeo = new Player(player);

const expressionKey = 'videoplayer-current-time';

const saveTimeValueToLocalStorage = 
  throttle((time) => localStorage.setItem(expressionKey, JSON.stringify(time)), 1000);


vimeo.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  saveTimeValueToLocalStorage(currentTime);
});

const savedTime = localStorage.getItem(expressionKey);

vimeo.setCurrentTime(savedTime || 0);
