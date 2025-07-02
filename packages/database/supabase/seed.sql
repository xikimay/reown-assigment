-- Seed data for networks, profiles, accounts, and networks
-- Based on the API response example

-- Insert initial networks (reference data)
INSERT INTO networks (name) VALUES 
  ('Mainnet'),
  ('Base'),
  ('Optimism'),
  ('Polygon'),
  ('Arbitrum'),
  ('BSC'),
  ('Solana'),
  ('Polkadot')
ON CONFLICT (name) DO NOTHING;

-- Insert profiles
INSERT INTO profiles (username, email) VALUES 
  ('Vitalik', 'vitalik@example.com'),
  ('BasedJesse', 'jesse@base.com'),
  ('CryptoWhale', 'whale@crypto.com'),
  ('DeFiMaster', 'defi@master.com'),
  ('NFTCollector', 'nft@collector.com'),
  ('SmartContractDev', 'dev@smartcontract.com'),
  ('BlockchainExplorer', 'explorer@blockchain.com'),
  ('Web3Builder', 'builder@web3.com'),
  ('TokenTrader', 'trader@token.com'),
  ('DAOGovernor', 'governor@dao.com'),
  ('LiquidityProvider', 'lp@defi.com'),
  ('YieldFarmer', 'farmer@yield.com'),
  ('StakingValidator', 'validator@staking.com'),
  ('CrossChainBridge', 'bridge@crosschain.com'),
  ('Layer2Optimizer', 'optimizer@layer2.com'),
  ('ZeroKnowledgePro', 'zk@proof.com'),
  ('MEVHunter', 'mev@hunter.com')
ON CONFLICT (username) DO NOTHING;

-- Insert accounts for Vitalik
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
FROM profiles p WHERE p.username = 'Vitalik'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x0BE724A47f5b44E8068F0c4e899c1C8565bb8eb7'
FROM profiles p WHERE p.username = 'Vitalik'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for BasedJesse
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xbd79942fA098Bb62184CdD3c7B08B312bcd8C55f'
FROM profiles p WHERE p.username = 'BasedJesse'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xb398447e51C621ed7f87C322BF1CAA5f27E48feb'
FROM profiles p WHERE p.username = 'BasedJesse'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for CryptoWhale
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
FROM profiles p WHERE p.username = 'CryptoWhale'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x8ba1f109551bD432803012645Hac136c772c3c7'
FROM profiles p WHERE p.username = 'CryptoWhale'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for DeFiMaster
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x1234567890123456789012345678901234567890'
FROM profiles p WHERE p.username = 'DeFiMaster'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
FROM profiles p WHERE p.username = 'DeFiMaster'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for NFTCollector
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x9876543210987654321098765432109876543210'
FROM profiles p WHERE p.username = 'NFTCollector'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xfedcba9876543210fedcba9876543210fedcba98'
FROM profiles p WHERE p.username = 'NFTCollector'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for SmartContractDev
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x1111111111111111111111111111111111111111'
FROM profiles p WHERE p.username = 'SmartContractDev'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for BlockchainExplorer
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x2222222222222222222222222222222222222222'
FROM profiles p WHERE p.username = 'BlockchainExplorer'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x3333333333333333333333333333333333333333'
FROM profiles p WHERE p.username = 'BlockchainExplorer'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for Web3Builder
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x4444444444444444444444444444444444444444'
FROM profiles p WHERE p.username = 'Web3Builder'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for TokenTrader
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x5555555555555555555555555555555555555555'
FROM profiles p WHERE p.username = 'TokenTrader'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x6666666666666666666666666666666666666666'
FROM profiles p WHERE p.username = 'TokenTrader'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for DAOGovernor
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x7777777777777777777777777777777777777777'
FROM profiles p WHERE p.username = 'DAOGovernor'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for LiquidityProvider
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x8888888888888888888888888888888888888888'
FROM profiles p WHERE p.username = 'LiquidityProvider'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x9999999999999999999999999999999999999999'
FROM profiles p WHERE p.username = 'LiquidityProvider'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for YieldFarmer
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
FROM profiles p WHERE p.username = 'YieldFarmer'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for StakingValidator
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
FROM profiles p WHERE p.username = 'StakingValidator'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xcccccccccccccccccccccccccccccccccccccccc'
FROM profiles p WHERE p.username = 'StakingValidator'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for CrossChainBridge
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xdddddddddddddddddddddddddddddddddddddddd'
FROM profiles p WHERE p.username = 'CrossChainBridge'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for Layer2Optimizer
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
FROM profiles p WHERE p.username = 'Layer2Optimizer'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0xffffffffffffffffffffffffffffffffffffffff'
FROM profiles p WHERE p.username = 'Layer2Optimizer'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for ZeroKnowledgePro
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x1010101010101010101010101010101010101010'
FROM profiles p WHERE p.username = 'ZeroKnowledgePro'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Insert accounts for MEVHunter
INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x2020202020202020202020202020202020202020'
FROM profiles p WHERE p.username = 'MEVHunter'
ON CONFLICT (profile_id, address) DO NOTHING;

INSERT INTO accounts (profile_id, address) 
SELECT p.id, '0x3030303030303030303030303030303030303030'
FROM profiles p WHERE p.username = 'MEVHunter'
ON CONFLICT (profile_id, address) DO NOTHING;

