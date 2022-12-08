export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  etherscan_api_key: process.env.ETHERSCAN_API_KEY,
});
