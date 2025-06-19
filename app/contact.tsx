import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Contact() {
  const latitude = 40.41340022922257;
  const longitude = 49.83609059546924;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İletişim</Text>

      <Text style={styles.label}>Telefon</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('tel:+994551112233')}>
        +994 55 111 22 33
      </Text>

      <Text style={styles.label}>E-posta</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('mailto:info@premiumdental.az')}>
        info@premiumdental.az
      </Text>

      <Text style={styles.label}>Adres</Text>
      <Text style={styles.text}>
        Bakı, Azərbaycan (Konum: 40.4136, 49.8360)
      </Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="PREMİUM DENTAL" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
});
