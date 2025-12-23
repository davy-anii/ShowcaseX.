import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../components/CustomInput';
import { Dropdown } from '../components/Dropdown';
import { INDIAN_STATES, FARMER_TYPES, LANGUAGES } from '../constants/data';
import { RootStackParamList } from '../navigation/AppNavigator';
import { saveLanguage } from '../i18n/i18n';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

interface ProfileData {
  fullName: string;
  mobileNumber: string;
  email: string;
  state: string;
  district: string;
  preferredLanguage: string;
  farmerType: string;
  landSize: string;
  notificationsEnabled: boolean;
  profilePhoto: string | null;
}

export const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initial profile data (would come from API/storage in real app)
  const [initialData] = useState<ProfileData>({
    fullName: 'Ranjit Das',
    mobileNumber: '9876543210',
    email: 'ranjit@example.com',
    state: 'West Bengal',
    district: 'North 24 Parganas',
    preferredLanguage: i18n.language,
    farmerType: 'medium',
    landSize: '5',
    notificationsEnabled: true,
    profilePhoto: null,
  });

  const [profileData, setProfileData] = useState<ProfileData>(initialData);

  // Check if there are any changes
  useEffect(() => {
    const changed = JSON.stringify(profileData) !== JSON.stringify(initialData);
    setHasChanges(changed);
  }, [profileData, initialData]);

  // Change language when preferred language changes
  useEffect(() => {
    if (profileData.preferredLanguage) {
      i18n.changeLanguage(profileData.preferredLanguage);
      saveLanguage(profileData.preferredLanguage);
    }
  }, [profileData.preferredLanguage]);

  const handleFieldChange = (field: keyof ProfileData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert(
        t('profile.permissions.title'),
        t('profile.permissions.message')
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleFieldChange('profilePhoto', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert(
        t('profile.permissions.cameraTitle'),
        t('profile.permissions.cameraMessage')
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleFieldChange('profilePhoto', result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      t('profile.photoOptions.title'),
      t('profile.photoOptions.message'),
      [
        { text: t('profile.photoOptions.camera'), onPress: takePhoto },
        { text: t('profile.photoOptions.gallery'), onPress: pickImage },
        { text: t('profile.photoOptions.cancel'), style: 'cancel' },
      ]
    );
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Profile updated:', profileData);
      Alert.alert(t('profile.success.title'), t('profile.success.message'));
      setHasChanges(false);
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert(t('profile.error.title'), t('profile.error.message'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('profile.logout.confirmTitle'),
      t('profile.logout.confirmMessage'),
      [
        { text: t('profile.logout.cancel'), style: 'cancel' },
        {
          text: t('profile.logout.confirm'),
          style: 'destructive',
          onPress: () => {
            // Navigate back to sign in
            navigation.navigate('SignIn');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="bg-primary pt-12 pb-8 px-6">
        <Text className="text-3xl font-bold text-white mb-1">
          {t('profile.title')}
        </Text>
        <Text className="text-white/80 text-base">
          {t('profile.subtitle')}
        </Text>
      </View>

      <View className="px-6">
        {/* Profile Picture */}
        <View className="items-center -mt-16 mb-8">
          <TouchableOpacity
            onPress={showImageOptions}
            className="relative"
            activeOpacity={0.7}
          >
            <View className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg items-center justify-center overflow-hidden">
              {profileData.profilePhoto ? (
                <Image
                  source={{ uri: profileData.profilePhoto }}
                  className="w-full h-full"
                />
              ) : (
                <Ionicons name="person" size={64} color="#9CA3AF" />
              )}
            </View>
            <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2 border-2 border-white">
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-gray-500 text-sm mt-2">
            {t('profile.tapToChange')}
          </Text>
        </View>

        {/* Basic Information Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            {t('profile.basicInfo')}
          </Text>

          <CustomInput
            label={t('profile.fullName')}
            placeholder={t('profile.fullNamePlaceholder')}
            value={profileData.fullName}
            onChangeText={(value) => handleFieldChange('fullName', value)}
          />

          <CustomInput
            label={t('profile.mobileNumber')}
            placeholder={t('profile.mobileNumberPlaceholder')}
            value={profileData.mobileNumber}
            editable={false}
            style={{ backgroundColor: '#F3F4F6' }}
          />

          <CustomInput
            label={t('profile.email')}
            placeholder={t('profile.emailPlaceholder')}
            value={profileData.email}
            onChangeText={(value) => handleFieldChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Location Information Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            {t('profile.locationInfo')}
          </Text>

          <Dropdown
            label={t('profile.state')}
            placeholder={t('profile.statePlaceholder')}
            value={profileData.state}
            options={INDIAN_STATES}
            onSelect={(value) => handleFieldChange('state', value)}
          />

          <CustomInput
            label={t('profile.district')}
            placeholder={t('profile.districtPlaceholder')}
            value={profileData.district}
            onChangeText={(value) => handleFieldChange('district', value)}
          />
        </View>

        {/* Language Preference Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            {t('profile.languagePreference')}
          </Text>

          <Dropdown
            label={t('profile.preferredLanguage')}
            placeholder={t('profile.languagePlaceholder')}
            value={
              LANGUAGES.find((l) => l.value === profileData.preferredLanguage)
                ? t(
                    LANGUAGES.find(
                      (l) => l.value === profileData.preferredLanguage
                    )!.labelKey
                  )
                : ''
            }
            options={LANGUAGES.map((lang) => t(lang.labelKey))}
            onSelect={(value) => {
              const selectedLang = LANGUAGES.find(
                (lang) => t(lang.labelKey) === value
              );
              if (selectedLang) {
                handleFieldChange('preferredLanguage', selectedLang.value);
              }
            }}
          />
        </View>

        {/* Farming Information Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            {t('profile.farmingInfo')}
          </Text>

          <Dropdown
            label={t('profile.farmerType')}
            placeholder={t('profile.farmerTypePlaceholder')}
            value={
              FARMER_TYPES.find((f) => f.value === profileData.farmerType)
                ? t(
                    FARMER_TYPES.find((f) => f.value === profileData.farmerType)!
                      .labelKey
                  )
                : ''
            }
            options={FARMER_TYPES.map((type) => t(type.labelKey))}
            onSelect={(value) => {
              const selectedType = FARMER_TYPES.find(
                (type) => t(type.labelKey) === value
              );
              if (selectedType) {
                handleFieldChange('farmerType', selectedType.value);
              }
            }}
          />

          <CustomInput
            label={t('profile.landSize')}
            placeholder={t('profile.landSizePlaceholder')}
            value={profileData.landSize}
            onChangeText={(value) => handleFieldChange('landSize', value)}
            keyboardType="decimal-pad"
            suffix={t('profile.acres')}
          />
        </View>

        {/* Preferences Section */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            {t('profile.preferences')}
          </Text>

          <View className="bg-gray-50 rounded-xl p-4 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-gray-900 font-medium text-base mb-1">
                {t('profile.notifications')}
              </Text>
              <Text className="text-gray-600 text-sm">
                {t('profile.notificationsDesc')}
              </Text>
            </View>
            <Switch
              value={profileData.notificationsEnabled}
              onValueChange={(value) =>
                handleFieldChange('notificationsEnabled', value)
              }
              trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
              thumbColor={profileData.notificationsEnabled ? '#22C55E' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          onPress={handleSaveChanges}
          disabled={!hasChanges || isLoading}
          className={`rounded-xl py-4 mb-4 ${
            !hasChanges || isLoading ? 'bg-gray-300' : 'bg-primary'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center text-lg font-semibold">
              {t('profile.saveChanges')}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="rounded-xl py-4 border-2 border-red-500 mb-4"
        >
          <Text className="text-red-500 text-center text-lg font-semibold">
            {t('profile.logout.button')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
