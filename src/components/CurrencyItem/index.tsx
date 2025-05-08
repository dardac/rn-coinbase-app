import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { CryptoCurrency } from '../../types';
import { styles } from './styles';

interface CurrencyItemProps {
  crypto: CryptoCurrency;
  onPress: (color: string) => void;
}

export const CurrencyItem: React.FC<CurrencyItemProps> = ({crypto, onPress}) => {
  const handlePress = () => {
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    onPress(crypto.color);
  };

  const imageSource = crypto.localIcon;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <FastImage
        source={imageSource}
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{crypto.currency}</Text>
        <Text style={styles.price}>${parseFloat(crypto.price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};
