import React from 'react';
import {ScrollView, Text} from 'react-native';
import {Container, Spinner, List, ListItem} from 'native-base';
import { useMoviesJSON } from '../utils/movieRequests';

export default function MovieList({ navigation : { navigate }}) {
  const movies = useMoviesJSON();

  return (
    <Container>
      <ScrollView>
        {movies.loading ? (
          <Spinner />
        ) : (
          <List>
            {movies.list.map((movie, index) => {
              return (
                <ListItem key={index} button={true} onPress={() => { navigate('Comments', { movie })}
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
