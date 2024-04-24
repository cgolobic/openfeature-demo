import { OpenFeature } from "@openfeature/web-sdk";
import { FlagdWebProvider } from "@openfeature/flagd-web-provider";

init = async () => {
  await OpenFeature.setProviderAndWait(
    new FlagdWebProvider({
      host: 'localhost',
      port: 8013,
      tls: false,
      maxRetries: 10,
      maxDelay: 30000
    })
  );
  const client = OpenFeature.getClient();

  const greeting = client.getStringValue('greeting', 'Hello!');
  document.getElementById('greeting').innerText = greeting;
};

init();