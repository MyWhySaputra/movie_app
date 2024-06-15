import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'

const CategorySearch = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [movies, setMoviesResult] = useState<any[]>([])

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres)
      })
      .catch((err) => console.error(err))
  }

  const handleCategoryPress = (genreId: number) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      options,
    )
      .then((response) => response.json())
      .then((data) => {
        setMoviesResult(data.results)
        setSelectedGenre(genreId)
      })
      .catch((err) => {
        console.error(err)
        Alert.alert('Error', 'Failed to fetch movies')
      })
  }

  const handleBack = () => {
    setSelectedGenre(null)
  }

  return (
    <View style={styles.container}>
      {selectedGenre ? (
        <>
          <Button title="Back to Categories" onPress={handleBack} />
          <View style={styles.movieList}>
            {movies.map((movie) => (
              <MovieItem
                key={movie.id}
                movie={movie}
                size={{ width: 100, height: 160 }}
                coverType="poster"
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>Category</Text>
          <View style={styles.buttonContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={styles.button}
                onPress={() => handleCategoryPress(genre.id)}
              >
                <Text>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  movieList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
})

export default CategorySearch
