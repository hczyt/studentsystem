module.exports = {
    devServer: {
        host: "localhost", 
        port: '8082',
        https: false,
        hotOnly: false, 
        proxy: {
            '/api': {
                target: 'localhost:3001', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}
