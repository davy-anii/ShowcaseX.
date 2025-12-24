import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChatbotModal } from '../components/ChatbotModal';
import { SideDrawer } from '../components/SideDrawer';

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export const DashboardScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Translated farming updates
  const FARMING_UPDATES = [
    {
      id: '1',
      title: t('dashboard.farmingFeed.update1Title'),
      description: t('dashboard.farmingFeed.update1Description'),
      region: t('dashboard.farmingFeed.update1Region'),
    },
    {
      id: '2',
      title: t('dashboard.farmingFeed.update2Title'),
      description: t('dashboard.farmingFeed.update2Description'),
      region: t('dashboard.farmingFeed.update2Region'),
    },
    {
      id: '3',
      title: t('dashboard.farmingFeed.update3Title'),
      description: t('dashboard.farmingFeed.update3Description'),
      region: t('dashboard.farmingFeed.update3Region'),
    },
    {
      id: '4',
      title: t('dashboard.farmingFeed.update4Title'),
      description: t('dashboard.farmingFeed.update4Description'),
      region: t('dashboard.farmingFeed.update4Region'),
    },
  ];

  const WEATHER_DATA = {
    temperature: 32,
    rain: t('dashboard.weatherData.yes'),
    humidity: 78,
    condition: t('dashboard.weatherData.partlyCloudy'),
  };

  const FARM_SUMMARY = {
    crops: t('dashboard.crops.rice'),
    area: 2,
    status: t('dashboard.farmSummary.healthy'),
  };

  const handleDrawerNavigate = (screen: 'Profile' | 'CropPrediction' | 'DocumentAnalyzer' | 'CropDiseaseDetection') => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-primary px-6 pt-12 pb-8 rounded-b-3xl">
          <View className="flex-row items-center mb-4">
            <View className="flex-1">
              <Text className="text-white text-3xl font-bold">
                🙏🏻 {t('dashboard.greeting')}
              </Text>
              <Text className="text-white/90 text-base mt-1">
                {t('dashboard.subtitle')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsDrawerVisible(true)}
              className="bg-white/20 rounded-full w-12 h-12 items-center justify-center ml-4"
            >
              <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather Forecast */}
        <View className="px-6 mt-4">
          <Text className="text-gray-900 text-xl font-bold mb-3">
            {t('dashboard.weather.title')}
          </Text>
          <View
            className="bg-white rounded-xl p-5 shadow-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center mb-4">
              <Text className="text-6xl mr-4">☀️</Text>
              <View>
                <Text className="text-4xl font-bold text-gray-900">
                  {WEATHER_DATA.temperature}°C
                </Text>
                <Text className="text-gray-600 text-base">
                  {WEATHER_DATA.condition}
                </Text>
              </View>
            </View>
            
            <View className="flex-row justify-between pt-4 border-t border-gray-100">
              <View className="items-center flex-1">
                <Text className="text-3xl mb-1">💧</Text>
                <Text className="text-gray-600 text-sm">
                  {t('dashboard.weather.rain')}
                </Text>
                <Text className="text-gray-900 text-base font-semibold">
                  {WEATHER_DATA.rain}
                </Text>
              </View>
              <View className="items-center flex-1 border-l border-gray-100">
                <Text className="text-3xl mb-1">💨</Text>
                <Text className="text-gray-600 text-sm">
                  {t('dashboard.weather.humidity')}
                </Text>
                <Text className="text-gray-900 text-base font-semibold">
                  {WEATHER_DATA.humidity}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Farm Summary */}
        <View className="px-6 mt-4">
          <Text className="text-gray-900 text-xl font-bold mb-3">
            {t('dashboard.farmSummary.title')}
          </Text>
          <View
            className="bg-white rounded-xl p-5 shadow-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="bg-green-100 rounded-full w-12 h-12 items-center justify-center mr-4">
                  <Text className="text-2xl">🌾</Text>
                </View>
                <View>
                  <Text className="text-gray-600 text-sm">
                    {t('dashboard.farmSummary.crops')}
                  </Text>
                  <Text className="text-gray-900 text-lg font-semibold">
                    {FARM_SUMMARY.crops}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-blue-100 rounded-full w-12 h-12 items-center justify-center mr-4">
                  <Text className="text-2xl">📏</Text>
                </View>
                <View>
                  <Text className="text-gray-600 text-sm">
                    {t('dashboard.farmSummary.area')}
                  </Text>
                  <Text className="text-gray-900 text-lg font-semibold">
                    {FARM_SUMMARY.area} {t('dashboard.farmSummary.acres')}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-yellow-100 rounded-full w-12 h-12 items-center justify-center mr-4">
                  <Text className="text-2xl">💚</Text>
                </View>
                <View>
                  <Text className="text-gray-600 text-sm">
                    {t('dashboard.farmSummary.status')}
                  </Text>
                  <Text className="text-green-600 text-lg font-semibold">
                    {t('dashboard.farmSummary.healthy')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Farming Feed */}
        <View className="px-6 mt-4">
          <Text className="text-gray-900 text-xl font-bold mb-3">
            {t('dashboard.farmingFeed.title')}
          </Text>
          <View className="space-y-3">
            {FARMING_UPDATES.map((update) => (
              <View
                key={update.id}
                className="bg-white rounded-xl p-4 shadow-sm"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-start mb-2">
                  <View className="bg-primary/10 rounded-lg px-3 py-1">
                    <Text className="text-primary text-xs font-semibold">
                      📍 {update.region}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-900 text-base font-bold mb-2">
                  {update.title}
                </Text>
                <Text className="text-gray-600 text-sm leading-5">
                  {update.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Chatbot Modal */}
      <ChatbotModal
        visible={isChatbotVisible}
        onClose={() => setIsChatbotVisible(false)}
      />

      {/* Side Drawer */}
      <SideDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onNavigate={handleDrawerNavigate}
        onChatbotOpen={() => setIsChatbotVisible(true)}
      />
    </SafeAreaView>
  );
};
