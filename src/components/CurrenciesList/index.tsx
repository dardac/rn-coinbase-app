import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setError, updatePrice } from '../../store/currencySlice';
import { getInitialPrices } from '../../store/thunks';
import { CryptoCurrency } from '../../types';
import { CurrencyItem } from '../CurrencyItem';
import { styles } from './styles';

export const CurrenciesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {currencies, loading, error} = useSelector(
    (state: RootState) => state.crypto,
  );
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    dispatch(getInitialPrices());

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [dispatch]);

  const connectWebSocket = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'unsubscribe',
          product_ids: [
            'BTC-USD',
            'ETH-USD',
            'LTC-USD',
            'BCH-USD',
            'XRP-USD',
            'ADA-USD',
          ],
          channels: ['ticker'],
        })
      );
      ws.close();
      setWs(null);
      return;
    }

    const websocket = new WebSocket('wss://ws-feed.exchange.coinbase.com');
    setWs(websocket);

    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: [
            'BTC-USD',
            'ETH-USD',
            'LTC-USD',
            'BCH-USD',
            'XRP-USD',
            'ADA-USD',
          ],
          channels: ['ticker'],
        }),
      );
    };

    websocket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'ticker' && data.price) {
        dispatch(
          updatePrice({
            currency: data.product_id.split('-')[0],
            price: data.price,
          }),
        );
      }
    };

    websocket.onerror = () => {
      dispatch(setError('There was an error with the WebSocket connection.'));
      setWs(null);
    };

    websocket.onclose = () => {
      setWs(null);
    };
  };

  const handleCryptoPress = (color: string) => {
    setBackgroundColor(color);
  };

  const renderItem = ({item}: {item: CryptoCurrency}) => (
    <CurrencyItem crypto={item} onPress={handleCryptoPress} />
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor}]}>
        <ActivityIndicator size="large" color="#26c2e8" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor}]}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <Text style={styles.title}>Cryptocurrencies</Text>
      <TouchableOpacity onPress={connectWebSocket} style={styles.button}>
        <Text style={styles.buttonText}>
          {ws && ws.readyState === WebSocket.OPEN
            ? 'Stop'
            : 'Get real-time prices'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={currencies}
        renderItem={renderItem}
        keyExtractor={item => item.currency}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};
