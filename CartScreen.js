import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/mockData';

export default function ProductsScreen({ route, navigation }) {
  const { category } = route.params;
  const { theme } = useTheme();
  const products = PRODUCTS[category.id] || [];
  const s = styles(theme);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={s.image} />
      <View style={s.info}>
        <Text style={s.name}>{item.name}</Text>
        <Text style={s.description} numberOfLines={2}>{item.description}</Text>
        <Text style={s.price}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      <FlatList
        data={products}
        keyExtractor={i => i.id}
        renderItem={renderProduct}
        contentContainerStyle={s.list}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyText}>Nenhum produto nessa categoria.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  list: { padding: 16, gap: 14 },
  card: { backgroundColor: theme.card, borderRadius: 14, flexDirection: 'row', shadowColor: theme.shadow, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, overflow: 'hidden' },
  image: { width: 110, height: 110 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold', color: theme.text },
  description: { fontSize: 13, color: theme.subtext, marginTop: 4 },
  price: { fontSize: 18, fontWeight: 'bold', color: theme.primary, marginTop: 6 },
  empty: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: theme.subtext },
});
