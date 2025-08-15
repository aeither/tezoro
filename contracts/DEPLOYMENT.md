
## 🚀 Deployment Commands

### Mantle Sepolia Testnet - Chain ID: 5003
```bash
source .env && rm -rf cache out && forge build && forge script --chain 5003 script/QuizGame.s.sol:QuizGameScript --rpc-url https://rpc.sepolia.mantle.xyz --broadcast -vvvv --private-key ${PRIVATE_KEY}
```

## 🌐 Mantle Sepolia Testnet Network Details

| Parameter | Value |
|-----------|-------|
| **Network Name** | Mantle Sepolia Testnet |
| **Chain ID** | 5003 (0x138B) |
| **RPC Endpoint** | https://rpc.sepolia.mantle.xyz |
| **Archive Node RPC** | https://rpc.sepolia.mantle.xyz |
| **WebSocket Endpoint** | wss://ws.sepolia.mantle.xyz |
| **Currency Symbol** | MNT |
| **Block Explorer URL** | https://explorer.sepolia.mantle.xyz/ |
| **Faucet** | Available through Mantle testnet faucet |

**Note**: This is the official testnet for the Mantle blockchain, providing a stable environment for development and testing.

## 📋 Contract Verification

### Mantle Sepolia Testnet Verification

After deployment, verify your contracts on the Mantle Sepolia Testnet block explorer:

```bash
# Verify QuizGame contract on Mantle Sepolia Testnet
forge verify-contract \
--chain-id 5003 \
--rpc-url https://rpc.sepolia.mantle.xyz \
--verifier-url 'https://explorer.sepolia.mantle.xyz/api/' \
--verifier blockscout \
<CONTRACT_ADDRESS> \
src/QuizGame.sol:QuizGame

# Verify Token1 contract on Mantle Sepolia Testnet
forge verify-contract \
--chain-id 5003 \
--rpc-url https://rpc.sepolia.mantle.xyz \
--verifier-url 'https://explorer.sepolia.mantle.xyz/api/' \
--verifier blockscout \
<TOKEN_CONTRACT_ADDRESS> \
src/QuizGame.sol:Token1
```

## 🔗 Useful Resources

### Mantle Blockchain Resources
- **Mantle Documentation**: https://docs.mantle.xyz/
- **Mantle Sepolia Block Explorer**: https://explorer.sepolia.mantle.xyz/
- **Mantle Sepolia Faucet**: https://faucet.sepolia.mantle.xyz
- **Mantle Official Website**: https://www.mantle.xyz/
- **Mantle GitHub**: https://github.com/mantlenetworkio
