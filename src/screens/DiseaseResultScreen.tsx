import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';

type DiseaseResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiseaseResult'
>;

type DiseaseResultScreenRouteProp = RouteProp<
  RootStackParamList,
  'DiseaseResult'
>;

export const DiseaseResultScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<DiseaseResultScreenNavigationProp>();
  const route = useRoute<DiseaseResultScreenRouteProp>();
  
  const { cropImage, cropType, cropAge, weather } = route.params;

  // Hardcoded disease analysis result for UI demo
  const diseaseData = {
    diseaseName: 'Leaf Blight',
    severity: 'medium',
    treatment: 'Use fungicide spray every 7-10 days. Apply copper-based fungicide or mancozeb.',
    prevention: 'Avoid excess water and ensure proper drainage. Remove infected leaves immediately.',
    healthPercentage: 70,
    recoveryChance: 'high',
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRecoveryColor = (recovery: string) => {
    switch (recovery) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getHealthBarColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleBackToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleScanAnother = () => {
    navigation.navigate('CropDiseaseDetection');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
      >
        {/* Header */}
        <View className="mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-4"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-gray-800">
            {t('diseaseResult.title')}
          </Text>
        </View>

        {/* Crop Image */}
        {cropImage && (
          <View className="mb-6">
            <Image
              source={{ uri: cropImage }}
              className="w-full h-48 rounded-xl"
              resizeMode="cover"
            />
          </View>
        )}

        {/* Analysis Details Card */}
        <View className="bg-blue-50 rounded-xl p-4 mb-4">
          <Text className="text-blue-900 font-semibold text-lg mb-2">
            {t('diseaseResult.analysisDetails')}
          </Text>
          <View className="space-y-1">
            <Text className="text-blue-800">
              • {t('disease.cropType')}: {cropType}
            </Text>
            {cropAge && (
              <Text className="text-blue-800">
                • {t('disease.cropAge')}: {cropAge} {t('disease.days')}
              </Text>
            )}
            <Text className="text-blue-800">
              • {t('disease.recentWeather')}: {weather}
            </Text>
          </View>
        </View>

        {/* Detected Disease Card */}
        <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-2">
            <View className="bg-red-100 rounded-full w-10 h-10 items-center justify-center mr-3">
              <Text className="text-xl">🦠</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm">
                {t('diseaseResult.detectedDisease')}
              </Text>
              <Text className="text-gray-900 text-lg font-bold">
                {diseaseData.diseaseName}
              </Text>
            </View>
          </View>
        </View>

        {/* Severity Card */}
        <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-orange-100 rounded-full w-10 h-10 items-center justify-center mr-3">
                <Text className="text-xl">⚠️</Text>
              </View>
              <Text className="text-gray-600 text-sm">
                {t('diseaseResult.severity')}
              </Text>
            </View>
            <View
              className={`px-4 py-2 rounded-full ${getSeverityColor(
                diseaseData.severity
              )}`}
            >
              <Text className="font-semibold">
                {t(`diseaseResult.severityLevels.${diseaseData.severity}`)}
              </Text>
            </View>
          </View>
        </View>

        {/* Crop Health Bar */}
        <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="bg-green-100 rounded-full w-10 h-10 items-center justify-center mr-3">
              <Text className="text-xl">💚</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm">
                {t('diseaseResult.cropHealth')}
              </Text>
              <Text className="text-gray-900 text-lg font-bold">
                {diseaseData.healthPercentage}% {t('diseaseResult.healthy')}
              </Text>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View className="bg-gray-200 h-3 rounded-full overflow-hidden">
            <View
              className={`h-full ${getHealthBarColor(
                diseaseData.healthPercentage
              )}`}
              style={{ width: `${diseaseData.healthPercentage}%` }}
            />
          </View>
        </View>

        {/* Recovery Chance Card */}
        <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-purple-100 rounded-full w-10 h-10 items-center justify-center mr-3">
                <Text className="text-xl">📈</Text>
              </View>
              <Text className="text-gray-600 text-sm">
                {t('diseaseResult.recoveryChance')}
              </Text>
            </View>
            <Text
              className={`text-lg font-bold ${getRecoveryColor(
                diseaseData.recoveryChance
              )}`}
            >
              {t(`diseaseResult.recoveryLevels.${diseaseData.recoveryChance}`)}
            </Text>
          </View>
        </View>

        {/* Recommendations Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            {t('diseaseResult.recommendations')}
          </Text>

          {/* Treatment Card */}
          <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
            <View className="flex-row items-start mb-2">
              <View className="bg-green-200 rounded-full w-8 h-8 items-center justify-center mr-3 mt-1">
                <Text className="text-lg">💊</Text>
              </View>
              <View className="flex-1">
                <Text className="text-green-900 font-semibold text-base mb-1">
                  {t('diseaseResult.treatment')}
                </Text>
                <Text className="text-green-800 text-sm leading-5">
                  {diseaseData.treatment}
                </Text>
              </View>
            </View>
          </View>

          {/* Prevention Card */}
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <View className="flex-row items-start">
              <View className="bg-blue-200 rounded-full w-8 h-8 items-center justify-center mr-3 mt-1">
                <Text className="text-lg">🛡️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-blue-900 font-semibold text-base mb-1">
                  {t('diseaseResult.prevention')}
                </Text>
                <Text className="text-blue-800 text-sm leading-5">
                  {diseaseData.prevention}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          <TouchableOpacity
            onPress={handleBackToDashboard}
            className="bg-green-600 rounded-xl py-4 items-center"
          >
            <Text className="text-white text-lg font-semibold">
              {t('diseaseResult.backToDashboard')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleScanAnother}
            className="bg-white border-2 border-green-600 rounded-xl py-4 items-center"
          >
            <Text className="text-green-600 text-lg font-semibold">
              {t('diseaseResult.scanAnother')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
