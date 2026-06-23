import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import MapScreen from '../screens/MapScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CartBadge from '../components/CartBadge';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTitleStyle: { color: theme.text },
        headerTintColor: theme.primary,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'InfnetFood 🍔' }} />
      <Stack.Screen name="Products" component={ProductsScreen}
        options={({ route }) => ({ title: route.params?.category?.name || 'Produtos' })} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Detalhes' }} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ title: 'Restaurante' }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.card }, headerTitleStyle: { color: theme.text }, headerTintColor: theme.primary }}>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho 🛒' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Finalizar Pedido' }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.card }, headerTitleStyle: { color: theme.text }, headerTintColor: theme.primary }}>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Meus Pedidos' }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Restaurantes' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.tabBar, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtext,
      }}
    >
      <Tab.Screen
        name="MainTabs"
        component={HomeStack}
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ fontSize: 22, color }}>🛒</Text>
              <CartBadge />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
