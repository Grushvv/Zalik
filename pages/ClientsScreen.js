// ClientsScreen.js — екран клієнтів
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'clientsData';

export default function ClientsScreen() {
  const initialData = [
    { name: 'Іван Петров', phone: '+380931112233', brand: 'BMW', service: 'Заміна масла', price: '500 грн', status: 'Очікування' },
    { name: 'Олена Ковальчук', phone: '+380987654321', brand: 'Toyota', service: 'Діагностика двигуна', price: '800 грн', status: 'В роботі' },
    { name: 'Сергій Іваненко', phone: '+380631234567', brand: 'Audi', service: 'ТО', price: '1500 грн', status: 'Готово' },
  ];

  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', brand: '', service: '', price: '', status: 'Очікування' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        setClients(json ? JSON.parse(json) : initialData);
      } catch (e) {
        console.error('Load error', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleAdd = () => {
    if (!form.name) return;
    setClients([...clients, form]);
    setForm({ name: '', phone: '', brand: '', service: '', price: '', status: 'Очікування' });
  };

  const handleEdit = (index) => {
    setForm(clients[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updated = [...clients];
    updated[editIndex] = form;
    setClients(updated);
    setForm({ name: '', phone: '', brand: '', service: '', price: '', status: 'Очікування' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    Alert.alert('Підтвердження', 'Ви впевнені, що хочете видалити?', [
      { text: 'Скасувати' },
      { text: 'Видалити', onPress: () => setClients(clients.filter((_, i) => i !== index)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Клієнти</Text>

      {['name', 'phone', 'brand', 'service', 'price'].map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key}
          value={form[key]}
          onChangeText={(text) => handleChange(key, text)}
        />
      ))}

      <Button title={editIndex !== null ? 'Оновити' : 'Додати'} onPress={editIndex !== null ? handleUpdate : handleAdd} />

      <FlatList
        data={clients}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.phone}</Text>
            <Text>{item.brand} | {item.service} | {item.price} | {item.status}</Text>
            <View style={styles.row}>
              <Button title="Ред." onPress={() => handleEdit(index)} />
              <Button title="Видал." color="red" onPress={() => handleDelete(index)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 4 },
  item: { padding: 10, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
});
