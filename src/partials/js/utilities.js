export const API_ENDPOINT = "http://c4tk.somamou.org/songs.json";
export const QUERY_KEY = "?q=";
export const DEBOUNCE_WAIT = 300;
const SEARCH_RESULTS_LIST = ".SearchResults-list";
const SEARCH_RESULTS_INFO = ".SearchResults-info";
var docFrag = null;

export var debounce = function (func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export function fetchSongs(query, callback) {
  let endPoint = `${API_ENDPOINT}${QUERY_KEY}${query}`;

  axios.get(endPoint)
    .then(function (response) {
      if(response.data.length) callback(response.data, query);
    })
    // .catch(function (error) {
    //   console.log(error);
    // })
  ;
}

export function drawSongs(songs, query) {
  docFrag = document.createDocumentFragment();

  drawResultsInfo(query);

  if (songs.constructor === Array) {
    songs.forEach(pushToSongsList);
  } else {
    pushToSongsList(songs);
  }
  document.querySelector(`${SEARCH_RESULTS_LIST}`).appendChild(docFrag);
  docFrag = null;
}

export function pushToSongsList({ id, title, artist }) {
  let tempDiv = document.createElement('div');
  
  tempDiv.innerHTML = `<li data-song-id="${id}">
  ${title}, ${artist} </li>`;
  docFrag.appendChild(tempDiv.firstChild);
}

function drawResultsInfo(query) {
  let resultsInfo = document.querySelector(`${SEARCH_RESULTS_INFO}`);

  resultsInfo.innerHTML = `\"${query}\" RESULTS`;
}