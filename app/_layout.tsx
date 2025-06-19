import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Ana sayfa (Home) ve menü sekmesi (Menu) için başlık ayarlarını yapıyoruz */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false, // Menüde başlık olmayacak
        }}
      />

      {/* Login ekranı için başlık kaldırılıyor */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: false, // Başlık gösterilmesin
        }}
      />

      {/* Register ekranı için başlık kaldırılıyor */}
      <Stack.Screen
        name="register"
        options={{
          headerShown: false, // Başlık gösterilmesin
        }}
      />

      {/* Ayarlar sayfası için başlık ayarı */}
      <Stack.Screen
        name="doctors"
        options={{
          headerTitle: "Doktorlar", // Türkçe başlık
        }}
      />

      {/* Ayarlar sayfası için başlık ayarı */}
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Ayarlar", // Türkçe başlık
        }}
      />

      {/* Profil sayfası için başlık ayarı */}
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Profil", // Türkçe başlık
        }}
      />

      {/* Ayarlar sayfası için başlık ayarı */}
      <Stack.Screen
        name="about"
        options={{
          headerTitle: "Hakkımızda", // Türkçe başlık
        }}
      />

      <Stack.Screen
        name="announcements"
        options={{
          headerTitle: "Duyurular", // Türkçe başlık
        }}
      />

      {/* Ayarlar sayfası için başlık ayarı */}
      <Stack.Screen
        name="contact"
        options={{
          headerTitle: "İletişim", // Türkçe başlık
        }}
      />
    </Stack>
  );
}
