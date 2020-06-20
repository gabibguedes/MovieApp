import React, { useState, useEffect }  from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Row} from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 

const coments = [
  {
    username: 'first comment',
    text: ' first text'
  },
  {
    username: 'username',
    text: 'text'
  },
  {
    username: 'username',
    text: 'text'
  },
  {
    username: 'username',
    text: 'text'
  },
  {
    username: 'username',
    text: 'text'
  },
  {
    username: 'username',
    text: 'text'
  },
  {
    username: 'username',
    text: 'text'
  },
  {
    username: 'last comment',
    text: 'last comment'
  },
]

export default function Coments() {
  const [coment, setComent] =  useState('')
  return (
    <Container>
      <ScrollView>
        {coments.map((coment, index) => {
          return(
            <View key={index} style={styles.coment}>
              <EvilIcons style={styles.userPicture} name="user" size={40} color="black" />
              <View key={index} style={styles.comentBox}>
                <Text style={styles.comentText}>{coment.text}</Text>
                <View style={styles.coment}>
                <Text style={styles.username}>@{coment.username}</Text>
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
          onChangeText={text => setComent(text)}
          value={coment}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="md-send" size={24} color="black" />
        </TouchableOpacity>

      </View>
    </Container>
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
    justifySelf: 'center',
    flex: 0.1,
  },
  coment: {
    flexDirection: 'row'
  },
  comentBox: {
    flex: 0.9,
    margin: 10,
    borderRadius:5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  comentText: {
    fontSize: 16,
    color: 'black'
  },
  username: {
    fontSize: 10,
    color: 'gray'
  }
}