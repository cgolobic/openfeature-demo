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

  const total = 132.16;
  const discount = client.getNumberValue('discount', 0);
  const discountAmount = total * discount;
  const amountDue = total - discountAmount;
  const totalAmountCell = document.getElementById('total-amount');
  const discountRow = document.getElementById('discount');
  const discountAmountCell = document.getElementById('discount-amount');
  const amountDueCell = document.getElementById('amount-due');
  totalAmountCell.innerText = `$${total}`;
  discountRow.style.display = discount === 0 ? 'none' : 'table-row';
  discountAmountCell.innerText = `-$${discountAmount}`;
  amountDueCell.innerText = `$${amountDue}`;

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

async function flipCoins(client) {
  let headsCount = 0;
  let tailsCount = 0;
  const resultsTable = document.getElementById('coin-results');
  resultsTable.replaceChildren();
  for(let i = 0; i < 100; i++) {
    await OpenFeature.setContext({ id: i });
    const coinFlipResult = client.getStringValue('coin-flip', 'heads');
    const resultRow = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.innerText = i;
    const resultCell = document.createElement('td');
    resultCell.innerText = coinFlipResult;
    resultRow.appendChild(idCell);
    resultRow.appendChild(resultCell);
    resultsTable.appendChild(resultRow);
    resultCell.style.color = '#FFFFFF';
    if (coinFlipResult === 'heads') {
      resultCell.style.backgroundColor = '#d33682';
      headsCount++;
    }
    if (coinFlipResult === 'tails') {
      resultCell.style.backgroundColor = '#268bd2';
      tailsCount++;
    }
  }
   document.getElementById('heads-count').innerText = headsCount;
   document.getElementById('tails-count').innerText = tailsCount;
}

getClient().then(client => {
  client.addHandler(ProviderEvents.ConfigurationChanged, () => evaluateFlags(client));
  evaluateFlags(client);

  document.getElementById('flip-coins').addEventListener('click', () => {
   flipCoins(client); 
  });
});