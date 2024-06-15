// screens/KeywordSearch.tsx
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Alert, ScrollView } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('')
  const [movies, setMovies] = useState<any[]>([])

  const handleSearch = () => {
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
      })
      .catch((err) => {
        console.error(err)
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
      <Button title="Search" onPress={handleSearch} />
      {movies.length > 0 ? (
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
        <Text style={styles.noResultsText}>
          No movies found. Try searching for something else.
        </Text>
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
  },
  movieList: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
