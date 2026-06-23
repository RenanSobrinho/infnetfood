import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ScrollView, Animated
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake] = useState(new Animated.Value(0));

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = () => {
    setError('');
    if (!email.trim()) { setError('Informe seu e-mail.'); shakeAnimation(); return; }
    if (!password.trim()) { setError('Informe sua senha.'); shakeAnimation(); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('E-mail inválido.'); shakeAnimation(); return; }

    const result = login(email.trim(), password);
    if (!result.success) { setError(result.message); shakeAnimation(); }
  };

  const s = styles(theme);

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.logoArea}>
          <Text style={s.logo}>🍔</Text>
          <Text style={s.appName}>InfnetFood</Text>
          <Text style={s.subtitle}>Seu delivery favorito</Text>
        </View>

        <Animated.View style={[s.form, { transform: [{ translateX: shake }] }]}>
          {!!error && (
            <View style={s.errorBox}>
              <Text style={s.errorText}>⚠️ {error}</Text>
            </View>
          )}

          <Text style={s.label}>E-mail</Text>
          <TextInput
            style={s.input}
            placeholder="seu@email.com"
            placeholderTextColor={theme.subtext}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={s.label}>Senha</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••"
            placeholderTextColor={theme.subtext}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={s.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={s.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={s.hintBox}>
            <Text style={s.hintTitle}>💡 Credenciais de teste:</Text>
            <Text style={s.hintText}>admin@admin.com / admin123</Text>
            <Text style={s.hintText}>joao@email.com / 123456</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 72 },
  appName: { fontSize: 36, fontWeight: 'bold', color: theme.primary, marginTop: 8 },
  subtitle: { fontSize: 16, color: theme.subtext, marginTop: 4 },
  form: { backgroundColor: theme.card, borderRadius: 16, padding: 24, shadowColor: theme.shadow, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  errorBox: { backgroundColor: '#FFE5E5', borderRadius: 8, padding: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#FF4757' },
  errorText: { color: '#C0392B', fontSize: 14 },
  label: { fontSize: 14, fontWeight: '600', color: theme.text, marginBottom: 6 },
  input: { backgroundColor: theme.inputBg, borderRadius: 10, padding: 14, fontSize: 16, color: theme.text, marginBottom: 16, borderWidth: 1, borderColor: theme.border },
  button: { backgroundColor: theme.primary, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  hintBox: { marginTop: 20, padding: 12, backgroundColor: theme.inputBg, borderRadius: 8 },
  hintTitle: { fontSize: 13, fontWeight: 'bold', color: theme.subtext, marginBottom: 4 },
  hintText: { fontSize: 12, color: theme.subtext },
});
