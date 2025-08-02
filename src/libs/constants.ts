// Contract addresses by chain ID
const CONTRACT_ADDRESSES = {
  // Etherlink Testnet
  128123: {
    token1ContractAddress: "0x7e9532d025b0d0c06e5913170d5271851b37cf39", // To be deployed
    quizGameContractAddress: "0xc0ee7f9763f414d82c1b59441a6338999eafa80e"  // To be deployed
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