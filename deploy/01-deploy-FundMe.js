/* 
    yarn hardhat deploy 默认按顺序执行文件下的脚本，脚本以模块导出
    deploy 匿名函数第一个参数会传入依赖her
    const { getNamedAccounts, deployments } = require("her")
*/

const { network } = require("hardhat")
const { developmentChains,networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports =async ({ getNamedAccounts, deployments })=>{
    // deploy: 部署方法  log: 打印方法
    const { deploy, log } = deployments
    log("deploying FundMe -----------------------")

    /*
        获取部署账户
        从hardhat.config.js配置文件中的networks中的accounts中获取，namedAccounts配置规则
        namedAccounts: {
            deployer: {
                default: 0, // 默认获取账户
                1: 0, // chainId: 默认获取账户
            },
            usertest1:{},
            usertest2:{},
        },
     */
    const { deployer } = await getNamedAccounts()
    // 获取chainId: 作为配置化使用网络标识
    const chainId = network.config.chainId
    /* 
        使用本地环境时，使用mocks数据
        mocks数据一般为00-deploy-mocks.js
        如果存在mocks数据是，本地部署要先运行mocks数据
    */
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    

    // 合约部署
    const fundMe =await deploy( "FundMe", {
        from: deployer, // 部署账户
        args: [ethUsdPriceFeedAddress], // 合约构造函数入参
        log: true, // 使用制定log函数日志类似log代替console.log
        waitConfirmations: network.config.blockConfirmations || 1, // 等到多少个区块后验证
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        // 验证
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
    
    log("FundMe Deployed--------------------------------")
} 

// $ yarn hardhat deploy --tags fundme
module.exports.tags = ["all", "fundme"]


/* 
    sepolia部署问题
    交易哈希：tx: 0x1baf1787b63f239ff2e47e051fb170c75fe2de52c87ba5249fdd4515f88400af
    地址合约：0x411C3Bb05f4627a7b0c6f6F7211ae1Cf0fd5DD6e
    验证错误：Error: connect ECONNREFUSED（1、可能是被国外服务器拒绝本土 2、也有可能服务器的问题的）
*/