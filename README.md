## NOTES:

- First challenge: I am not familiar with the Coinbase API so I’m going to read the documentation before starting to code.Note:The URLs didn’t work for me so I searched through the documentation for the prices API. I’m using https://docs.cdp.coinbase.com/coinbase-app/docs/track/api-prices#get-spot-price (hope this is the right API)
- I searched for 6 popular currencies, so i’m going to get prices for them (BTC, ETH, LTC, BCH, XRP, ADA)
- Starting coding at 8:00pm (Venezuela time)
- I faced some issues with react-native community cli and the react-native and react versions I had installed in my laptop. So I manually upgraded them
- I started by getting the prices first and showing them as a simple list
- That worked, I see that I still have time (it’s 8:30pm) so I’m going to add some styles
- I don’t have a good file organization yet, at least not as good as I wish. I thought I wouldn’t need many folders but now I see that maybe I do
- Ok, I was able to connect to Coinbase price feed, I hadn’t worked with websockets for a long time so I asked Grok for help with this step
- I added Redux to the app and my folders are messy. I’ll reorganize everything and will add more error handling (9:18pm)
- I wanted to show the icons for each currency by getting them from cryptocompare, but I had some issues getting BCH and XRP icons. I’ll add the images locally.
- I decided to use react-native-fast-image to improve the images loading performance 
- I’d like to add a new screen that only shows the cryptocurrency, but as that’d be additional I’ll focus first on checking the code again and adding improvements to what I already have
- I’ll create the repo and push the code (10:03pm)
- I had an issue because I have many ssh for different github accounts locally, so I has to regenerate a new SSH and a new token. That's why I pushed my commit like 15 mins after
