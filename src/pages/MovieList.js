import React, {useState, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {Container, Header, Title, Spinner, List, ListItem} from 'native-base';
import { Font } from 'expo';

import axios from 'axios';

export default function MovieList({ navigation : { navigate }}) {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const moviesJson =
      'https://tender-mclean-00a2bd.netlify.app/mobile/movies.json';

    axios.get(moviesJson).then((res) => {
      if(!isCancelled){
        setMovieList(res.data);
        setLoading(false);
      }
    });
    return () => {
      isCancelled = true;
    }
  });

  return (
    <Container>
      <ScrollView>
        {isLoading ? (
          <Spinner />
        ) : (
          <List>
            {movieList.map((movie, index) => {
              return (
                <ListItem key={index} button={true} onPress={() => {navigate('Coments', {movie})}
                }>
                  <Text>{movie.title}</Text>
                </ListItem>
              );
            })}
          </List>
        )}
      </ScrollView>
    </Container>
  );
}
