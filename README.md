#  Deadman Vault – WebZero Hackathon Berlin 2025

##  About the Creator

My name is Georgi, and I’m not a developer. This project was created as a learning challenge and a PoC using the documentation available in the docs.Polkadot.com  and the assistance of AI tools like ChatGPT.

---

##  What Is Deadman Vault?

**Deadman Vault** is a decentralized "Dead Man’s Switch" built on the **Paseo testnet**. Its purpose is to securely release encrypted credentials or secrets to a predefined heir in the event that the vault owner is no longer alive or available to check in.

---

##  How It Works – Real Use Case

1. **Vault Creation**:
   - A user "owner" creates a vault by storing an encrypted secret (password, seed phrase).
   - The owner designates a **heir address** who can claim the secret in case of inactivity.

2. **Check-in Mechanism**:
   - The owner must regularly check in (prove they are alive).
   - If they don’t check in for a specified time (e.g. 30 days), the system considers them inactive.

3. **Dead Man's Switch Activation**:
   - A scheduled automation via n8n checks daily if any vaults have expired check-ins.
   - If so, a backend service automatically signs a transaction to release the secret.

4. **Heir Claim**:
   - Once the conditions are met, the heir can view the encrypted secret on-chain and decrypt it using a predefined method.

This system could be applied to inheritance, custody of crypto assets, emergency communication systems, or Web3 estate planning.

---

##  What Was Built – The Proof of Concept

This PoC demonstrates the full lifecycle of the Dead Man’s Switch:

- ✅ A smart contract deployed to **Paseo** 
- ✅ A **React + Vite frontend** to create and interact with vaults
- ✅ A **Node.js backend** that signs contract calls (claimSecret)
- ✅ A **n8n automation** workflow that checks check-in status daily
- ✅ Local testing with Telegram notifications to heirs

---

##  Stack Used

| Layer          | Tech                                    |
|----------------|-----------------------------------------|
| Smart Contract | Solidity + Hardhat + PolkaVM (Paseo)    |
| Frontend       | React + Vite                            |
| Backend        | Node.js + Express + Ethers.js           |
| Automation     | n8n                                     |
| Blockchain     | Polkadot Testnet – Paseo                |
| Notifications  | Telegram Bot API                        |

---

##  Project Structure

```
Deadman-Vault-W3S-Berlin/
├── backend/               # Node.js backend to sign txs
├── contract/              # Solidity contract: DeadmanVault.sol
├── frontend/              # React UI with vault creation & actions
├── n8n/                   # JSON workflow to import into n8n
├── README.md              # This file
└── .gitignore             # Ignore env, node_modules, etc
```

---

##  How to Run It

### 1. Deploy the Contract

Deploy `DeadmanVault.sol` using Hardhat or your preferred tool to **Paseo testnet**.

### 2. Configure the Backend

```bash
cd backend
cp .env.example .env
npm install
npm start
```

Add your private key, RPC URL for Paseo, and contract address in `.env`.

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Import the n8n Workflow

In your local or cloud n8n instance, import `n8n/deadman-vault-n8n.json`.

This automation will:

- Check daily if any vaults are inactive
- Call the backend to trigger `claimSecret(vaultId)`
- Notify the heir via Telegram

---

##  Notes & Improvements

- in real MVP Identity/death verification can be connected to real-world APIs.

---

##  License

MIT License – Feel free to fork, improve, or build on top of it.

---

Thanks to the WebZero Hackathon team, Polkadot, and ChatGPT for making this possible.
