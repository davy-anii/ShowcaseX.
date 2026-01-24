import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import GetStartedCarousel from '../components/GetStartedCarousel';
import { RootStackParamList } from '../navigation/AppNavigator';

type GetStartedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GetStarted'
>;

type GetStartedScreenRouteProp = RouteProp<RootStackParamList, 'GetStarted'>;

export default function GetStartedScreen() {
  const navigation = useNavigation<GetStartedScreenNavigationProp>();
  const route = useRoute<GetStartedScreenRouteProp>();
  const targetScreen = route.params?.targetScreen || 'Dashboard';

  const handleComplete = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: targetScreen as any }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <GetStartedCarousel onComplete={handleComplete} />
    </View>
  );
}
