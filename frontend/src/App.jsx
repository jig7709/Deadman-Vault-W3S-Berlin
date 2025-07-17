import { useState, useEffect } from "react";
import { ethers } from "ethers";
import DeadmanVaultABI from "./abi/DeadmanVault.json";

const CONTRACT_ADDRESS = "0x0b21F3db7f78b708003C42BF4f3823edE66962e0"; // Replace with your deployed contract

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");
  const [heirInput, setHeirInput] = useState("");
  const [heir, setHeir] = useState("");
  const [owner, setOwner] = useState("");
  const [timeout, setTimeoutVal] = useState(0);
  const [lastPing, setLastPing] = useState(0);
  const [secret, setSecret] = useState("");

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const prov = new ethers.BrowserProvider(window.ethereum);
        const signer = await prov.getSigner();
        const cont = new ethers.Contract(CONTRACT_ADDRESS, DeadmanVaultABI, signer);

        const acc = await signer.getAddress();
        const owner = await cont.owner();
        const heir = await cont.heir();
        const timeout = await cont.timeout();
        const lastPing = await cont.lastPing();

        setProvider(prov);
        setSigner(signer);
        setContract(cont);
        setAccount(acc);
        setOwner(owner);
        setHeir(heir);
        setTimeoutVal(timeout);
        setLastPing(lastPing);
      }
    }
    init();
  }, []);

  const handlePing = async () => {
    try {
      const tx = await contract.ping();
      await tx.wait();
      setStatus("✅ Ping sent successfully");
    } catch (err) {
      setStatus("❌ Ping failed.");
    }
  };

  const handleClaim = async () => {
    try {
      const res = await contract.getSecret();
      setSecret(res);
      setStatus("🔓 Secret revealed!");
    } catch (err) {
      setStatus("❌ You are not allowed to claim yet or not the heir.");
    }
  };

  const secondsRemaining = Math.max(0, Number(lastPing) + Number(timeout) - Math.floor(Date.now() / 1000));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">🧠 Deadman Vault</h1>
        <p className="text-center">A smart contract for inheritance by inactivity — Hackathon WebZero Berlin 2025 by Georgi.</p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">🔎 Contract Info</h2>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div><strong>Connected Wallet:</strong> {account}</div>
            <div><strong>Owner:</strong> {owner}</div>
            <div><strong>Heir:</strong> {heir}</div>
            <div><strong>Last Ping:</strong> {new Date(lastPing * 1000).toLocaleString()}</div>
            <div><strong>Timeout:</strong> {timeout} seconds</div>
            <div><strong>Time Remaining:</strong> {secondsRemaining} seconds</div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">⚙️ Actions</h2>
          <div className="space-y-2">
            <button
              onClick={handlePing}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
            >Check-in (I'm Alive)</button>
            <button
              onClick={handleClaim}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >Claim Secret</button>
            <div className="mt-2 text-yellow-400">{status}</div>
            {secret && <div className="text-green-300 mt-2">Secret: {secret}</div>}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">🧾 Set Your Heir</h2>
          <input
            type="text"
            placeholder="Enter heir wallet address"
            value={heirInput}
            onChange={(e) => setHeirInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={() => alert("This is hardcoded in the contract and cannot be changed after deployment.")}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          >Submit</button>
          <p className="text-sm text-gray-400">Note: The heir address is set during contract deployment and is immutable.</p>
        </div>
      </div>
    </div>
  );
}
