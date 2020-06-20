import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
import unidecode from 'unidecode';

function nameToURL(name) {
  return unidecode(name).split(' ').join('_').toLowerCase();
}

function init(){
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}

export function getComments(movieName) {
  init();
  const url = nameToURL(movieName)
  let comments = []

  firebase.database().ref(url).on("value", function (snapshot) {
    if (snapshot.val() !== null) {
      comments = snapshot.val()
    } else {
      comments = []
    }
  }, function (err) {
    console.log(err);
  });
  return comments;
}

export function sendComment(comment, movieName) {
  const url = nameToURL(movieName)

  let comementList = [...getComments(movieName), {
    username: 'anonymous',
    text: comment
  }]

  firebase.database().ref(url).set(comementList)

  return comementList
}
