const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3004,
  },
  output: {
    crossOriginLoading: 'anonymous',
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [["@babel/preset-react", {"runtime": "automatic"}], "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "sshsource",
      filename: "remoteEntry.js",
      exposes: {
        "./Example": "./src/Example",
      },
      shared:{
        "react": { singleton: true, strictVersion: true, requiredVersion: '17.0.2' },
        "react-dom": { singleton: true, strictVersion: true, requiredVersion: '17.0.2' }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  stats: 'errors-only',
};
