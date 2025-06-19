import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (user?.displayName) {
      const [first, ...rest] = user.displayName.split(" ");
      setFirstName(first);
      setLastName(rest.join(" "));
    }
  }, []);

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Uyarı", "İsim ve soyisim zorunludur.");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    updateProfile(user!, {
      displayName: fullName,
    })
      .then(() => {
        Alert.alert("Başarılı", "Profil güncellendi.");
      })
      .catch((error) => {
        console.error("Profil güncelleme hatası:", error);
        Alert.alert("Hata", "Güncelleme sırasında bir hata oluştu.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Bilgileri</Text>

      <Text style={styles.label}>İsim</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Adınızı girin"
      />

      <Text style={styles.label}>Soyisim</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Soyadınızı girin"
      />

      <View style={styles.genderContainer}>
        <Text style={styles.label}>Cinsiyet (Opsiyonel)</Text>
        <View style={styles.genderButtons}>
          {["Erkek", "Kadın", "Belirtmek istemiyorum"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderOption,
                gender === option && styles.genderOptionActive,
              ]}
              onPress={() => {
                setGender(gender === option ? "" : option); // aynı seçeneğe ikinci kez tıklarsa iptal et
              }}
            >
              <Text
                style={[
                  styles.genderOptionText,
                  gender === option && styles.genderOptionTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.label}>Yaş (Opsiyonel)</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Yaşınızı girin"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  genderContainer: {
    marginTop: 10,
  },
  genderButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  genderOptionActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  genderOptionText: {
    fontSize: 14,
    color: "#003366",
  },
  genderOptionTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
