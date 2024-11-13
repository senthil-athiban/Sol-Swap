"use client";
import { ChevronDown, Settings, Settings2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import TokenModal from "./TokenModal";
import { Token } from "@/types/tokens";
import SlippageModal from "./SlippageModal";

const SwapCard = () => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showSlippageModal, setShowSlippageModal] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [inputAmount, setInputAmount] = useState("0");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [slippage, setSlippage] = useState("50");
  console.log(' tokens : ', tokens);
  const getTokens = async () => {
    const res = await fetch("https://tokens.jup.ag/tokens?tags=verified");
    const body = await res.json();
    setTokens(body);
    setFilteredTokens(body);
  };

  const handleCloseModal = () => setShowTokenModal(false);

  const handleSearch = (input: string) => {
    const filtered = tokens.filter(
      (token: Token) =>
        token.name.toLowerCase().includes(input.toLowerCase()) ||
        token.symbol.toLowerCase().includes(input.toLowerCase()) ||
        token.address.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredTokens(filtered);
  };

  const calculateExchangeAmount = async (amount: string) => {
    const quote = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${parseInt(amount, 10) * 1000000000}&slippageBps=${slippage}`
    );

    const response = await quote.json();
    console.log(' response : ', response);
    const outamount = parseInt(response.outAmount) / 1e6;
    alert(outamount + "USDC");
    


  }
  useEffect(() => {
    getTokens();
  }, []);

  useEffect(() => {
    if(inputAmount){
      calculateExchangeAmount(inputAmount);
    }
  },[inputAmount])

  return (
    <div className="w-full max-w-md p-6 bg-blue-900 rounded-3xl flex flex-col shadow-lg">
      <div className="flex justify-between mb-2">
        <h2 className="text-white text-lg">Buy</h2>
        <button
          className="flex border rounded-3xl w-24 justify-center items-center text-white"
          onClick={() => setShowSlippageModal(true)}
        >
          <Settings2 size={15} color="white" className="mr-2" />
          <p>0.5%</p>
        </button>
      </div>
      <div className="rounded-lg bg-blue-700">
        <div className="flex justify-between items-center p-2 rounded-lg px-4">
          <h2 className="text-white font-semibold">From</h2>
          <h2 className="text-white font-semibold">0 SOL</h2>
        </div>
        <div className="bg-gray-900 p-4 h-16 rounded-lg flex justify-between items-center gap-x-2">
          <div className="h-8 w-28 p-2 bg-blue-500 rounded-lg shadow-lg flex items-center text-white gap-x-2">
            <img
              src={
                "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
              }
              width={24}
              height={24}
              alt="logo"
              className="rounded-full"
            />
            <h2 className="text-sm font-semibold">SOL</h2>
            <ChevronDown />
          </div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Enter amount"
              className="bg-transparent text-white w-full outline-none"
              onChange={(e) => setInputAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center -translate-y-2 z-10">
        <div className="bg-blue-500 text-white rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="bg-blue-700 rounded-lg -translate-y-4">
        <div className="flex justify-between items-center p-2 rounded-lg px-4">
          <h2 className="text-white font-semibold">To</h2>
          <h2 className="text-white font-semibold">0 USDC</h2>
        </div>
        <div className="bg-gray-900 p-4 h-16 rounded-lg flex justify-between items-center gap-x-2">
          <div
            className="h-8 w-28 p-2 bg-blue-500 rounded-lg shadow-lg flex items-center text-white gap-x-2 cursor-pointer"
            onClick={() => setShowTokenModal(true)}
          >
            <img
              src={
                "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
              }
              width={24}
              height={24}
              alt="logo"
              className="rounded-full"
            />
            <h2 className="text-sm font-semibold">USDC</h2>
            <ChevronDown />
          </div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Enter amount"
              className="bg-transparent text-white w-full max-w-md outline-none"
            />
          </div>
        </div>
      </div>
      <button className="w-full bg-blue-400 hover:bg-blue-600 font-semibold py-2 rounded-lg transition duration-300 text-black">
        Swap
      </button>
      {showTokenModal && (
        <TokenModal
          isOpen={showTokenModal}
          onClose={handleCloseModal}
          tokens={filteredTokens}
          handleSearch={handleSearch}
          setSelectedToken={setSelectedToken}
        />
      )}
      {showSlippageModal && (
        <SlippageModal
          onClose={() => setShowSlippageModal(false)}
          setSlippage={setSlippage}
        />
      )}
    </div>
  );
};

export default SwapCard;
