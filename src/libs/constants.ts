// Contract addresses by chain ID
const CONTRACT_ADDRESSES = {
  // Mantle Sepolia Testnet
  5003: {
    token1ContractAddress: "0xc0Fa47fAD733524291617F341257A97b79488ecE",
    quizGameContractAddress: "0xdED87fD6213A8f4ea824B8c74128fAf3DE65BFFE",
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

// Legacy exports for backward compatibility (defaults to Mantle Sepolia Testnet)
export const token1ContractAddress = CONTRACT_ADDRESSES[5003].token1ContractAddress;
export const quizGameContractAddress = CONTRACT_ADDRESSES[5003].quizGameContractAddress;

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
      MNT: { price: 1.23, index: 1 },
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

// Mantle-specific learning curriculum and features
export const MANTLE_EDUCATION_CONFIG = {
  // Mantle DeFi Learning Path
  DeFi_CURRICULUM: {
    beginner: {
      title: "Mantle Basics & Wallet Setup",
      description: "Getting started with Mantle network fundamentals",
      quizzes: ["mantle-basics"],
      rewards: "100 TK1 + Beginner Badge",
      duration: "30 minutes"
    },
    intermediate: {
      title: "DeFi Protocols on Mantle", 
      description: "Understanding DeFi opportunities and protocols",
      quizzes: ["defi-mantle", "yield-farming"],
      rewards: "250 TK1 + DeFi Explorer Badge",
      duration: "45 minutes"
    },
    advanced: {
      title: "Building DApps on Mantle",
      description: "Developer-focused content for building on Mantle",
      quizzes: ["dev-tools", "scaling-solutions"],
      rewards: "500 TK1 + Builder Badge",
      duration: "60 minutes"
    },
    expert: {
      title: "Mantle Validator & Node Operations",
      description: "Expert-level infrastructure and validation knowledge",
      quizzes: ["validator-operations"],
      rewards: "1000 TK1 + Expert Validator Badge",
      duration: "90 minutes"
    }
  },

  // Mantle Ecosystem Quests
  ECOSYSTEM_QUESTS: [
    {
      id: "mantle-dex-quest",
      title: "Explore Mantle DEX Landscape",
      description: "Learn about major DEX protocols on Mantle",
      partner: "Multiple DEX Partners",
      rewards: "200 TK1 + DEX Explorer NFT",
      tasks: ["Complete DeFi quiz", "Simulate DEX trade", "Compare protocols"],
      difficulty: "Intermediate"
    },
    {
      id: "yield-optimizer-quest", 
      title: "Yield Optimization Strategies",
      description: "Master yield farming and optimization techniques",
      partner: "Yield Protocol Partners",
      rewards: "300 TK1 + Yield Master Badge",
      tasks: ["Risk assessment quiz", "Strategy simulation", "Portfolio analysis"],
      difficulty: "Advanced"
    },
    {
      id: "cross-chain-bridge-quest",
      title: "Cross-Chain Asset Management", 
      description: "Learn secure bridging and asset management",
      partner: "Bridge Protocol Partners",
      rewards: "250 TK1 + Bridge Expert NFT",
      tasks: ["Bridge mechanics quiz", "Security assessment", "Cost analysis"],
      difficulty: "Intermediate"
    },
    {
      id: "mantle-governance-quest",
      title: "Mantle Network Governance",
      description: "Understanding Mantle's governance mechanisms",
      partner: "Mantle Foundation",
      rewards: "500 TK1 + Governance Participant Badge",
      tasks: ["Governance quiz", "Proposal analysis", "Voting simulation"],
      difficulty: "Advanced"
    }
  ],

  // Learning Achievement System
  ACHIEVEMENTS: {
    badges: {
      "mantle-newcomer": { name: "Mantle Newcomer", requirement: "Complete first Mantle quiz" },
      "defi-explorer": { name: "DeFi Explorer", requirement: "Complete 3 DeFi quizzes" },
      "yield-farmer": { name: "Yield Farmer", requirement: "Complete yield farming quest" },
      "mantle-builder": { name: "Mantle Builder", requirement: "Complete dev tools quiz with 100%" },
      "validator-expert": { name: "Validator Expert", requirement: "Complete validator operations quiz" },
      "ecosystem-champion": { name: "Ecosystem Champion", requirement: "Complete 5 ecosystem quests" }
    },
    nfts: {
      "mantle-genesis": { name: "Mantle Genesis Learner", rarity: "Legendary" },
      "defi-master": { name: "DeFi Protocol Master", rarity: "Epic" },
      "bridge-expert": { name: "Cross-Chain Bridge Expert", rarity: "Rare" }
    }
  },

  // Interactive Features
  INTERACTIVE_FEATURES: [
    "Real-time yield farming simulator",
    "Gas cost calculator for Mantle vs Ethereum",
    "Bridge security assessment tool",
    "DApp deployment simulator",
    "Validator economics calculator"
  ],

  // Partner Integration Opportunities
  PARTNER_INTEGRATIONS: [
    { name: "Mantle DEX Protocols", type: "DeFi", integration: "Quiz sponsorship + rewards" },
    { name: "Yield Optimization Platforms", type: "DeFi", integration: "Educational content + simulations" },
    { name: "Bridge Protocols", type: "Infrastructure", integration: "Security education + assessments" },
    { name: "Developer Tools", type: "Tooling", integration: "Tutorial quests + documentation" },
    { name: "Node Infrastructure", type: "Infrastructure", integration: "Validator education + monitoring" }
  ]
} as const;