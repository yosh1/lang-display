# Lang display - WIP

GitHubにコミットされたプログラミング言語の拡張を取得し、それに応じてTwitterのプロファイル名を変更するアプリケーションです。

<img src="https://github.com/yoshi1125hisa/lang-display/blob/master/img/lang-display.png?raw=true" width="100%">


## How2Run

### Local

```
$ git clone https://github.com/yoshi1125hisa/lang-display.git or Fork
$ npm install
$ npm run start
```
### Docker

```
$ docker build -t lang-display .
# docker run -it lang-display ash

# express 導入後
# docker run -it -p 3000:3000 lang-display
```


---

## Specification

### Discription
Twitterのプロフィールに「.」を入れて認証すると、GitHubのコミット履歴を参照し、
その言語を拡張子として挿入する。
毎日0:00にcronで定期実行を行う。

`ex) yoshi. => yoshi.txt`

### Exception
- プロフィールの文字列が一定以上になった時
- 文字列末以外の `.` への反応
- コミット数が0の時どうするか？

---

## Flow

1. `/.env` を作成し、API Key等をかいていく
2. `UpdateAccount.js` でそれを読み込む
3. Twitter APIを叩く
4. `UpdateAccount.js` で書いた処理を `src/app.js` で実行する
5. GitHub APIに関してはTwitter APIの実装が終わった後

---

## Develop flow

### Install npm module
```
$ npm init
$ npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/register nodemon
$ npm install --save node-cron axios dotenv twit
```

### Make file and directory
```
$ mkdir dest src src/lib
$ touch .babelrc
```

### Edit `.babelrc`

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

### Edit `package.json`

`dependencies` の上に追記する。

```
"scripts": {
    "start": "nodemon --exec babel-node src/app.js",
    "build": "babel src --out-dir dest",
    "boot": "node dest/app.js"
  },
```

### Add entry point

`package.json` を編集。

```
"main": "dest/app.js",
```

### Add cron sample

`src/app.js`を追加。

```
import cron from "node-cron";

cron.schedule("* * * * * *", () => {
    console.log("Hello World");
});
```

#### Run
```
$ npm run start
```

これで1秒おきに出力できたらOK。


### Make`src/lib/UpdateProfile.js`

ここでTwitter APIを叩く。

```
require("dotenv").config();
import axios from "axios";

module.exports = displayName => {

};
```
