# Tugas Akhir Movie App

- install package
```
npm install
```

- buat file .env
```
API_ACCESS_TOKEN=hehehahahehehahahehehaha
```

- jalankan
```
npm run web
```

# Perkenalan

- M. Wahyu Saputra

# Tujuan

- Untuk memenuhi project tugas akhir program FGA Mobile App Development with React Native
- Mempelajari dan mengimplementasikan teknologi React Native dalam pengembangan aplikasi mobile.
- Mengembangkan aplikasi yang dapat memberikan informasi up-to-date mengenai film-film terkini.
- Meningkatkan kemampuan dalam mengintegrasikan API eksternal ke dalam aplikasi mobile.
- Menciptakan aplikasi yang user-friendly dengan fitur pencarian dan penyimpanan favorit.

# Fitur

- **Home**: Menampilkan daftar film yang sedang diputar, yang akan tayang, terpopuler, dan dengan nilai tertinggi.
- **Search**: Memungkinkan pengguna untuk mencari film berdasarkan kata kunci atau kategori.
- **Favorite**: Menyimpan daftar film favorit pengguna.
- **Detail Film**: Menampilkan informasi detail tentang film yang dipilih, termasuk rekomendasi film terkait.

# Spesifikasi

## API yang di gunakan **(API TMDB)**

- Film yang sekarang diputar
```
https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1
```

- Film yang akan tayang
```
https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
```

- Film dengan nilai tertinggi
```
https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1
```

- Film Populer
```
https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
```

- Untuk melihat detail film
```
https://api.themoviedb.org/3/movie/${id}
```

- Untuk melihat rekomendasi film berdasarkan id
```
https://api.themoviedb.org/3/movie/${id}/recommendations
```

- Untuk melihat image film
```
https://image.tmdb.org/t/p/w500${movie.backdrop_path}

or

https://image.tmdb.org/t/p/w500${movie.poster_path}
```

- Untuk mencari film berdasarkan kata kunci
```
https://api.themoviedb.org/3/search/movie?query=${keyword}&page=1
```

- Untuk list kategori genre film yang ada
```
https://api.themoviedb.org/3/genre/movie/list?language=en
```

- Untuk mencari film berdasarkan genre id
```
https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}
```

## Module yang di gunakan

- **react**
  - Dasar untuk membuat komponen React.

- **react-native**
  - **ImageBackground**: Untuk menampilkan gambar sebagai latar belakang.
  - **Text**: Untuk menampilkan teks.
  - **StyleSheet**: Untuk membuat gaya CSS.
  - **View**: Container untuk menata tata letak komponen lain.
  - **TouchableOpacity**: Komponen yang mendukung sentuhan yang dapat memudar saat disentuh.
  - **FlatList**: Untuk menampilkan daftar data.
  - **TextInput**: Untuk input teks.
  - **ActivityIndicator**: Untuk menampilkan indikator aktivitas (loading spinner).
  - **ScrollView**: Untuk membuat tampilan yang bisa digulir.

- **@react-navigation/native**
  - **useNavigation**: Hook untuk mengakses navigasi.
  - **StackActions**: Untuk melakukan tindakan pada stack navigasi.
  - **useFocusEffect**: Hook untuk menambahkan efek fokus pada screen.

- **@expo/vector-icons**
  - **FontAwesome**: Ikon dari FontAwesome yang digunakan dalam aplikasi Expo.

- **expo-linear-gradient**
  - **LinearGradient**: Untuk membuat efek transisi warna yang halus di latar belakang komponen.

- **@env**: Membaca file .env

- **@react-navigation/bottom-tabs**
  - **createBottomTabNavigator**: Untuk membuat navigasi tab bawah.

- **@react-navigation/native-stack**
  - **createNativeStackNavigator**: Untuk membuat navigasi stack native.

- **@react-native-async-storage/async-storage**
  - **AsyncStorage**: Untuk menyimpan dan mengambil data secara asinkron di penyimpanan lokal.

# Tahapan pengerjaan

- Memahami kebutuhan project dan desain aplikasi.
- Menginstal semua dependensi yang diperlukan.
- Mengintegrasikan API TMDB untuk mendapatkan data film.
- Membuat komponen untuk menampilkan daftar film dan detail film.
- Mengimplementasikan navigasi antara layar menggunakan react-navigation.
- Menambahkan fitur pencarian dan favorit.
- Menguji aplikasi pada berbagai perangkat dan platform.
- Memperbaiki bug dan meningkatkan performa aplikasi.

# Kendala yang dihadapi

- **Kompatibilitas Perangkat**: Menghadapi beberapa masalah kompatibilitas saat menguji aplikasi di berbagai perangkat dan platform, yang membutuhkan penyesuaian tambahan.

- **Pemahaman Teknologi Baru**: Meskipun tidak ada kendala yang besar, mempelajari dan mengimplementasikan beberapa teknologi baru seperti AsyncStorage yang membutuhkan waktu dan usaha ekstra.

# Kesimpulan

- Aplikasi ini dibuat untuk project akhir dan telah sesuai dengan spesifikasi dan tujuan yang ditetapkan. Penggunaan React Native dan integrasi dengan API TMDB memungkinkan untuk menampilkan informasi film yang up-to-date dan relevan bagi pengguna. Proses pengembangan ini memberikan pemahaman mendalam tentang pengembangan aplikasi mobile menggunakan React Native.