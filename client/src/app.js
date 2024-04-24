import { OpenFeature, ProviderEvents } from "@openfeature/web-sdk";
import { FlagdWebProvider } from "@openfeature/flagd-web-provider";


async function getClient() {
  await OpenFeature.setProviderAndWait(
    new FlagdWebProvider({
      host: 'localhost',
      port: 8013,
      tls: false,
      maxRetries: 10,
      maxDelay: 30000
    })
  );
  return OpenFeature.getClient();
}

function evaluateFlags(client) {
  const greeting = client.getStringValue('greeting', 'Hello!');
  document.getElementById('greeting').innerText = greeting;

  const promotionBanner = client.getObjectValue(
    'promotion-banner',
    {
      "background-color": "#2aa198",
      "text-color": "",
      "body": "Sign up for our email newsletter to never miss a deal!"
    }
  );
  const bannerDiv = document.getElementById('promotion-banner');
  bannerDiv.style.backgroundColor = promotionBanner.backgroundColor;
  bannerDiv.style.color = promotionBanner.textColor;
  bannerDiv.innerText = promotionBanner.body;
}

getClient().then(client => {
  client.addHandler(ProviderEvents.ConfigurationChanged, () => evaluateFlags(client));
  evaluateFlags(client);
});