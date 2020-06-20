import MovieList from '../pages/MovieList';
import Comments from '../pages/Comments';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: {
    screen: MovieList,
    navigationOptions: {
      title: 'Movie List',
    }
  },
  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.movie.title}`,
    })
  }
});

export default createAppContainer(AppNavigator);
