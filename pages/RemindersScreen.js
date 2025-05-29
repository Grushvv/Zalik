// RemindersScreen.js — екран нагадувань
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RemindersScreen() {
  const [clients, setClients] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [message, setMessage] = useState('Шановний(а), нагадуємо про сервіс вашого авто.');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('clientsData');
        const parsed = json ? JSON.parse(json) : [];
        setClients(parsed);
      } catch (e) {
        console.error('Помилка читання клієнтів:', e);
      }
    })();
  }, []);

  const handleSend = () => {
    if (!selectedPhone) return Alert.alert('Помилка', 'Оберіть клієнта');

    console.log('Відправка повідомлення до:', selectedPhone);
    console.log('Текст:', message);

    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Нагадування клієнту</Text>

      <Text style={styles.label}>Оберіть клієнта:</Text>
      <Picker
        selectedValue={selectedPhone}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedPhone(itemValue)}
      >
        <Picker.Item label="-- Оберіть --" value="" />
        {clients.map((client, index) => (
          <Picker.Item
            key={index}
            label={`${client.name} (${client.phone})`}
            value={client.phone}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Повідомлення:</Text>
      <TextInput
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
        style={styles.textarea}
      />

      <Button title={sent ? '✅ Надіслано' : 'Надіслати'} onPress={handleSend} />
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
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    marginVertical: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    textAlignVertical: 'top',
    borderRadius: 4,
  },
});
