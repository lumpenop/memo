import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home/Home.tsx';
import Detail from '../screen/detail/Detail.tsx';
import { RootStackParamList } from '../types/navigationTypes.ts';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
