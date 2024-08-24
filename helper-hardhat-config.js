/*
    配置部署网络使用的数据
*/
const networkConfig = {
    31337: {
        name: "localhost",
    },
    // Price Feed Address: https://docs.chain.link/data-feeds/price-feeds/addresses
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
}

/* 
    开发/本地网络名称数组(用于测试或者部署做环境判断)
    git项目中环境大多数使用chianId直接判断
    developmentChains.includes(network.name) 作为校验判断
*/
const developmentChains = ["hardhat", "localhost"]
// const developmentChaiIds = ["31337"]

module.exports = {
    networkConfig,
    developmentChains,
}