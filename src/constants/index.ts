import axios from 'axios';

export const CURRENCIES = ['BTC', 'ETH', 'LTC', 'BCH', 'XRP', 'ADA'] as const;

export const CURRENCY_INFO = {
  BTC: {
    localIcon: require('../../assets/icons/btc.png'),
    color: '#F7931A',
  },
  ETH: {
    localIcon: require('../../assets/icons/eth.png'),
    color: '#627EEA',
  },
  LTC: {
    localIcon: require('../../assets/icons/ltc.png'),
    color: '#B8B8B8',
  },
  BCH: {
    localIcon: require('../../assets/icons/bch.png'),
    color: '#8DC351',
  },
  XRP: {
    localIcon: require('../../assets/icons/xrp.png'),
    color: '#cfcfcf',
  },
  ADA: {
    localIcon: require('../../assets/icons/ada.png'),
    color: '#3CC8C8',
  },
};

export const coinbaseApi = axios.create({
  baseURL: 'https://api.coinbase.com/v2/',
});
