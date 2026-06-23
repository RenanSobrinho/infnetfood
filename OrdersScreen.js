import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, Animated
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, total, clearCart, cartAnimation } = useCart();
  const { theme } = useTheme();
  const s = styles(theme);

  const renderItem = ({ item }) => (
    <View style={s.card}>
      <Image source={{ uri: item.image }} style={s.image} />
      <View style={s.info}>
        <Text style={s.name} numberOfLines={1}>{item.name}</Text>
        <Text style={s.price}>R$ {item.price.toFixed(2)}</Text>
        <View style={s.qtyRow}>
          <TouchableOpacity style={s.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
            <Text style={s.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={s.qty}>{item.quantity}</Text>
          <TouchableOpacity style={s.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={s.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.right}>
        <Text style={s.itemTotal}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={s.removeBtn}>
          <Text style={s.removeText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={s.empty}>
        <Text style={s.emptyIcon}>🛒</Text>
        <Text style={s.emptyText}>Seu carrinho está vazio</Text>
        <TouchableOpacity style={s.shopBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={s.shopBtnText}>Explorar Categorias</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <FlatList
        data={cartItems}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={s.list}
      />
      <View style={s.footer}>
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={s.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
          activeOpacity={0.85}
        >
          <Text style={s.checkoutText}>Finalizar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.clearBtn} onPress={clearCart}>
          <Text style={s.clearText}>Limpar Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: theme.card, borderRadius: 14, flexDirection: 'row', padding: 10, alignItems: 'center', shadowColor: theme.shadow, shadowOpacity: 0.08, elevation: 3 },
  image: { width: 80, height: 80, borderRadius: 10 },
  info: { flex: 1, paddingHorizontal: 10 },
  name: { fontSize: 15, fontWeight: 'bold', color: theme.text },
  price: { fontSize: 14, color: theme.subtext, marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qty: { fontSize: 16, fontWeight: 'bold', color: theme.text },
  right: { alignItems: 'flex-end', gap: 8 },
  itemTotal: { fontSize: 16, fontWeight: 'bold', color: theme.primary },
  removeBtn: { padding: 4 },
  removeText: { fontSize: 20 },
  footer: { backgroundColor: theme.card, padding: 20, borderTopWidth: 1, borderTopColor: theme.border },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  totalLabel: { fontSize: 20, fontWeight: 'bold', color: theme.text },
  totalValue: { fontSize: 22, fontWeight: 'bold', color: theme.primary },
  checkoutBtn: { backgroundColor: theme.primary, borderRadius: 14, padding: 16, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  clearBtn: { marginTop: 10, padding: 12, alignItems: 'center' },
  clearText: { color: '#FF4757', fontSize: 15 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background, gap: 16 },
  emptyIcon: { fontSize: 72 },
  emptyText: { fontSize: 20, color: theme.subtext, fontWeight: '600' },
  shopBtn: { backgroundColor: theme.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  shopBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
