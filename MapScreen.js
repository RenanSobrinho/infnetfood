import React from 'react';
import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const s = styles(theme);

  const menuItems = [
    { icon: '📦', label: 'Meus Pedidos', screen: 'Orders' },
    { icon: '🗺️', label: 'Restaurantes no Mapa', screen: 'Map' },
    { icon: '⚙️', label: 'Configurações', screen: 'Settings' },
  ];

  return (
    <ScrollView style={s.container}>
      {/* Avatar */}
      <View style={s.header}>
        <Image
          source={{ uri: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=FF6B35&color=fff&size=128' }}
          style={s.avatar}
        />
        <Text style={s.name}>{user?.name || 'Usuário'}</Text>
        <Text style={s.email}>{user?.email}</Text>
        {user?.phone && <Text style={s.phone}>📱 {user.phone}</Text>}
      </View>

      {/* Menu */}
      <View style={s.menu}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.screen}
            style={s.menuItem}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <Text style={s.menuIcon}>{item.icon}</Text>
            <Text style={s.menuLabel}>{item.label}</Text>
            <Text style={s.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={s.logoutBtn} onPress={logout} activeOpacity={0.85}>
        <Text style={s.logoutText}>🚪 Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, backgroundColor: theme.card },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: theme.primary },
  name: { fontSize: 24, fontWeight: 'bold', color: theme.text, marginTop: 14 },
  email: { fontSize: 15, color: theme.subtext, marginTop: 4 },
  phone: { fontSize: 14, color: theme.subtext, marginTop: 4 },
  menu: { marginTop: 16, marginHorizontal: 16, backgroundColor: theme.card, borderRadius: 14, overflow: 'hidden', shadowColor: theme.shadow, shadowOpacity: 0.06, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: theme.border },
  menuIcon: { fontSize: 24, marginRight: 14 },
  menuLabel: { flex: 1, fontSize: 16, color: theme.text, fontWeight: '500' },
  menuArrow: { fontSize: 22, color: theme.subtext },
  logoutBtn: { margin: 24, backgroundColor: '#FF4757', borderRadius: 14, padding: 16, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
