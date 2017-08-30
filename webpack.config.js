// webpack.config.js
const path = require('path');
const webpack = require('webpack');

const _ = require('lodash');

// const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//const LessAutoprefixer = require('less-plugin-autoprefix');
// const BundleAnalyzerPlugin = require(
//   'webpack-bundle-analyzer'
// ).BundleAnalyzerPlugin;

const autoprefixerStylus = require('autoprefixer-stylus');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// const pkg = require('./package.json');

const I18nPlugin = require('i18n-webpack-plugin');

const languages = {
  en_CA: require('./src/i18n/en_CA.json'),
  // fr_CA: require('./src/i18n/fr_CA.json'),
};

const BasePath = '.';

//
module.exports = Object.keys(languages).map(function(language) {
  const devPlugins =
    process.env.NODE_ENV === 'production'
      ? []
      : [
          // new BundleAnalyzerPlugin(),
        ];

  const prodPlugins =
    process.env.NODE_ENV === 'production'
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              unused: true,
              dead_code: true,
              warnings: true,
              drop_debugger: true,
            },
          }),
        ]
      : [];

  const pages = _.map(
    [
      {
        title: 'City of Women',
        filename: `${BasePath}/index.html`,
        description: 'This is the description',
        image: 'image.png',
        chunks: 'app',
      },
    ],
    obj => {
      const { title, filename, description, image, chunks } = obj;
      return new HtmlWebpackPlugin({
        title,
        filename,
        description,
        image,
        template: `./src/html/index_${language}.pug`,
        inject: 'body',
        chunksSortMode: function(a, b) {
          if (a.names[0] > b.names[0]) {
            return 1;
          }
          if (a.names[0] < b.names[0]) {
            return -1;
          }
          return 0;
        },
        chunks: _.concat(['_polyfill', 'main'], chunks),
        exclude: ['tests'],
        minify:
          process.env.NODE_ENV === 'production'
            ? {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
              }
            : {
                collapseBooleanAttributes: false,
                collapseInlineTagWhitespace: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
              },
        hash: false,
      });
    }
  );

  return {
    //
    name: language,

    entry: {
      _polyfill: ['babel-polyfill'],
      main: ['react', 'react-dom'],
      app: './src/index.jsx',
    },

    //
    devtool:
      process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

    //
    resolve: {
      alias: _.assign(
        {
          components: 'components',
          containers: 'containers',
          pages: 'pages',
          redux: 'redux',
          reducers: 'redux/reducers',
          actions: 'redux/actions',
          modals: 'modals',
          routers: 'routers',
          libs: 'libs',
          images: 'images',
        },
        process.env.NODE_ENV === 'production'
          ? {
              // react: 'react-lite',
              // 'react-dom': 'react-lite',
            }
          : {}
      ),
      modules: ['node_modules', '.storybook', 'src/styles', 'src'],
      extensions: ['*', '.js', '.jsx', '.json'],
    },

    //
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                quiet: false,
                failOnError: true,
                failOnWarning: true,
                emitError: true,
                emitWarning: true,
              },
            },
          ],
          exclude: /node_modules/,
          enforce: 'pre',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        /*{
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                strictMath: true,
                plugins: [
                  new LessAutoprefixer({
                    // Browser settings based on cssnext: http://cssnext.io/usage/#browsers
                    browsers: [
                      '> 1%',
                      'last 2 versions',
                      'Firefox ESR',
                      'Opera 12.1',
                    ],
                  }),
                ],
              },
            },
          ],
          include: [
            path.resolve(process.cwd(), 'src'),
            path.join(process.cwd(), 'node_modules'),
          ],
        },*/
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'stylus-loader',
              options: {
                use: [
                  autoprefixerStylus({
                    // Browser settings based on cssnext: http://cssnext.io/usage/#browsers
                    browsers: [
                      '> 1%',
                      'last 2 versions',
                      'Firefox ESR',
                      'Opera 12.1',
                    ],
                  }),
                ],
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
            },
          ],
        },
        {
          test: /\.json$/,
          use: [
            {
              loader: 'json-loader',
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          include: [path.resolve(process.cwd(), 'src')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', { modules: false }], 'react'],
                env: {
                  test: {
                    plugins: ['transform-es2015-modules-commonjs'],
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: `url-loader?limit=25000&name=${BasePath}/images/[name].[ext]`,
            },
          ],
        },
        {
          test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: `url-loader?limit=10000&mimetype=application/font-woff&name=${BasePath}/fonts/[name].[ext]`,
            },
          ],
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: `url-loader?limit=10000&mimetype=application/octet-stream&name=${BasePath}/fonts/[name].[ext]`,
            },
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: `file-loader?name=${BasePath}/fonts/[name].[ext]`,
            },
          ],
        },
        {
          test: /\/fonts\/.*\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: `url-loader?limit=10000&mimetype=image/svg+xml&name=${BasePath}/fonts/[name].[ext]`,
            },
          ],
        },
        {
          test: /\/images\/.*\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: `url-loader?limit=10000&mimetype=image/svg+xml&name=${BasePath}/images/[name].[ext]`,
            },
          ],
        },
      ],
    },
    //
    plugins: [
      // Avoid publishing files when compilation failed:
      // new webpack.NoErrorsPlugin(),

      // Aggressively remove duplicate modules:
      // new webpack.optimize.DedupePlugin(),

      new FaviconsWebpackPlugin({
        logo: './src/icons/favicon.png',
        prefix: 'icons-[hash]/',
        title: 'OneMethod',
      }),

      new CopyWebpackPlugin([
        {
          from: 'static/',
          to: '',
        },
      ]),

      //
      new CleanWebpackPlugin(['dist'], {
        root: process.cwd(),
      }),

      //
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        filename: `${BasePath}/js/[name].[hash].js`,
        minChunks: 2,
        children: true,
      }),

      //
      // new ExtractTextPlugin(`/css/[name].[hash].css`, {
      //   allChunks: true,
      // }),

      //
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          LANGUAGE: JSON.stringify(process.env.LANGUAGE),
          WEBSITE_DOMAIN_NAME: JSON.stringify(''),
        },
      }),

      new I18nPlugin(languages[language], { nested: true }),

      new webpack.LoaderOptionsPlugin({
        debug: process.env.NODE_ENV === 'production' ? false : true,
      }),

      ...pages,

      ...devPlugins,

      ...prodPlugins,
    ],

    devServer: {
      port: 8080,
      historyApiFallback: {
        index: '/index.html',
        rewrites: [{ from: /^\/$/, to: '/index.html' }],
      },
    },

    //
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: `${BasePath}/js/[name].[hash].js`,
      chunkFilename: `${BasePath}/js/[name].[hash].js`,
    },

    // Pretty terminal output
    stats: {
      colors: true,
    },
  };
});
