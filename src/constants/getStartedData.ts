export interface GetStartedItem {
  id: string;
  image: any;
  text: string;
}

export const getStartedData: GetStartedItem[] = [
  {
    id: '1',
    image: require('../../public/assets/onboarding-1.jpg'),
    text: 'Predict crops, understand profit and manage risks easily.',
  },
  {
    id: '2',
    image: require('../../public/assets/onboarding-2.jpg'),
    text: 'Detect crop diseases, understand health and take action early.',
  },
  {
    id: '3',
    image: require('../../public/assets/onboarding-3.jpg'),
    text: 'Plan daily farming tasks, get reminders and harvest on time.',
  },
  {
    id: '4',
    image: require('../../public/assets/onboarding-4.jpg'),
    text: 'Ask farming questions, get accurate answers and trusted guidance.',
  },
  {
    id: '5',
    image: require('../../public/assets/onboarding-5.jpg'),
    text: 'Understand documents clearly, avoid scams and stay informed.',
  },
  {
    id: '6',
    image: require('../../public/assets/onboarding-6.jpg'),
    text: 'Connect with buyers, negotiate prices and sell crops directly.',
  },
];
