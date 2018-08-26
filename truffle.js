const fullPathBuildDirectory = `${__dirname}/src/build/contracts`;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: fullPathBuildDirectory,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};