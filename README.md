# lot67hdf
Japanese Lot 6,7 history data fetcher

# requirements
nodejs とpuppeteerが必要

# this project contains 3 codes
1. bin/genurl.sh  
情報を取得するＵＲＬを生成する。
例)   
* #ロト６の最新データを取得するＵＲＬを印刷する *
```
sh bin/genurl.sh 6
```
* #ロト７の2024年8月のデータを取得するＵＲＬを印刷する *
```
sh bin/genurl.sh 7 2024 08
```

2. bin/table2json.js
サイトから取得したデータをjsonで出力する
例）
* # ロト７の最新データのＵＲＬから取得したデータをjson形式で印刷する *
  
```
node bin/table2json.js $(bin/genurl.sh 7)
```

3. bin/json2tsv.js
json形式のデータをtsvで出力する
```
node bin/table2json.js $(bin/genurl.sh 7 2024 07) | node bin/json2tsv.js
```
