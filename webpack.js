var config = {
        context: __dirname + '/src',
        entry: './app.js',
        output: {
            path:  __dirname + '/public',
            filename: 'app.js',
            publicPath: 'public'
        },
        plugins: [],
        module: {
            loaders: [
                { test: /\.js$/, loader: 'ng-annotate!babel',    exclude: /node_modules/ },
                { test: /\.scss$/, loader: 'style!css!sass' },
                { test: /\.jade$/, loader: 'jade' },
                { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000' }
            ]
        }
    };

module.exports = config;