-- Link Vitalik's first account to networks: Mainnet, Base, Optimism
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Base', 'Optimism')
WHERE p.username = 'Vitalik' AND a.address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link Vitalik's second account to networks: Mainnet
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name = 'Mainnet'
WHERE p.username = 'Vitalik' AND a.address = '0x0BE724A47f5b44E8068F0c4e899c1C8565bb8eb7'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link BasedJesse's first account to networks: Base, Mainnet
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Base', 'Mainnet')
WHERE p.username = 'BasedJesse' AND a.address = '0xbd79942fA098Bb62184CdD3c7B08B312bcd8C55f'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link BasedJesse's second account to networks: Mainnet, Optimism
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Optimism')
WHERE p.username = 'BasedJesse' AND a.address = '0xb398447e51C621ed7f87C322BF1CAA5f27E48feb'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link CryptoWhale's accounts to various networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polygon', 'Arbitrum')
WHERE p.username = 'CryptoWhale' AND a.address = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('BSC', 'Solana')
WHERE p.username = 'CryptoWhale' AND a.address = '0x8ba1f109551bD432803012645Hac136c772c3c7'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link DeFiMaster's accounts to DeFi-focused networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Arbitrum', 'Optimism')
WHERE p.username = 'DeFiMaster' AND a.address = '0x1234567890123456789012345678901234567890'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Polygon', 'Base')
WHERE p.username = 'DeFiMaster' AND a.address = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link NFTCollector's accounts to NFT-friendly networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polygon', 'Solana')
WHERE p.username = 'NFTCollector' AND a.address = '0x9876543210987654321098765432109876543210'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Base', 'Optimism')
WHERE p.username = 'NFTCollector' AND a.address = '0xfedcba9876543210fedcba9876543210fedcba98'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link SmartContractDev to development networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Base', 'Optimism', 'Arbitrum')
WHERE p.username = 'SmartContractDev' AND a.address = '0x1111111111111111111111111111111111111111'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link BlockchainExplorer to exploration networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polygon', 'BSC')
WHERE p.username = 'BlockchainExplorer' AND a.address = '0x2222222222222222222222222222222222222222'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Solana', 'Polkadot')
WHERE p.username = 'BlockchainExplorer' AND a.address = '0x3333333333333333333333333333333333333333'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link Web3Builder to building networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Base', 'Optimism', 'Arbitrum')
WHERE p.username = 'Web3Builder' AND a.address = '0x4444444444444444444444444444444444444444'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link TokenTrader to trading networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'BSC', 'Polygon')
WHERE p.username = 'TokenTrader' AND a.address = '0x5555555555555555555555555555555555555555'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Arbitrum', 'Optimism')
WHERE p.username = 'TokenTrader' AND a.address = '0x6666666666666666666666666666666666666666'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link DAOGovernor to governance networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polygon', 'Arbitrum')
WHERE p.username = 'DAOGovernor' AND a.address = '0x7777777777777777777777777777777777777777'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link LiquidityProvider to DeFi networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Arbitrum', 'Optimism')
WHERE p.username = 'LiquidityProvider' AND a.address = '0x8888888888888888888888888888888888888888'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Polygon', 'BSC')
WHERE p.username = 'LiquidityProvider' AND a.address = '0x9999999999999999999999999999999999999999'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link YieldFarmer to yield farming networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Arbitrum', 'Polygon', 'BSC')
WHERE p.username = 'YieldFarmer' AND a.address = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link StakingValidator to staking networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polkadot')
WHERE p.username = 'StakingValidator' AND a.address = '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Solana', 'Polygon')
WHERE p.username = 'StakingValidator' AND a.address = '0xcccccccccccccccccccccccccccccccccccccccc'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link CrossChainBridge to bridge networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polygon', 'Arbitrum', 'Optimism')
WHERE p.username = 'CrossChainBridge' AND a.address = '0xdddddddddddddddddddddddddddddddddddddddd'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link Layer2Optimizer to L2 networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Base', 'Optimism', 'Arbitrum')
WHERE p.username = 'Layer2Optimizer' AND a.address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Polygon', 'Mainnet')
WHERE p.username = 'Layer2Optimizer' AND a.address = '0xffffffffffffffffffffffffffffffffffffffff'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link ZeroKnowledgePro to ZK networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Polygon', 'Arbitrum')
WHERE p.username = 'ZeroKnowledgePro' AND a.address = '0x1010101010101010101010101010101010101010'
ON CONFLICT (account_id, network_id) DO NOTHING;

-- Link MEVHunter to MEV networks
INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Mainnet', 'Arbitrum', 'Optimism')
WHERE p.username = 'MEVHunter' AND a.address = '0x2020202020202020202020202020202020202020'
ON CONFLICT (account_id, network_id) DO NOTHING;

INSERT INTO account_networks (account_id, network_id)
SELECT a.id, n.id
FROM accounts a
JOIN profiles p ON a.profile_id = p.id
JOIN networks n ON n.name IN ('Base', 'Polygon')
WHERE p.username = 'MEVHunter' AND a.address = '0x3030303030303030303030303030303030303030'
ON CONFLICT (account_id, network_id) DO NOTHING; 