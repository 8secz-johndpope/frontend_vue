module.exports = {
    // devServer: {
    //     proxy: {
    //         "/api/*": {
    //             target: "http://localhost:8000/api/"
    //         }
    //     }
    // }
    chainWebpack: config => config.plugins.delete("named-chunks")
};
