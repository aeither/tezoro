// Contract addresses by chain ID
const CONTRACT_ADDRESSES = {
  // Etherlink Testnet
  128123: {
    token1ContractAddress: "0x7e9532d025b0d0c06e5913170d5271851b37cf39",
    quizGameContractAddress: "0xc0ee7f9763f414d82c1b59441a6338999eafa80e",
    // New demo contracts (placeholder addresses - update after deployment)
    quizDuelContractAddress: "0x0000000000000000000000000000000000000001",
    guildSystemContractAddress: "0x0000000000000000000000000000000000000002",
    quizNFTContractAddress: "0x0000000000000000000000000000000000000003"
  }
} as const;

// Function to get contract addresses by chain ID
export function getContractAddresses(chainId: number) {
  return CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] || {
    token1ContractAddress: "0x0000000000000000000000000000000000000000",
    quizGameContractAddress: "0x0000000000000000000000000000000000000000"
  };
}

// Legacy exports for backward compatibility (defaults to Etherlink Testnet)
export const token1ContractAddress = CONTRACT_ADDRESSES[128123].token1ContractAddress;
export const quizGameContractAddress = CONTRACT_ADDRESSES[128123].quizGameContractAddress;

// Demo configuration
export const DEMO_CONFIG = {
  AUTO_PLAY_INTERVAL: 30000, // 30 seconds per step
  STEP_DURATION: {
    1: 20000, // Solo Quiz: 20 seconds
    2: 29000, // PvP Duel: 29 seconds  
    3: 29000, // Guild System: 29 seconds
    4: 26000  // NFT Quizzes: 26 seconds
  },
  MOCK_DATA: {
    ORACLE_PRICES: {
      XTZ: { price: 1.23, index: 1 },
      ETH: { price: 2450.50, index: 2 }
    },
    GUILD_MEMBERS: [
      { name: "Alex", score: 850, avatar: "👤", fid: 12345 },
      { name: "Sarah", score: 720, avatar: "👩", fid: 23456 },
      { name: "Mike", score: 680, avatar: "👨", fid: 34567 },
      { name: "Emma", score: 590, avatar: "👱‍♀️", fid: 45678 }
    ]
  }
} as const;