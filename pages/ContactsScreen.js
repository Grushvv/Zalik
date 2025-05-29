// ContactsScreen.js — екран контактів
import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function ContactsScreen() {
  const phoneNumber = '+380931234567';
  const email = 'info@vwdasservice.ua';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Контакти</Text>

      <Text style={styles.label}>Телефон:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
        <Text style={styles.link}>{phoneNumber}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
        <Text style={styles.link}>{email}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Адреса сервісу:</Text>
      <Text style={styles.text}>м. Київ, вул. Автосервісна, 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
