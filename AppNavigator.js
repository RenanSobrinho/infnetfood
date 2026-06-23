import React from 'react';
import {
  View, Text, Switch, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const s = styles(theme);

  const sendTestNotification = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative as notificações nas configurações do dispositivo.');
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🍔 InfnetFood',
          body: 'Seu pedido está a caminho! Chegará em 20 minutos.',
          sound: true,
        },
        trigger: { seconds: 2 },
      });
      Alert.alert('✅ Sucesso', 'Notificação agendada para daqui a 2 segundos!');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível enviar a notificação.');
    }
  };

  const rows = [
    {
      icon: isDark ? '🌙' : '☀️',
      label: isDark ? 'Tema Escuro' : 'Tema Claro',
      right: <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: '#ccc', true: theme.primary }} thumbColor="#fff" />,
    },
  ];

  return (
    <View style={s.container}>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Aparência</Text>
        {rows.map((row, i) => (
          <View key={i} style={s.row}>
            <Text style={s.rowIcon}>{row.icon}</Text>
            <Text style={s.rowLabel}>{row.label}</Text>
            {row.right}
          </View>
        ))}
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Notificações</Text>
        <TouchableOpacity style={s.notifBtn} onPress={sendTestNotification}>
          <Text style={s.notifText}>🔔 Testar Notificação de Pedido</Text>
        </TouchableOpacity>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Conta</Text>
        <View style={s.infoRow}>
          <Text style={s.infoLabel}>Usuário</Text>
          <Text style={s.infoValue}>{user?.name}</Text>
        </View>
        <View style={s.infoRow}>
          <Text style={s.infoLabel}>E-mail</Text>
          <Text style={s.infoValue}>{user?.email}</Text>
        </View>
      </View>

      <Text style={s.version}>InfnetFood v1.0.0</Text>
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  section: { backgroundColor: theme.card, margin: 16, borderRadius: 14, padding: 16, shadowColor: theme.shadow, shadowOpacity: 0.07, elevation: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: theme.subtext, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  rowIcon: { fontSize: 22, marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 16, color: theme.text },
  notifBtn: { backgroundColor: theme.primary + '20', borderRadius: 10, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: theme.primary },
  notifText: { color: theme.primary, fontWeight: '700', fontSize: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.border },
  infoLabel: { fontSize: 15, color: theme.subtext },
  infoValue: { fontSize: 15, color: theme.text, fontWeight: '500' },
  version: { textAlign: 'center', color: theme.subtext, fontSize: 13, marginTop: 8 },
});
