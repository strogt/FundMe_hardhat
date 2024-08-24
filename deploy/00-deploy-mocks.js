// 基本上和部署脚本一致，主要是模拟合约交互数据，提供本地部署及测试
const { network } = require("hardhat")

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000" // 2000

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // 或者可以使用 developmentChains.includes(network.name) 判断
    if (chainId == 31337) {

        log("Deploying mocks------------------------")
        
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })

        log("Mocks Deployed------------------------")

    }

}

// 增加模块标签，方便命令行部署对应模块
// $ yarn hardhat deploy --tags mocks
module.exports.tags = ["all", "mocks"]
