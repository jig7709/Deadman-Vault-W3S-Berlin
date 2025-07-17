# 🧠 Deadman Vault – W3S Berlin

A decentralized Dead Man's Switch built for the Polkadot testnet (Paseo), developed during WebZero Hackathon Berlin.

## 📦 Structure

- `frontend/`: React + Vite UI
- `backend/`: Node.js API to sign & send transactions
- `contract/`: Solidity smart contract (DeadmanVault.sol)
- `n8n/`: JSON workflow for automation logic

## 🚀 How to Use

1. Deploy contract to PolkaVM (Paseo)
2. Run `backend/index.js`
3. Import `n8n/deadman-vault-n8n-importable.json` into your n8n instance
4. Start React app in `frontend/`

MIT License
