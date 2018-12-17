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
          "node": true
        }
      }
    ]
  ]
}
```

`Version number` は `node -v` で出てきた値。

## `package.json`

　`dependencies` の上に追記する。

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

## サンプルの追加
`src/app.js`を追加。

```
import cron from "node-cron";

cron.schedule("* * * * * *", () => {
    console.log("Hello World");
});
```

```
$ npm run start
```
これで1秒おきに出力できたらOK。


## `src/lib/UpdateProfile.js`　の作成

ここでTwitter APIを叩く。

```
require("dotenv").config();
import axios from "axios";

module.exports = displayName => {

};
```

# 今後の流れ

1. `/.env` を作成し、API Key等をかいていく
2. `UpdateAccount.js` でそれを読み込む
3. Twitter APIを叩く
4. `UpdateAccount.js` で書いた処理を `src/app.js` で実行する
Other. GitHub APIに関してはTwitter APIの実装が終わった後
