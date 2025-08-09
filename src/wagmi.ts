import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { SUPPORTED_CHAINS } from './libs/supportedChains';
import { coreTestnet } from './libs/coreChain';

const config = getDefaultConfig({
  appName: 'Tezoro',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: SUPPORTED_CHAINS,
  ssr: true,
});

export { config, coreTestnet };

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
