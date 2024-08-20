import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes.ts';
import MenuNavigation from './MenuNavigation.tsx';
import Detail from '~/screen/memo/detail/Detail.tsx';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={MenuNavigation}
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
