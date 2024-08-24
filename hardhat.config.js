require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")


const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
  /* 
    solidity: "0.8.8", 默认写法
    solidity: { 兼容其他交互合约版本写法
      compilers: [
          {
              version: "0.8.7",
          },
          {
              version: "0.6.6",
          },
      ],
    },
  */
  solidity: {
    compilers: [
        {
            version: "0.8.8",
        },
        {
            version: "0.6.6",
        },
    ],
  },
  // 网络设置
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
        chainId: 31337,
        // gasPrice: 130000000000,
    },
    sepolia: {
        url: SEPOLIA_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 11155111,
        blockConfirmations: 6,
    },
  },
  // 部署账户获取规则（详情参见01-deploy获取代码）
  namedAccounts: {
    deployer: {
        default: 0, 
        1: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [], // 如果验证函数TypeError: customChains is not iterable 怎么打开,否则注释
  },
  mocha: { // 解决报错超时：ConnectTimeoutError: Connect Timeout Error
    timeOut: 3000000,
  },
};
