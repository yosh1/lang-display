# lang-display

---

# 設定

## Moduleのインストール
```
$ npm init
$ npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/register nodemon
$ npm install --save node-cron axios dotenv

$ mkdir dest src src/lib
$ touch .babelrc
```

## `.babelrc` を編集。

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "{Version number}"
        }
      }
    ]
  ]
}
```

`Version number` は `node -v` で出てきた値。

`package.json` の　`dependencies` 上に追記する。

```
"scripts": {
    "start": "nodemon --exec babel-node src/app.js",
    "build": "babel src --out-dir dest",
    "boot": "node dest/app.js"
  },
```

## エントリポイントの追加

```
"main": "dest/app.js",
```

## `src/main.js`の追加

```
import cron from "node-cron";

cron.schedule("* * * * * *", () => {
    console.log("Hello World");
});
```

```
$ npm run start
```
