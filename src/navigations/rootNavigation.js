import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OnBoard" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default RootNavigation;