import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const STATUS_COLOR = {
  'Em preparo': '#F59E0B',
  'A caminho': '#3B82F6',
  'Entregue': '#10B981',
};

const STATUS_ICON = {
  'Em preparo': '👨‍🍳',
  'A caminho': '🛵',
  'Entregue': '✅',
};

export default function OrdersScreen() {
  const { theme } = useTheme();
  const { orders } = useCart();
  const s = styles(theme);

  const renderOrder = ({ item }) => (
    <View style={s.card}>
      {/* Header */}
      <View style={s.cardHeader}>
        <Text style={s.orderId}>{item.id}</Text>
        <View
          style={[
            s.badge,
            { backgroundColor: STATUS_COLOR[item.status] || '#888' },
          ]}
        >
          <Text style={s.badgeText}>
            {STATUS_ICON[item.status]} {item.status}
          </Text>
        </View>
      </View>

      {/* Info */}
      <Text style={s.infoText}>📅 {item.date} às {item.time}</Text>
      <Text style={s.infoText} numberOfLines={1}>📍 {item.address}</Text>
      <Text style={s.infoText}>💳 {item.payment}</Text>

      <View style={s.divider} />

      {/* Itens */}
      {item.items.map((i, idx) => (
        <View key={idx} style={s.itemRow}>
          <Text style={s.itemText}>
            {i.quantity}x {i.name}
          </Text>
          <Text style={s.itemPrice}>
            R$ {(i.price * i.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={s.divider} />

      {/* Total */}
      <View style={s.totalRow}>
        <Text style={s.totalLabel}>Total do Pedido</Text>
        <Text style={s.totalValue}>R$ {item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      {orders.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>🛍️</Text>
          <Text style={s.emptyTitle}>Nenhum pedido ainda</Text>
          <Text style={s.emptySub}>
            Seus pedidos aparecerão aqui após a confirmação.
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    list: { padding: 16, gap: 14, paddingBottom: 30 },

    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 16,
      shadowColor: theme.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },

    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    orderId: {
      fontSize: 17,
      fontWeight: 'bold',
      color: theme.text,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 20,
    },
    badgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },

    infoText: {
      fontSize: 13,
      color: theme.subtext,
      marginBottom: 3,
    },

    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 10,
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    itemText: { fontSize: 13, color: theme.text },
    itemPrice: { fontSize: 13, color: theme.primary, fontWeight: '600' },

    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: { fontSize: 15, fontWeight: 'bold', color: theme.text },
    totalValue: { fontSize: 15, fontWeight: 'bold', color: theme.primary },

    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 40,
    },
    emptyIcon: { fontSize: 72 },
    emptyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    emptySub: {
      fontSize: 14,
      color: theme.subtext,
      textAlign: 'center',
    },
  });
