import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

export default function AnnouncementsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.centeredContainer}>
      <Text style={styles.emptyText}>
        Şu anda görüntülenecek duyuru bulunmamaktadır.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
    textAlign: "center",
  },
});
