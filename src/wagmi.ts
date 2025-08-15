import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { SUPPORTED_CHAINS } from './libs/supportedChains';
import { mantleTestnet } from './libs/mantleChain';

const config = getDefaultConfig({
  appName: 'Tezoro',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: SUPPORTED_CHAINS,
  ssr: true,
});

export { config, mantleTestnet };

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
