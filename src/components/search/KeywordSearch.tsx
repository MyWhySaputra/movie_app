import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('')
  const [movies, setMovies] = useState<any[]>([])
  const [searched, setSearched] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = () => {
    setSearched(true)
    setLoading(true)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setMovies(response.results)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        Alert.alert('Error', 'Failed to fetch movies')
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter keyword"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.buttonBack} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#8978A4" />
      ) : movies.length > 0 ? (
        <View style={styles.movieList}>
          {movies.map((item) => (
            <MovieItem
              key={item.id}
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          ))}
        </View>
      ) : (
        searched && (
          <Text style={styles.noResultsText}>
            No movies found. Try searching for something else.
          </Text>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonBack: {
    backgroundColor: '#8978A4',
    borderRadius: 100,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  movieList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
})

export default KeywordSearch
