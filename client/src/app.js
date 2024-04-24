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
  const showOutageBanner = client.getBooleanValue('show-outage-banner', false);
  const outageBannerDiv = document.getElementById('outage-banner');
  outageBannerDiv.style.visibility = showOutageBanner ? 'visible' : 'hidden';

  const greeting = client.getStringValue('greeting', 'Hello!');
  document.getElementById('greeting').innerText = greeting;

  const promotionBanner = client.getObjectValue(
    'promotion-banner',
    {
      "background-color": "#2aa198",
      "text-color": "#FFFFFF",
      "body": "Sign up for our email newsletter to never miss a deal!"
    }
  );
  const promotionBannerDiv = document.getElementById('promotion-banner');
  promotionBannerDiv.style.backgroundColor = promotionBanner.backgroundColor;
  promotionBannerDiv.style.color = promotionBanner.textColor;
  promotionBannerDiv.innerText = promotionBanner.body;
}

getClient().then(client => {
  client.addHandler(ProviderEvents.ConfigurationChanged, () => evaluateFlags(client));
  evaluateFlags(client);
});