/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Token } from "@/types/tokens";

type TokenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tokens: Array<Token>;
  handleSearch: (input: string) => void;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | null>>;
};

const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  tokens,
  handleSearch,
  setSelectedToken
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 w-full backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 text-white shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select a token</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by token or paste address"
            className="w-full bg-gray-700 text-gray-300 rounded-lg p-3 pl-10 outline-none placeholder-gray-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.35 13.65z"
            />
          </svg>
        </div>

        {/* Popular Tokens */}
        <div className="flex space-x-2 mb-4 flex-col border-b border-gray-600">
          <div>
            <h2 className="p-2 text-sm mb-2">Popular tokens</h2>
          </div>
          <div className="grid grid-cols-4 gap-x-2 mb-4">
            {tokens.slice(0, 4).map((token: Token) => (
              <button
                key={token.address}
                className="bg-gray-700 text-gray-300 p-2 rounded-lg hover:bg-gray-600 flex items-center"
                onClick={() => setSelectedToken(token)}
              >
                <img
                  src={token.logoURI}
                  width={24}
                  height={16}
                  alt="logo"
                  className="rounded-full mr-2"
                />
                <p className="text-sm">{token.symbol}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Token List */}

        <div className="overflow-y-auto max-h-60">
          <div className="flex justify-between">
            <h2 className="p-2 text-sm">Token</h2>
            <h2 className="p-2 text-sm">Address</h2>
          </div>
          {tokens.map((token: Token) => (
            <div
              key={token.address}
              className="flex items-center justify-between py-4 hover:bg-gray-700 px-2 rounded-lg cursor-pointer border-b border-gray-700"
              onClick={() => setSelectedToken(token)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={token.logoURI}
                  width={30}
                  height={30}
                  alt="logo"
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-gray-500">{token.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-300">{0}</div>
                <div className="text-gray-500 text-xs">{`${token.address.substring(
                  0,
                  5
                )}.....${token.address.substring(
                  token.address.length - 5
                )}`}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Token List Footer */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          {`Can't find the token you're looking for? Try entering the mint address`}
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
