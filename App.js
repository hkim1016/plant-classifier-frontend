import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UploadPhoto from './pages/UploadPhoto';
import LiveView from './pages/LiveView';
import Contacts from './pages/Contacts';
import Authentication from './pages/Authentication';
import Home from './pages/Home';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'UploadPhoto') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'LiveView') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Contacts') {
              iconName = focused ? 'contacts' : 'contacts-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            paddingTop: 10
          },
          headerStyle: {
            backgroundColor: '#878787'
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Tab.Screen name="UploadPhoto" component={UploadPhoto} options={{headerShown:false}}/>
        <Tab.Screen name="LiveView" component={LiveView} options={{headerShown:false}}/>
        <Tab.Screen name="Contacts" component={Contacts} options={{headerShown:false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
