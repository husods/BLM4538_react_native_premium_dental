import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{
        padding: 24,
        gap: 16,
        minHeight: "100%",
      }}
    >
      <Text style={styles.title}>PREMİUM DENTAL</Text>
      <Text style={styles.sectionTitle}>Misyonumuz</Text>
      <Text style={styles.text}>
        Premium Dental olarak amacımız; hastalarımıza en güncel, güvenilir ve
        konforlu diş sağlığı hizmetini sunmaktır. Alanında uzman kadromuzla
        estetik ve fonksiyonel çözümler üretiriz.
      </Text>
      <Text style={styles.sectionTitle}>Vizyonumuz</Text>
      <Text style={styles.text}>
        Gelişen teknolojiye ayak uyduran, uluslararası standartlarda hizmet
        veren ve hasta memnuniyetini ön planda tutan bir sağlık kuruluşu
        olmaktır.
      </Text>
      <Text style={styles.sectionTitle}>Neden Biz?</Text>
      <Text style={styles.text}>
        - Deneyimli uzman kadro{"\n"}- Güler yüzlü hizmet anlayışı{"\n"}- Modern
        ekipman ve steril ortam{"\n"}- Hasta memnuniyeti odaklı yaklaşım
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#003366",
  },
  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
});
