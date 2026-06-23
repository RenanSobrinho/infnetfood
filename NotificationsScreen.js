import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const PAYMENT_OPTIONS = [
  'Cartão de Crédito',
  'Cartão de Débito',
  'Pix',
  'Dinheiro',
];

export default function CheckoutScreen({ navigation }) {
  const { theme } = useTheme();
  const { cartItems, getTotal, placeOrder } = useCart();
  const s = styles(theme);

  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');

  const handleConfirm = () => {
    if (!address.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o endereço de entrega.');
      return;
    }
    if (!payment.trim()) {
      Alert.alert('Campo obrigatório', 'Selecione o método de pagamento.');
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert(
        'Carrinho vazio',
        'Adicione itens ao carrinho antes de finalizar.'
      );
      return;
    }

    const order = placeOrder({ address, payment });

    Alert.alert(
      '✅ Pedido Confirmado!',
      `Pedido ${
        order.id
      } realizado com sucesso!\nTotal: R$ ${order.total.toFixed(2)}`,
      [
        {
          text: 'Ver Meus Pedidos',
          onPress: () => {
            navigation.popToTop?.();
            navigation
              .getParent()
              ?.navigate('ProfileTab', { screen: 'Orders' });
          },
        },
        {
          text: 'Voltar ao Início',
          onPress: () => {
            navigation.popToTop?.();
            navigation.getParent()?.navigate('MainTabs');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>Revisar Pedido</Text>

      <View style={s.section}>
        <Text style={s.sectionTitle}>🛒 Itens do Pedido</Text>
        {cartItems.length === 0 ? (
          <Text style={s.emptyText}>Nenhum item no carrinho.</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={s.itemRow}>
              <Text style={s.itemName}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={s.itemPrice}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))
        )}
        <View style={s.divider} />
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalValue}>R$ {getTotal().toFixed(2)}</Text>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>📍 Endereço de Entrega</Text>
        <TextInput
          style={s.input}
          placeholder="Ex: Rua das Flores, 123 - Rio de Janeiro"
          placeholderTextColor={theme.subtext}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>💳 Método de Pagamento</Text>
        <View style={s.paymentOptions}>
          {PAYMENT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[s.paymentBtn, payment === option && s.paymentBtnActive]}
              onPress={() => setPayment(option)}>
              <Text
                style={[
                  s.paymentBtnText,
                  payment === option && s.paymentBtnTextActive,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[s.btn, cartItems.length === 0 && s.btnDisabled]}
        onPress={handleConfirm}
        disabled={cartItems.length === 0}>
        <Text style={s.btnText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    content: { padding: 20, gap: 16, paddingBottom: 40 },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },

    section: {
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 16,
      gap: 10,
      shadowColor: theme.shadow,
      shadowOpacity: 0.07,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    itemName: { fontSize: 14, color: theme.text, flex: 1 },
    itemPrice: { fontSize: 14, color: theme.primary, fontWeight: '600' },

    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 8,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalLabel: { fontSize: 16, fontWeight: 'bold', color: theme.text },
    totalValue: { fontSize: 16, fontWeight: 'bold', color: theme.primary },

    emptyText: { fontSize: 14, color: theme.subtext, textAlign: 'center' },

    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      padding: 12,
      color: theme.text,
      backgroundColor: theme.background,
      fontSize: 14,
    },

    paymentOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    paymentBtn: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.background,
    },
    paymentBtnActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    paymentBtnText: {
      fontSize: 13,
      color: theme.text,
    },
    paymentBtnTextActive: {
      color: '#fff',
      fontWeight: '600',
    },

    btn: {
      backgroundColor: theme.primary,
      borderRadius: 14,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    btnDisabled: {
      backgroundColor: theme.border,
    },
    btnText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
