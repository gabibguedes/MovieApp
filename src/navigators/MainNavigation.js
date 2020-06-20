import MovieList from '../pages/MovieList';
import Coments from '../pages/Coments';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: {
    screen: MovieList,
    navigationOptions: {
      title: 'Movie List',
    }
  },
  Coments: {
    screen: Coments,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.movie.title}`,
    })
  }
});

export default createAppContainer(AppNavigator);
