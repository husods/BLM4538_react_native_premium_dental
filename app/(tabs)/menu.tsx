import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const screenHeight = Dimensions.get("window").height;

type MenuButtonProps = {
  emoji: string;
  label: string;
  dark?: boolean;
};

export default function Menu() {
  const user = auth.currentUser;
  const displayName = user?.displayName || user?.email || "Kullanıcı";
  const router = useRouter(); // Menu() fonksiyonu içinde, üstte

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Oturumdan çıkmak istediğinizden emin misiniz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Çıkış Yap",
        style: "destructive",
        onPress: () => {
          signOut(auth)
            .then(() => router.replace("/login"))
            .catch((error) => {
              console.error("Çıkış hatası:", error);
              alert("Çıkış yapılamadı.");
            });
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      {/* Kullanıcı bilgisi (üstte sabit ve sola hizalı) */}
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=Kullanici&background=E6F0FF&color=003366",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{displayName}</Text>
      </View>

      {/* Butonlar sayfa ortasına yakın sabit pozisyonlu */}
      <View style={styles.buttonArea}>
        <MenuButton
          emoji="👨‍⚕️"
          label="Doktorlar"
          onPress={() => router.push("/doctors")}
        />
        {/*<MenuButton
          emoji="⚙️"
          label="Ayarlar"
          onPress={() => router.push("/settings")}
        />*/}
        <MenuButton
          emoji="👤"
          label="Profil"
          onPress={() => router.push("/profile")}
        />
        <MenuButton
          emoji="ℹ️"
          label="Hakkımızda"
          onPress={() => router.push("/about")}
        />
        <MenuButton
          emoji="📞"
          label="İletişim"
          onPress={() => router.push("/contact")}
        />
        <MenuButton emoji="🚪" label="Çıkış Yap" dark onPress={handleLogout} />
      </View>
    </View>
  );
}

const MenuButton = ({
  emoji,
  label,
  dark = false,
  onPress,
}: {
  emoji: string;
  label: string;
  dark?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={[styles.button, dark && styles.logoutButton]}
    onPress={onPress}
  >
    <View style={styles.row}>
      <Text style={[styles.emoji, dark && { color: "white" }]}>{emoji}</Text>
      <Text style={[styles.buttonText, dark && { color: "white" }]}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center", // ortala
    paddingHorizontal: 20,
    paddingTop: 30,
    position: "absolute",
    top: 0, // üst boşluğu sıfırla veya hafif azalt
    left: 0,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 1, // yukarı kaydır
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    marginTop: 0,
  },
  buttonArea: {
    position: "absolute",
    top: screenHeight * 0.23, // ekran yüksekliğinin %23'undan başlat
    width: "100%",
    alignItems: "center",
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 18,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#e6f0ff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
    width: 240,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },
  logoutButton: {
    backgroundColor: "#003366",
  },
});
