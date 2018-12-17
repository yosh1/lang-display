# lang-display

---

# Setup

```
$ npm init
$ npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/register nodemon
$ npm install --save node-cron axios dotenv

$ mkdir dest src src/lib
$ touch .babelrc
```

Edit `.babelrc`

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

`Version number` is `node -v` 's number
