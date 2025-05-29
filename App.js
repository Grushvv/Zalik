// App.js — головний файл застосунку з навігацією
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import ClientsScreen from './pages/ClientsScreen';
import AppointmentsScreen from './pages/AppointmentsScreen';
import PartsScreen from './pages/PartsScreen';
import RemindersScreen from './pages/RemindersScreen';
import ContactsScreen from './pages/ContactsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Головна' }} />
        <Stack.Screen name="Clients" component={ClientsScreen} options={{ title: 'Клієнти' }} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{ title: 'Записи' }} />
        <Stack.Screen name="Parts" component={PartsScreen} options={{ title: 'Запчастини' }} />
        <Stack.Screen name="Reminders" component={RemindersScreen} options={{ title: 'Нагадування' }} />
        <Stack.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Контакти' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
