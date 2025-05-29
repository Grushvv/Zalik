// AppointmentsScreen.js — екран записів на обслуговування
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'appointmentsData';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: '', client: '', service: '', price: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        setAppointments(json ? JSON.parse(json) : []);
      } catch (e) {
        console.error('Load error', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleAdd = () => {
    if (!form.date || !form.client) return;
    setAppointments([...appointments, form]);
    setForm({ date: '', client: '', service: '', price: '' });
  };

  const handleEdit = (index) => {
    setForm(appointments[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updated = [...appointments];
    updated[editIndex] = form;
    setAppointments(updated);
    setForm({ date: '', client: '', service: '', price: '' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    Alert.alert('Підтвердження', 'Видалити запис?', [
      { text: 'Скасувати' },
      { text: 'Так', onPress: () => setAppointments(appointments.filter((_, i) => i !== index)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Записи на обслуговування</Text>

      <TextInput
        placeholder="Дата (YYYY-MM-DD)"
        style={styles.input}
        value={form.date}
        onChangeText={(text) => handleChange('date', text)}
      />
      <TextInput
        placeholder="Клієнт"
        style={styles.input}
        value={form.client}
        onChangeText={(text) => handleChange('client', text)}
      />
      <TextInput
        placeholder="Послуга"
        style={styles.input}
        value={form.service}
        onChangeText={(text) => handleChange('service', text)}
      />
      <TextInput
        placeholder="Ціна"
        style={styles.input}
        value={form.price}
        onChangeText={(text) => handleChange('price', text)}
      />

      <Button title={editIndex !== null ? 'Оновити' : 'Додати'} onPress={editIndex !== null ? handleUpdate : handleAdd} />

      <FlatList
        data={appointments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.date} — {item.client}</Text>
            <Text>{item.service} | {item.price}</Text>
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
