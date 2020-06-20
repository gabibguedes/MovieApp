import React, { useState, useEffect }  from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Spinner, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { firebaseConfig } from '../utils/firebase';
import firebase from 'firebase';
import unidecode from 'unidecode';
import { useList } from 'react-firebase-hooks/database';

function nameToURL(name) {
  return unidecode(name).split(' ').join('_').toLowerCase();
}

function sendComment (url, comment, listOfCommets) {
  let comementList = [...listOfCommets, {
    username: 'anonymous',
    text: comment
  }]
  firebase.database().ref(url).set(comementList)
  return comementList
}

function getComments(url){
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

export default function Comments({ navigation }) {
  const [text, setText] =  useState('')
  const [comments, setComments] =  useState([])
  const [isLoading, setLoading] = useState(false);
  const [movie] = useState(navigation.state.params.movie)
  const [url] = useState(nameToURL(movie.title));

  return (
    isLoading?(
      <Spinner />
    ) : (
      <Container>
        <Button onPress={() => {
          let commentList = getComments(url)
          setComments(commentList)
        }}>
          <Text>Aqui</Text>
        </Button>
        <ScrollView>
            {comments.map((comment, index) => {
            return(
              <View key={comment.index} style={styles.comment}>
                <EvilIcons style={styles.userPicture} name="user" size={40} color="black" />
                <View key={index} style={styles.commentBox}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <View style={styles.comment}>
                    <Text style={styles.username}>@{comment.username}</Text>
                  </View>
                </View>

              </View>
            )
          })}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message..."
            style={styles.textInput}
            onChangeText={text => setText(text)}
            value={text}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => {
              let commentList = sendComment(url, text, comments);
              setComments(commentList);
              setText('');
            }}>
            <Ionicons name="md-send" size={24} color="black" />
          </TouchableOpacity>

        </View>
      </Container>
    )
  );
}



const styles = {
  textInput: {
    height: 40,
    flex: 0.9,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
  },
  inputContainer: {
    margin: 10,
    height: 40,
    bottom: 0,
    flexDirection: 'row'
  },
  sendButton: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userPicture: {
    alignSelf: 'center',
    flex: 0.1,
  },
  comment: {
    flexDirection: 'row'
  },
  commentBox: {
    flex: 0.9,
    margin: 10,
    borderRadius:5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  commentText: {
    fontSize: 16,
    color: 'black'
  },
  username: {
    fontSize: 10,
    color: 'gray'
  }
}