import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Ahmet Yılmaz",
      specialty: "Diş Estetiği",
      bio: "Diş estetiği konusunda uzmanlaşmış, gülüş tasarımı alanında deneyimli.",
      photo: "https://avatars.githubusercontent.com/u/0?v=4", // Profil fotoğrafı
    },
    {
      name: "Dr. Elif Aydın",
      specialty: "Ortodonti",
      bio: "Ortodonti tedavilerinde uzun yıllardır uzmanlaşmış, diş teli tedavisi konusunda deneyimli.",
      photo: "https://avatars.githubusercontent.com/u/0?v=4", // Profil fotoğrafı
    },
    {
      name: "Dr. Serkan Demir",
      specialty: "Ağız ve Diş Cerrahisi",
      bio: "Ağız ve diş cerrahisi konusunda birçok başarılı operasyon gerçekleştirmiştir.",
      photo: "https://avatars.githubusercontent.com/u/0?v=4", // Profil fotoğrafı
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Doktorlarımız</Text>

      {doctors.map((doctor, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: doctor.photo }} style={styles.avatar} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <Text style={styles.bio}>{doctor.bio}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },
  specialty: {
    fontSize: 16,
    color: "#007AFF",
    marginVertical: 5,
  },
  bio: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
  },
});
