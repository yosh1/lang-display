# Lang display

---

# 仕様

## 概要
Twitterのプロフィールに「.」を入れて認証すると、GitHubのコミット履歴を参照し、
その言語を拡張子として挿入する。

`ex) yoshi. => yoshi.txt`

## 例外
- プロフィールの文字列が一定以上になった時
- 文字列末以外の `.` への反応

---

# 開発手順

## Moduleのインストール
```
$ npm init
$ npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/register nodemon
$ npm install --save node-cron axios dotenv
```

## ディレクトリ・ファイルの作成
```
$ mkdir dest src src/lib
$ touch .babelrc
```

## `.babelrc` を編集

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

## `package.json` の編集

`dependencies` の上に追記する。

```
"scripts": {
    "start": "nodemon --exec babel-node src/app.js",
    "build": "babel src --out-dir dest",
    "boot": "node dest/app.js"
  },
```

## エントリポイントの追加

`package.json` を編集。

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
5. GitHub APIに関してはTwitter APIの実装が終わった後

# Run

```
$ npm run start
```