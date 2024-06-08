import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native'
import MovieList from '../components/movies/MovieList'
import { API_ACCESS_TOKEN } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options,
        )
        const data = await response.json()
        setMovie(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to fetch movie details.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backdrop}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <View style={styles.info}>
              <Text style={styles.label}>Original Language</Text>
              <Text style={styles.value}>{movie.original_language}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Release Date</Text>
              <Text style={styles.value}>{new Date(movie.release_date).toDateString()}</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <View style={styles.info}>
              <Text style={styles.label}>Popularity</Text>
              <Text style={styles.value}>{movie.popularity}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Vote Count</Text>
              <Text style={styles.value}>{movie.vote_count}</Text>
            </View>
          </View>
        </View>
      </View>
      <MovieList
        title="Recommendations"
        path={`movie/${id}/recommendations`}
        coverType="poster"
        navigation={null}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  backgroundImageStyle: {
    width: '100%',
    height: 200,
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'yellow',
    marginLeft: 5,
    fontSize: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
  },
  info: {
    fontSize: 14,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  value: {
    marginBottom: 8,
  },
})

export default MovieDetail