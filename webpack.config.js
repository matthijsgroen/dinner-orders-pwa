const path = require("path");

const babel = require("./config/babel");
const uglify = require("./config/uglify");

//** constants **//

const env = process.env.NODE_ENV || "development";
const isProd = env === "production";
const out = path.join(__dirname, "./dist");
const exclude = /(node_modules|bower_components)/;

//** webpack plugins **//

const webpack = require("webpack");
const OfflinePlugin = require("offline-plugin");
const Clean = require("clean-webpack-plugin");
const Copy = require("copy-webpack-plugin");
const HTML = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const ExtractText = require("extract-text-webpack-plugin");
const extractShellCss = new ExtractText("shell.[hash].css");
const extractOtherCss = new ExtractText("styles.[hash].css");

const plugins = [
  new Dotenv({ systemvars: true }),
  new Clean(["dist"]),
  new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
  new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(env) }),
  new HTML({
    template: "src/index.html",
    inject: false,
    minify: isProd
      ? {
          removeComments: true,
          collapseWhitespace: true
        }
      : false
  }),
  new HTML({
    template: "src/static/manifest.json",
    filename: "manifest.json",
    minify: false,
    inject: false
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        require("autoprefixer")({
          browsers: [
            "last 3 Chrome versions",
            "last 3 iOS versions",
            "last 3 Edge versions"
          ]
        })
      ]
    }
  }),
  extractShellCss,
  extractOtherCss
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.UglifyJsPlugin(uglify),
    new OfflinePlugin({
      autoUpdate: true,
      relativePaths: true,
      rewrites: { "/": "/index.html" },
      ServiceWorker: {
        output: "service-worker.js",
        navigateFallback: "index.html",
        events: true
      },
      AppCache: {
        events: true
      }
    })
  );

  babel.presets.push("babili");
} else {
  // dev only
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: ["preact"]
  },
  output: {
    path: out,
    filename: "[name].[hash].js",
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: exclude,
        loader: "babel-loader",
        options: babel
      },
      {
        test: /\.scss$/,
        loader: isProd
          ? extractOtherCss.extract({
              use: "css-loader?modules!postcss-loader!sass-loader"
            })
          : "style-loader!css-loader?modules!postcss-loader!sass-loader",
        exclude: /shell.scss/
      },
      {
        test: /shell.scss$/,
        loader: isProd
          ? extractShellCss.extract({
              use: "css-loader!postcss-loader!sass-loader"
            })
          : "style-loader!css-loader!postcss-loader!sass-loader"
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  },
  plugins: plugins,
  devtool: isProd ? "source-map" : "eval",
  devServer: {
    publicPath: "/",
    contentBase: out,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    compress: isProd,
    inline: !isProd,
    hot: !isProd
  }
};
