import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, ScrollView, Animated
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, cartAnimation } = useCart();
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const s = styles(theme);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 100, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const handleAdd = () => {
    addToCart(product, quantity);
    animateButton();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: product.image }} style={s.image} />
      <View style={s.content}>
        <Text style={s.name}>{product.name}</Text>
        <Text style={s.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={s.description}>{product.description}</Text>

        {/* Quantity Selector */}
        <View style={s.qtyRow}>
          <Text style={s.qtyLabel}>Quantidade:</Text>
          <View style={s.qtyControls}>
            <TouchableOpacity
              style={s.qtyBtn}
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <Text style={s.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={s.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={s.qtyBtn}
              onPress={() => setQuantity(q => q + 1)}
            >
              <Text style={s.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={s.subtotal}>
          Subtotal: R$ {(product.price * quantity).toFixed(2)}
        </Text>

        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity
            style={[s.addButton, added && s.addButtonSuccess]}
            onPress={handleAdd}
            activeOpacity={0.85}
          >
            <Text style={s.addButtonText}>
              {added ? '✅ Adicionado ao Carrinho!' : '🛒 Adicionar ao Carrinho'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={s.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={s.cartButtonText}>Ver Carrinho →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  image: { width: '100%', height: 260 },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: theme.text },
  price: { fontSize: 26, fontWeight: 'bold', color: theme.primary, marginTop: 8 },
  description: { fontSize: 15, color: theme.subtext, marginTop: 12, lineHeight: 22 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 },
  qtyLabel: { fontSize: 16, fontWeight: '600', color: theme.text },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  qtyValue: { fontSize: 20, fontWeight: 'bold', color: theme.text, minWidth: 30, textAlign: 'center' },
  subtotal: { fontSize: 18, fontWeight: '700', color: theme.text, marginTop: 16, textAlign: 'right' },
  addButton: { backgroundColor: theme.primary, borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 20 },
  addButtonSuccess: { backgroundColor: '#2ED573' },
  addButtonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  cartButton: { marginTop: 12, padding: 14, alignItems: 'center', borderWidth: 2, borderColor: theme.primary, borderRadius: 14 },
  cartButtonText: { color: theme.primary, fontSize: 16, fontWeight: '600' },
});
