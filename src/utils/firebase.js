import { useState, useEffect } from 'react';
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

export function sendComment(comment, movieName) {
  init();
  const url = nameToURL(movieName)
  const newComment = {
    username: 'anonymous',
    text: comment
  }
  firebase.database().ref(url).push(newComment)
}

export function useFirebaseComments(title){
  const [comments, setComments] = useState([])
  const [isLoading, setLoading] = useState(true);
  const url = nameToURL(title);
  init();

  useEffect(() => {
    const ref = firebase.database().ref(url);
    const listener = ref.on('value', snapshot => {
      const fetchedTasks = [];
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        fetchedTasks.push({ id: key, ...data });
      });
      setComments(fetchedTasks);
      setLoading(false);
    });
    return () => ref.off('value', listener);
  }, []);

  return {
    list: comments,
    loading: isLoading
  }
}
