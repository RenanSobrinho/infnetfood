import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet,
  ScrollView, FlatList, ActivityIndicator, TouchableOpacity
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function RestaurantDetailScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const s = styles(theme);

  // Tarefa 15 - Integração com API externa
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/sachabigou/free-food-menus-api/master/Burgers.json')
      .then(r => r.json())
      .then(data => {
        const items = data.slice(0, 6).map((item, idx) => ({
          id: `api-${idx}`,
          name: item.strMeal || item.name || `Item ${idx + 1}`,
          price: (Math.random() * 40 + 15).toFixed(2),
          image: item.strMealThumb || item.image,
          description: 'Item importado do cardápio.',
        }));
        setMenuItems(items);
      })
      .catch(() => {
        // Fallback para dados mock
        setMenuItems(restaurant.menu.map((m, idx) => ({ id: `m-${idx}`, ...m, description: 'Item do cardápio do restaurante.' })));
      })
      .finally(() => setLoading(false));
  }, []);

  const renderMenuItem = ({ item }) => (
    <View style={s.menuCard}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={s.menuImage} />
      ) : (
        <View style={[s.menuImage, s.menuImagePlaceholder]}>
          <Text style={{ fontSize: 32 }}>🍽️</Text>
        </View>
      )}
      <View style={s.menuInfo}>
        <Text style={s.menuName}>{item.name}</Text>
        <Text style={s.menuDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={s.menuPrice}>R$ {parseFloat(item.price).toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={s.addBtn}
        onPress={() => addToCart({ id: item.id, name: item.name, price: parseFloat(item.price), image: item.image })}
      >
        <Text style={s.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: restaurant.image }} style={s.cover} />
      <View style={s.header}>
        <Text style={s.name}>{restaurant.name}</Text>
        <Text style={s.category}>{restaurant.category}</Text>
        <Text style={s.address}>📍 {restaurant.address}</Text>
        <View style={s.metaRow}>
          <View style={s.metaChip}>
            <Text style={s.metaText}>⭐ {restaurant.rating}</Text>
          </View>
          <View style={s.metaChip}>
            <Text style={s.metaText}>🕐 {restaurant.deliveryTime}</Text>
          </View>
          <View style={s.metaChip}>
            <Text style={s.metaText}>🛒 Mín. R$ {restaurant.minOrder}</Text>
          </View>
        </View>
      </View>

      <Text style={s.sectionTitle}>Cardápio</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={i => i.id}
          renderItem={renderMenuItem}
          scrollEnabled={false}
          contentContainerStyle={s.menuList}
        />
      )}
    </ScrollView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  cover: { width: '100%', height: 220 },
  header: { padding: 20, backgroundColor: theme.card },
  name: { fontSize: 24, fontWeight: 'bold', color: theme.text },
  category: { fontSize: 14, color: theme.primary, fontWeight: '600', marginTop: 2 },
  address: { fontSize: 14, color: theme.subtext, marginTop: 6 },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  metaChip: { backgroundColor: theme.inputBg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  metaText: { fontSize: 13, color: theme.text },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: theme.text, margin: 16 },
  menuList: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  menuCard: { backgroundColor: theme.card, borderRadius: 12, flexDirection: 'row', alignItems: 'center', padding: 10, shadowColor: theme.shadow, shadowOpacity: 0.07, elevation: 2 },
  menuImage: { width: 80, height: 80, borderRadius: 10 },
  menuImagePlaceholder: { backgroundColor: theme.inputBg, justifyContent: 'center', alignItems: 'center' },
  menuInfo: { flex: 1, paddingHorizontal: 10 },
  menuName: { fontSize: 15, fontWeight: 'bold', color: theme.text },
  menuDesc: { fontSize: 12, color: theme.subtext, marginTop: 2 },
  menuPrice: { fontSize: 16, fontWeight: 'bold', color: theme.primary, marginTop: 4 },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
});
