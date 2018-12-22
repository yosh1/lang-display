# Lang display

It is a CLI application that obtains the extension of the programming language committed to GitHub and changes Twitter's profile name accordingly.

GitHubにコミットされたプログラミング言語の拡張を取得し、それに応じてTwitterのプロファイル名を変更するCLIアプリケーションです。

<img src="https://github.com/yoshi1125hisa/lang-display/blob/master/img/lang-display.png?raw=true" width="100%">


## Run - 実行方法

```
$ git clone https://github.com/yoshi1125hisa/lang-display.git or Fork
$ npm install
$ npm run start
```

---

## Specification　- 仕様

### Discription - 概要
Twitterのプロフィールに「.」を入れて認証すると、GitHubのコミット履歴を参照し、
その言語を拡張子として挿入する。
毎日0:00にcronで定期実行を行う。

`ex) yoshi. => yoshi.txt`

### Exception　- 例外
- プロフィールの文字列が一定以上になった時
- 文字列末以外の `.` への反応
- コミット数が0の時どうするか？

---

## Flow - 流れ

1. `/.env` を作成し、API Key等をかいていく
2. `UpdateAccount.js` でそれを読み込む
3. Twitter APIを叩く
4. `UpdateAccount.js` で書いた処理を `src/app.js` で実行する
5. GitHub APIに関してはTwitter APIの実装が終わった後

---

## Develop flow - 開発手順

### Install npm module - npm moduleのインストール
```
$ npm init
$ npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/register nodemon
$ npm install --save node-cron axios dotenv twit
```

### Make file and directory - ディレクトリ・ファイルの作成
```
$ mkdir dest src src/lib
$ touch .babelrc
```

### Edit `.babelrc` - `.babelrc` を編集

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

### Edit `package.json` - `package.json` の編集

`dependencies` の上に追記する。

```
"scripts": {
    "start": "nodemon --exec babel-node src/app.js",
    "build": "babel src --out-dir dest",
    "boot": "node dest/app.js"
  },
```

### Add entry point - エントリポイントの追加

`package.json` を編集。

```
"main": "dest/app.js",
```

### Add cron sample - cronのサンプルを追加

`src/app.js`を追加。

```
import cron from "node-cron";

cron.schedule("* * * * * *", () => {
    console.log("Hello World");
});
```

#### Run - 実行
```
$ npm run start
```

If you can execute this script and output it every 1 second OK.
これで1秒おきに出力できたらOK。


### Make`src/lib/UpdateProfile.js` - `src/lib/UpdateProfile.js`　の作成

Use the Twitter API.

ここでTwitter APIを叩く。

```
require("dotenv").config();
import axios from "axios";

module.exports = displayName => {

};
```
