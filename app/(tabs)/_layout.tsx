import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#007AFF',
        tabBarActiveTintColor: '#007AFF',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false, // <<< bu satırı ekle ve title'ı kaldır
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false, // ← bu satır başlığı kaldırır
          tabBarLabel: 'Menü',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
