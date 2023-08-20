import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = document.querySelector('#vimeo-player');
const vimeo = new Player(player);

const expressionKey = 'videoplayer-current-time';

function saveTimeValueToLocalStorage(time) {
  localStorage.setItem(expressionKey, JSON.stringify(time));
}

function getTimeValueFromLocalStorage() {
  let localTime = localStorage.getItem(expressionKey);
  if (localTime !== null) {
    return JSON.parse(localTime);
  }
  return 0;
}

vimeo.setCurrentTime(getTimeValueFromLocalStorage).then(() =>
    vimeo.on('timeupdate', throttle((
    seconds
  ) => saveTimeValueToLocalStorage(seconds), 1000))

)