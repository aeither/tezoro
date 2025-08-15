
## 🚀 Deployment Commands

### Mantle Testnet - Chain ID: 5001
```bash
source .env && rm -rf cache out && forge build && forge script --chain 5001 script/QuizGame.s.sol:QuizGameScript --rpc-url https://rpc.testnet.mantle.xyz --broadcast -vvvv --private-key ${PRIVATE_KEY}
```

## 🌐 Mantle Testnet Network Details

| Parameter | Value |
|-----------|-------|
| **Network Name** | Mantle Testnet |
| **Chain ID** | 5001 (0x1389) |
| **RPC Endpoint** | https://rpc.testnet.mantle.xyz |
| **Archive Node RPC** | https://rpc.testnet.mantle.xyz |
| **WebSocket Endpoint** | wss://ws.testnet.mantle.xyz |
| **Currency Symbol** | BIT |
| **Block Explorer URL** | https://explorer.testnet.mantle.xyz/ |
| **Faucet** | Available through Mantle testnet faucet |

**Note**: This is the official testnet for the Mantle blockchain, providing a stable environment for development and testing.

## 📋 Contract Verification

### Mantle Testnet Verification

After deployment, verify your contracts on the Mantle Testnet block explorer:

```bash
# Verify QuizGame contract on Mantle Testnet
forge verify-contract \
--chain-id 5001 \
--rpc-url https://rpc.testnet.mantle.xyz \
--verifier-url 'https://explorer.testnet.mantle.xyz/api/' \
--verifier blockscout \
<CONTRACT_ADDRESS> \
src/QuizGame.sol:QuizGame

# Verify Token1 contract on Mantle Testnet
forge verify-contract \
--chain-id 5001 \
--rpc-url https://rpc.testnet.mantle.xyz \
--verifier-url 'https://explorer.testnet.mantle.xyz/api/' \
--verifier blockscout \
<TOKEN_CONTRACT_ADDRESS> \
src/QuizGame.sol:Token1
```

## 🔗 Useful Resources

### Mantle Blockchain Resources
- **Mantle Documentation**: https://docs.mantle.xyz/
- **Mantle Testnet Block Explorer**: https://explorer.testnet.mantle.xyz/
- **Mantle Testnet Faucet**: https://faucet.testnet.mantle.xyz
- **Mantle Official Website**: https://www.mantle.xyz/
- **Mantle GitHub**: https://github.com/mantlenetworkio
