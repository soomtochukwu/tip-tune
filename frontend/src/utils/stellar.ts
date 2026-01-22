import * as StellarSdk from '@stellar/stellar-sdk';
import type { Network } from '../types/wallet';

export const getServer = (network: Network = 'testnet') => {
  switch (network) {
    case 'testnet':
      return StellarSdk.Server.testnet();
    case 'mainnet':
      return StellarSdk.Server.publicNetwork();
    case 'futurenet':
      return new StellarSdk.Server('https://horizon-futurenet.stellar.org');
    case 'local':
      return new StellarSdk.Server('http://localhost:8000');
    default:
      return StellarSdk.Server.testnet();
  }
};

export const getNetworkPassphrase = (network: Network = 'testnet'): string => {
  switch (network) {
    case 'testnet':
      return StellarSdk.Networks.TESTNET;
    case 'mainnet':
      return StellarSdk.Networks.PUBLIC;
    case 'futurenet':
      return StellarSdk.Networks.FUTURENET;
    case 'local':
      return 'Local Network ; 2024';
    default:
      return StellarSdk.Networks.TESTNET;
  }
};

export const isValidStellarAddress = (address: string): boolean => {
  try {
    StellarSdk.Keypair.fromPublicKey(address);
    return true;
  } catch {
    return false;
  }
};

export const formatStellarAmount = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numAmount.toFixed(7);
};

export const truncateAddress = (address: string, startChars = 4, endChars = 4): string => {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const parseBalance = (balance: string): number => {
  return parseFloat(balance);
};

export { StellarSdk };
