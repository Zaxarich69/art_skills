// src/lib/wallets.js
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, avalanche, polygon, bsc, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, avalanche, polygon, bsc, arbitrum], // top EVM networks added!
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'SkillConnect',
  projectId: '41a4762b14be30174b4529ad7cf3698a', // your WalletConnect projectId
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  chains,
});
