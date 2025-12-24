import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PredictionResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PredictionResult'
>;

// Hardcoded prediction results for UI
const PREDICTION_RESULTS = [
  {
    id: 1,
    label: 'expectedYield',
    value: '18–22 Quintals',
    icon: '🌾',
    color: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 2,
    label: 'cropHealth',
    value: 'Good',
    icon: '💚',
    color: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 3,
    label: 'riskLevel',
    value: 'Low',
    icon: '✅',
    color: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 4,
    label: 'waterRequirement',
    value: 'Medium',
    icon: '💧',
    color: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    id: 5,
    label: 'fertilizerSuggestion',
    value: 'Nitrogen-based',
    icon: '🧪',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  {
    id: 6,
    label: 'harvestReadiness',
    value: 'On Time',
    icon: '⏰',
    color: 'bg-green-100',
    textColor: 'text-green-700',
  },
];

export const PredictionResultScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<PredictionResultScreenNavigationProp>();

  const handleBackToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleNewPrediction = () => {
    navigation.navigate('CropPrediction');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-green-500 px-6 pt-12 pb-8 rounded-b-3xl mb-6">
          <View className="items-center">
            <View className="bg-white/20 rounded-full w-20 h-20 items-center justify-center mb-4">
              <Text className="text-5xl">✨</Text>
            </View>
            <Text className="text-white text-3xl font-bold text-center">
              {t('result.title')}
            </Text>
            <Text className="text-white/90 text-base mt-2 text-center">
              {t('result.subtitle')}
            </Text>
          </View>
        </View>

        <View className="px-6">
          {/* Results Section */}
          <View className="mb-6">
            <Text className="text-gray-900 text-xl font-bold mb-4">
              {t('result.predictionResults')}
            </Text>

            <View className="space-y-3">
              {PREDICTION_RESULTS.map((result) => (
                <View
                  key={result.id}
                  className="bg-white rounded-xl p-4 flex-row items-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                  }}
                >
                  <View
                    className={`${result.color} rounded-full w-14 h-14 items-center justify-center mr-4`}
                  >
                    <Text className="text-3xl">{result.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-600 text-sm mb-1">
                      {t(`result.${result.label}`)}
                    </Text>
                    <Text
                      className={`${result.textColor} text-lg font-bold`}
                    >
                      {result.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Recommendation Card */}
          <View
            className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100"
          >
            <View className="flex-row items-start mb-3">
              <Text className="text-3xl mr-3">💡</Text>
              <Text className="text-blue-900 text-lg font-bold flex-1">
                {t('result.recommendationTitle')}
              </Text>
            </View>
            <Text className="text-blue-800 text-base leading-6">
              {t('result.recommendationText')}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3">
            {/* Primary Button - Back to Dashboard */}
            <TouchableOpacity
              onPress={handleBackToDashboard}
              className="bg-green-500 rounded-xl py-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text className="text-white text-center text-lg font-semibold">
                {t('result.backToDashboard')}
              </Text>
            </TouchableOpacity>

            {/* Secondary Button - New Prediction */}
            <TouchableOpacity
              onPress={handleNewPrediction}
              className="bg-white border-2 border-green-500 rounded-xl py-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Text className="text-green-500 text-center text-lg font-semibold">
                {t('result.newPrediction')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info Note */}
          <View className="mt-6 px-4">
            <Text className="text-gray-500 text-sm text-center leading-5">
              {t('result.infoNote')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
