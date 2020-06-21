import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMoviesJSON() {
  const [movies, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const url = 'https://tender-mclean-00a2bd.netlify.app/mobile/movies.json';
    
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getMovies = async () => {
      try {
        axios.get(url).then((res) => {
          setMovieList(res.data);
          setLoading(false);
        });
      } catch (error) {
        if (!axios.isCancel(error)){
          console.log(error)
        }
      }
    }
    getMovies();
    return () => {
      source.cancel()
    }
  });
  return {
    list: movies,
    loading: isLoading
  }
}

