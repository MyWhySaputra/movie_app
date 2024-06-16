import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import MovieItem from '../components/movies/MovieItem'

const Favorite = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([])

  const fetchFavoriteMovies = async () => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        setFavoriteMovies(JSON.parse(initialData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies()
    }, []),
  )

  return (
    <ScrollView style={styles.container}>
      {favoriteMovies.length > 0 ? (
        <View style={styles.movieList}>
          {favoriteMovies.map((item) => (
            <MovieItem
              key={item.id}
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          ))}
        </View>
      ) : (
        <Text style={styles.noFavoritesText}>No favorite movies found.</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  movieList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  noFavoritesText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
})

export default Favorite
