import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../context/ThemeContext';
import { RESTAURANTS } from '../data/mockData';

// URL do OpenStreetMap embed — sem API key, funciona direto no browser
const OSM_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html' +
  '?bbox=-43.1900%2C-22.9200%2C-43.1600%2C-22.8950' +
  '&layer=mapnik' +
  '&marker=-22.9068%2C-43.1729';

export default function MapScreen({ navigation }) {
  const { theme } = useTheme();
  const s = styles(theme);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const openGoogleMaps = () => {
    Linking.openURL(
      'https://www.google.com/maps/search/restaurantes/@-22.9068,-43.1729,15z'
    );
  };

  const renderRestaurant = ({ item, index }) => (
    <TouchableOpacity
      style={s.restaurantCard}
      onPress={() =>
        navigation.navigate('RestaurantDetail', { restaurant: item })
      }
      activeOpacity={0.8}
    >
      <View style={[s.pin, { backgroundColor: theme.primary }]}>
        <Text style={s.pinText}>{index + 1}</Text>
      </View>
      <Image source={{ uri: item.image }} style={s.restaurantImg} />
      <View style={s.restaurantInfo}>
        <Text style={s.restaurantName}>{item.name}</Text>
        <Text style={s.restaurantAddress} numberOfLines={1}>
          {item.address}
        </Text>
        <View style={s.metaRow}>
          <Text style={s.rating}>⭐ {item.rating}</Text>
          <Text style={s.time}>🕐 {item.deliveryTime}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={s.pinBtn}
        onPress={() =>
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`
          )
        }
      >
        <Text style={s.pinBtnText}>📍</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      {/* Mapa via WebView com URI direta do OpenStreetMap */}
      <View style={s.mapWrapper}>
        {/* Loading enquanto mapa carrega */}
        {!mapLoaded && !mapError && (
          <View style={s.mapLoading}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={s.mapLoadingText}>Carregando mapa...</Text>
          </View>
        )}

        {/* Fallback se der erro */}
        {mapError && (
          <View style={s.mapError}>
            <Text style={s.mapErrorIcon}>🗺️</Text>
            <Text style={s.mapErrorText}>Centro do Rio de Janeiro</Text>
            <Text style={s.mapErrorSub}>10 restaurantes disponíveis</Text>
          </View>
        )}

        {/* WebView com OSM embed */}
        {!mapError && (
          <WebView
            source={{ uri: OSM_EMBED_URL }}
            style={[s.map, !mapLoaded && { opacity: 0 }]}
            javaScriptEnabled
            domStorageEnabled
            onLoad={() => setMapLoaded(true)}
            onError={() => {
              setMapError(true);
              setMapLoaded(true);
            }}
            onHttpError={() => {
              setMapError(true);
              setMapLoaded(true);
            }}
            // Permite acesso à rede no Android
            mixedContentMode="always"
            allowsInlineMediaPlayback
          />
        )}

        {/* Botão Google Maps sobreposto */}
        <TouchableOpacity style={s.gmapsBtn} onPress={openGoogleMaps}>
          <Text style={s.gmapsBtnText}>🗺️ Google Maps</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={RESTAURANTS}
        keyExtractor={(i) => i.id}
        renderItem={renderRestaurant}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },

    mapWrapper: {
      height: 240,
      margin: 16,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
      backgroundColor: '#e8f4e8',
    },
    map: {
      flex: 1,
    },
    mapLoading: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#e8f4e8',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      zIndex: 2,
    },
    mapLoadingText: {
      fontSize: 14,
      color: theme.subtext,
    },
    mapError: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e8f4e8',
      gap: 6,
    },
    mapErrorIcon: { fontSize: 48 },
    mapErrorText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    },
    mapErrorSub: {
      fontSize: 13,
      color: theme.subtext,
    },

    gmapsBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: theme.primary,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 6,
      zIndex: 10,
    },
    gmapsBtnText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 13,
    },

    list: { paddingHorizontal: 16, paddingBottom: 24, gap: 10 },
    restaurantCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      shadowColor: theme.shadow,
      shadowOpacity: 0.07,
      elevation: 2,
    },
    pin: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    pinText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    restaurantImg: { width: 60, height: 60, borderRadius: 10 },
    restaurantInfo: { flex: 1, paddingLeft: 10 },
    restaurantName: { fontSize: 15, fontWeight: 'bold', color: theme.text },
    restaurantAddress: { fontSize: 12, color: theme.subtext, marginTop: 2 },
    metaRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
    rating: { fontSize: 12, color: theme.text },
    time: { fontSize: 12, color: theme.subtext },
    pinBtn: { padding: 8 },
    pinBtnText: { fontSize: 22 },
  });
