// PartsScreen.js — екран запчастин
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'partsData';

export default function PartsScreen() {
  const initialData = [
    { name: 'Масляний фільтр', code: 'OIL123', manufacturer: 'Bosch', price: '250 грн' },
    { name: 'Гальмівні колодки', code: 'BRK456', manufacturer: 'Ferodo', price: '800 грн' },
    { name: 'Свічка запалювання', code: 'SPK789', manufacturer: 'NGK', price: '120 грн' },
  ];

  const [parts, setParts] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', manufacturer: '', price: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        setParts(json ? JSON.parse(json) : initialData);
      } catch (e) {
        console.error('Load error', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parts));
  }, [parts]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setParts([...parts, form]);
    setForm({ name: '', code: '', manufacturer: '', price: '' });
  };

  const handleEdit = (index) => {
    setForm(parts[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updated = [...parts];
    updated[editIndex] = form;
    setParts(updated);
    setForm({ name: '', code: '', manufacturer: '', price: '' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    Alert.alert('Підтвердження', 'Видалити запчастину?', [
      { text: 'Скасувати' },
      { text: 'Так', onPress: () => setParts(parts.filter((_, i) => i !== index)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Запчастини</Text>

      {['name', 'code', 'manufacturer', 'price'].map((key) => (
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
        data={parts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.name} ({item.code})</Text>
            <Text>{item.manufacturer} | {item.price}</Text>
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
  item: { padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
});
