import { coinbaseApi, CURRENCIES, CURRENCY_INFO } from '../constants';

interface CoinbasePriceResponse {
  data: {
    amount: string;
    currency: string;
    base: string;
  };
}

export const getPrices = async (): Promise<
  { currency: string; price: string; localIcon: string; color: string }[]
> => {
 try {
    const promises = CURRENCIES.map(async (currency) => {
      const response = await coinbaseApi.get<CoinbasePriceResponse>(
        `prices/${currency}-USD/spot`
      );
      return {
        currency: response.data.data.base,
        price: response.data.data.amount,
        localIcon: CURRENCY_INFO[currency].localIcon,
        color: CURRENCY_INFO[currency].color,
      };
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw new Error('Sorry! Unable to fetch crypto prices at the moment.');
  }
};
