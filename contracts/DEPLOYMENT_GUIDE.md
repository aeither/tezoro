# 🚀 Smart Contract Deployment Guide

## Quick Deploy to Etherlink Testnet

### 1. Setup Environment
```bash
# Create .env file in contracts/ directory
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "ETHERLINK_RPC_URL=https://node.ghostnet.etherlink.com" >> .env
```

### 2. Deploy All Demo Contracts
```bash
cd contracts
forge script script/DeployDemoContracts.s.sol \
  --rpc-url $ETHERLINK_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### 3. Update Frontend Contract Addresses

After deployment, update `src/libs/constants.ts` with the new addresses:

```typescript
const CONTRACT_ADDRESSES = {
  // Etherlink Testnet
  128123: {
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
  --rpc-url $ETHERLINK_RPC_URL \
  --private-key $PRIVATE_KEY
```

### Deploy Quiz Game Contract
```bash
forge create src/QuizGame.sol:QuizGame \
  --rpc-url $ETHERLINK_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

### Deploy Quiz Duel Contract
```bash
forge create src/QuizDuel.sol:QuizDuel \
  --rpc-url $ETHERLINK_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

### Deploy Guild System Contract
```bash
forge create src/GuildSystem.sol:GuildSystem \
  --rpc-url $ETHERLINK_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

### Deploy Quiz NFT Contract
```bash
forge create src/QuizNFT.sol:QuizNFT \
  --rpc-url $ETHERLINK_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args <TOKEN_ADDRESS>
```

## Etherlink Testnet Info

- **Chain ID**: 128123
- **RPC URL**: https://node.ghostnet.etherlink.com
- **Explorer**: https://testnet.explorer.etherlink.com
- **Faucet**: Get test XTZ from Tezos faucet, then bridge to Etherlink

## Verification

After deployment, verify contracts on the explorer:
```bash
forge verify-contract <CONTRACT_ADDRESS> src/QuizGame.sol:QuizGame \
  --chain-id 128123 \
  --constructor-args $(cast abi-encode "constructor(address)" <TOKEN_ADDRESS>)
```

---

**Note**: Make sure you have test XTZ in your wallet for gas fees before deploying!