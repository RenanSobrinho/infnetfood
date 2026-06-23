import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ScrollView, Image
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES, RESTAURANTS } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const s = styles(theme);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[s.categoryCard, { backgroundColor: item.color + '20', borderColor: item.color }]}
      onPress={() => navigation.navigate('Products', { category: item })}
      activeOpacity={0.8}
    >
      <Text style={s.categoryIcon}>{item.icon}</Text>
      <Text style={[s.categoryName, { color: item.color }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity
      style={s.restaurantCard}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={s.restaurantImage} />
      <View style={s.restaurantInfo}>
        <Text style={s.restaurantName}>{item.name}</Text>
        <Text style={s.restaurantCategory}>{item.category}</Text>
        <View style={s.restaurantMeta}>
          <Text style={s.restaurantRating}>⭐ {item.rating}</Text>
          <Text style={s.restaurantTime}>🕐 {item.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Olá, {user?.name?.split(' ')[0]}! 👋</Text>
          <Text style={s.headerSub}>O que você vai pedir hoje?</Text>
        </View>
        <Text style={s.deliveryIcon}>📍</Text>
      </View>

      {/* Banner */}
      <View style={s.banner}>
        <Text style={s.bannerTitle}>🔥 Frete Grátis</Text>
        <Text style={s.bannerSub}>No primeiro pedido acima de R$ 30</Text>
      </View>

      {/* Categorias */}
      <Text style={s.sectionTitle}>Categorias</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={i => i.id}
        renderItem={renderCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.categoriesList}
      />

      {/* Restaurantes */}
      <Text style={s.sectionTitle}>Restaurantes Próximos</Text>
      <FlatList
        data={RESTAURANTS.slice(0, 5)}
        keyExtractor={i => i.id}
        renderItem={renderRestaurant}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 16 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: theme.text },
  headerSub: { fontSize: 14, color: theme.subtext, marginTop: 2 },
  deliveryIcon: { fontSize: 28 },
  banner: { margin: 16, backgroundColor: theme.primary, borderRadius: 16, padding: 20 },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  bannerSub: { color: '#FFE8D6', fontSize: 14, marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: theme.text, marginLeft: 16, marginTop: 8, marginBottom: 12 },
  categoriesList: { paddingHorizontal: 16, gap: 12 },
  categoryCard: { alignItems: 'center', padding: 16, borderRadius: 14, borderWidth: 2, minWidth: 90 },
  categoryIcon: { fontSize: 32 },
  categoryName: { fontSize: 13, fontWeight: '700', marginTop: 6 },
  restaurantCard: { backgroundColor: theme.card, borderRadius: 14, marginBottom: 14, shadowColor: theme.shadow, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, overflow: 'hidden' },
  restaurantImage: { width: '100%', height: 140 },
  restaurantInfo: { padding: 12 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: theme.text },
  restaurantCategory: { fontSize: 13, color: theme.subtext, marginTop: 2 },
  restaurantMeta: { flexDirection: 'row', gap: 16, marginTop: 6 },
  restaurantRating: { fontSize: 13, color: theme.text },
  restaurantTime: { fontSize: 13, color: theme.subtext },
});
