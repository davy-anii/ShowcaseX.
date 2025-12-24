import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: t('chatbot.welcomeMessage') || 'Hello! How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Greetings
    if (lowerInput.match(/\b(hi|hello|hey|namaste)\b/)) {
      return t('chatbot.responses.greeting');
    }
    
    // Crop-related queries
    if (lowerInput.includes('crop') || lowerInput.includes('plant') || lowerInput.includes('farming') || lowerInput.includes('cultivation')) {
      return t('chatbot.responses.crop');
    } 
    
    // Disease/Pest queries
    if (lowerInput.includes('disease') || lowerInput.includes('pest') || lowerInput.includes('sick') || lowerInput.includes('problem') || lowerInput.includes('infection')) {
      return t('chatbot.responses.disease');
    } 
    
    // Weather queries
    if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('temperature') || lowerInput.includes('humidity')) {
      return t('chatbot.responses.weather');
    } 
    
    // Document queries
    if (lowerInput.includes('document') || lowerInput.includes('paper') || lowerInput.includes('certificate') || lowerInput.includes('form')) {
      return t('chatbot.responses.document');
    }
    
    // Fertilizer queries
    if (lowerInput.includes('fertilizer') || lowerInput.includes('manure') || lowerInput.includes('compost') || lowerInput.includes('nutrients')) {
      return t('chatbot.responses.fertilizer');
    }
    
    // Irrigation/Water queries
    if (lowerInput.includes('water') || lowerInput.includes('irrigation') || lowerInput.includes('watering')) {
      return t('chatbot.responses.water');
    }
    
    // Harvest queries
    if (lowerInput.includes('harvest') || lowerInput.includes('yield') || lowerInput.includes('produce')) {
      return t('chatbot.responses.harvest');
    }
    
    // Price/Market queries
    if (lowerInput.includes('price') || lowerInput.includes('market') || lowerInput.includes('sell')) {
      return t('chatbot.responses.price');
    }
    
    // Help/Features
    if (lowerInput.includes('help') || lowerInput.includes('feature') || lowerInput.includes('how') || lowerInput.includes('what can')) {
      return t('chatbot.responses.help');
    }
    
    // Thank you
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return t('chatbot.responses.thanks');
    }
    
    // Default response
    return t('chatbot.responses.default');
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
      >
        {/* Header */}
        <View className="bg-primary px-6 pt-12 pb-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              {t('chatbot.title') || 'AI Assistant'}
            </Text>
            <Text className="text-white/80 text-sm">
              {t('chatbot.subtitle') || 'Ask me anything about farming'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="bg-white/20 rounded-full w-10 h-10 items-center justify-center"
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          contentContainerStyle={{ paddingBottom: 16 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-3 ${message.isUser ? 'items-end' : 'items-start'}`}
            >
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? 'bg-primary'
                    : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-base ${
                    message.isUser ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {message.text}
                </Text>
              </View>
              <Text className="text-xs text-gray-400 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))}

          {isTyping && (
            <View className="items-start mb-3">
              <View className="bg-gray-100 rounded-2xl px-4 py-3">
                <Text className="text-gray-500">Typing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="px-4 py-3 border-t border-gray-200">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4">
            <TextInput
              className="flex-1 py-3 text-base text-gray-800"
              placeholder={t('chatbot.inputPlaceholder') || 'Type your message...'}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              multiline
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={!inputText.trim()}
              className={`ml-2 w-10 h-10 rounded-full items-center justify-center ${
                inputText.trim() ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() ? '#fff' : '#999'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
