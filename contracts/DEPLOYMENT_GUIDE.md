# 🚀 Smart Contract Deployment Guide

## Quick Deploy to Mantle Testnet

### 1. Setup Environment
```bash
# Create .env file in contracts/ directory
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz" >> .env
```

### 2. Deploy All Demo Contracts
```bash
cd contracts
forge script script/DeployDemoContracts.s.sol \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### 3. Update Frontend Contract Addresses

After deployment, update `src/libs/constants.ts` with the new addresses:

```typescript
const CONTRACT_ADDRESSES = {
  // Mantle Testnet
  5003: {
    token1ContractAddress: "0x...", // From deployment output
    quizGameContractAddress: "0x...", // From deployment output
    quizDuelContractAddress: "0x...", // From deployment output
    guildSystemContractAddress: "0x...", // From deployment output
    quizNFTContractAddress: "0x..." // From deployment output
  }
}
```

### 4. Test Demo
```bash
cd ..
pnpm run dev
# Navigate to http://localhost:5173/demo
```

## Alternative: Manual Deployment

If you prefer to deploy contracts individually:

### Deploy Token Contract
```bash
forge create src/Token1.sol:Token1 \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY
```

### Deploy Quiz Game Contract
```bash
forge create src/QuizGame.sol:QuizGame \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

### Deploy Quiz Duel Contract
```bash
forge create src/QuizDuel.sol:QuizDuel \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

### Deploy Guild System Contract
```bash
forge create src/GuildSystem.sol:GuildSystem \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

### Deploy Quiz NFT Contract
```bash
forge create src/QuizNFT.sol:QuizNFT \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

## Mantle Testnet Info

- **Chain ID**: 5003 (0x45a)
- **RPC URL**: https://rpc.testnet.mantle.xyz
- **Archive RPC**: https://rpcar.test2.btcs.network
- **WebSocket**: wss://rpc.test2.btcs.network/wsp
- **Explorer**: https://explorer.testnet.mantle.xyz/
- **Faucet**: Available on the explorer

## Verification

After deployment, verify contracts on the explorer:
```bash
forge verify-contract <CONTRACT_ADDRESS> src/QuizGame.sol:QuizGame \
  --chain-id 5003 \
  --rpc-url https://rpc.testnet.mantle.xyz \
  --verifier blockscout \
  --verifier-url 'https://explorer.testnet.mantle.xyz/api/' \
  --constructor-args $(cast abi-encode "constructor(address)" <TOKEN_ADDRESS>)
```

---

**Note**: Make sure you have test MNT in your wallet for gas fees before deploying!