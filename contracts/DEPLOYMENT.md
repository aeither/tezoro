
## 🚀 Deployment Commands

### Etherlink Testnet (Ghostnet) - Chain ID: 128123
```bash
source .env && rm -rf cache out && forge build && forge script --chain 128123 script/QuizGame.s.sol:QuizGameScript --rpc-url https://node.ghostnet.etherlink.com --broadcast -vvvv --private-key ${PRIVATE_KEY}
```

## 🌐 Etherlink Testnet Network Details

| Parameter | Value |
|-----------|-------|
| **Network Name** | Etherlink Testnet |
| **EVM version** | Cancun |
| **RPC Endpoint** | https://node.ghostnet.etherlink.com |
| **Websocket Endpoint** | Not yet publicly available |
| **Relay Endpoint** | https://relay.ghostnet.etherlink.com |
| **Tezos Smart Rollup address** | sr18wx...MLqg |
| **Chain ID** | 128123 |
| **Currency Symbol** | XTZ |
| **Block Explorer URL** | https://testnet.explorer.etherlink.com/ |
| **Wallet Derivation Path** | m/44'/60'/0'/0 |

## 📋 Contract Verification

After deployment, verify your contracts on the Etherlink Testnet block explorer:

```bash
# Verify QuizGame contract
forge verify-contract \
--chain-id 128123 \
--rpc-url https://node.ghostnet.etherlink.com \
--verifier-url 'https://testnet.explorer.etherlink.com/api/' \
--verifier blockscout \
<CONTRACT_ADDRESS> \
src/QuizGame.sol:QuizGame
```

## 🔗 Useful Resources

- **Etherlink Documentation**: https://docs.etherlink.com/
- **Etherlink Faucet**: Get XTZ for testing on Ghostnet
- **Block Explorer**: https://testnet.explorer.etherlink.com/
- **Smart Rollup Snapshots**: https://snapshots.tzinit.org/etherlink-ghostnet/
- **EVM Node Snapshots**: https://snapshotter-sandbox.nomadic-labs.eu/etherlink-ghostnet/
