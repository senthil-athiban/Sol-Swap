import { Token } from "@/types/tokens";
import { Connection, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";

export const getAccountBalance = async (
  publicKey: PublicKey,
  connection: Connection,
  token: Token
) => {
  if (!publicKey) {
    toast.error("Wallet not connected");
    return;
  }

  if (token.symbol !== "SOL") {
    toast.error("Wrong Input Token");
    return;
  }

  try {
    const res = await connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: new PublicKey(token.address),
    });  
  } catch (error) {
    console.log("Error in retrieving user's balance", error);
    toast.error("Error in retrieving your token balance");
  }
  
  
};

export const fetchTokenInfo = async () => {
  try {
    const response = await fetch(`https://tokens.jup.ag/token/So11111111111111111111111111111111111111112`);
    if (!response.ok) {
      toast.error("Failed to fetch the sol token information");
      throw new Error("Failed to fetch token information");
    }
    const tokenInfo = await response.json();
    return tokenInfo;
  } catch (error) {
    console.error("Error fetching token information:", error);
    throw error;
  }
};

export const fetchQuote = async (inputToken: Token, selectedToken: Token, amount: string, slippage: string) => {
  try {
    const quote = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputToken?.address}&outputMint=${selectedToken?.address ?? 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'}&amount=${parseInt(amount, 10) * 1000000000}&slippageBps=${slippage}&&platformFeeBps=20`
    );

    const response = await quote.json();
    console.log("response:", response);

    const { outAmount, otherAmountThreshold, routePlan, platformFee, priceImpactPct } = response;

    const outamount = parseInt(outAmount, 10) / Math.pow(10, selectedToken?.decimals);
    const minimumRequired = parseInt(otherAmountThreshold, 10) / Math.pow(10, selectedToken?.decimals);
    const fee = parseInt(platformFee.amount) / Math.pow(10, selectedToken?.decimals);

    const routes = routePlan?.flatMap((item: any) => {
      return { name: item?.swapInfo?.label, percentage: item.percent };
    });

    return {
      outamount,
      minimumRequired,
      fee,
      routes,
      priceImpactPct,
    };
  } catch (error) {
    console.log("Error in fetching quote:", error);
    toast.error('Error in fetching the quote');
    throw error;
  }
};
