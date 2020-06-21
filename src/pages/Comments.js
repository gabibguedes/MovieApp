import React, { useState }  from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Spinner } from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { useFirebaseComments, sendComment } from '../utils/firebase';

export default function Comments({ navigation }) {
  const [text, setText] =  useState('')
  const [movie] = useState(navigation.state.params.movie)
  const comments =  useFirebaseComments(movie.title)

  function send() {
    if (text !== '') {
      sendComment(text, movie.title);
      setText('');
    }
  }

  return (
    comments.loading?(
      <Spinner />
    ) : (
      <Container>
        <ScrollView>
          {comments.list.map((comment, index) => {
            return(
              <View key={index} style={styles.comment}>
                <EvilIcons style={styles.userPicture} name="user" size={40} color="black" />
                <View style={styles.commentBox}>
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
          <TouchableOpacity style={styles.sendButton} onPress={() => send()}>
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