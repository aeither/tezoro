import { defineChain } from 'viem'

// Mantle Testnet configuration
export const mantleTestnet = defineChain({
  id: 5001,
  name: 'Mantle Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bit',
    symbol: 'BIT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mantle.xyz'],
    },
    public: {
      http: ['https://rpc.testnet.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.testnet.mantle.xyz',
    },
  },
  testnet: true,
})

// Mantle Mainnet configuration for future use
export const mantleMainnet = defineChain({
  id: 5000,
  name: 'Mantle',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.mantle.xyz'],
    },
    public: {
      http: ['https://rpc.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Explorer',
      url: 'https://explorer.mantle.xyz',
    },
  },
})