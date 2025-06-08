import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { WagmiConfig } from 'wagmi';

const projectId = '41a4762b14be30174b4529ad7cf3698a'; // Получи бесплатно на https://cloud.walletconnect.com/

const chains = [mainnet, sepolia];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
export { Web3Modal, WagmiConfig };