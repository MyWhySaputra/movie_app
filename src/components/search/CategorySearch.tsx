import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'
import type { Movie } from '../../types/app'

const CategorySearch = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [movies, setMoviesResult] = useState<Movie[]>([])

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
          <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
            <Text style={styles.buttonText}>Back to Categories</Text>
          </TouchableOpacity>
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
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  buttonText: {
    color: 'white',
  },
  buttonBack: {
    marginTop: 20,
    backgroundColor: '#8978A4',
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    margin: '1%',
    alignItems: 'center',
  },
  movieList: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
})

export default CategorySearch
