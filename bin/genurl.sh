#!/bin/sh
MIZUHO_LOT_URL='https://www.mizuhobank.co.jp/takarakuji/check/loto/loto@-lotsort-@/index.html'
TABLE_EMIT='bin/table_emit.js'
num_params=$#
usage() {
    echo "Usage: $0 [lotsort] [year] [month]" 1>&2
    echo "  lotsort: 必須 6 or 7"
    echo "  year: 取得年"
    echo "  month: 取得月"
    echo "  year以降を省略したときは最新を取得する "
    exit 1
}
lot_sort=
if [ "$num_params" -lt 1 ]; then
	echo "エラー：引数が少なすぎる"
	usage
fi
lot_sort=$1
data_url=$(echo "$MIZUHO_LOT_URL" | sed "s/@-lotsort-@/$lot_sort/g")

target_year=
target_month= 
if [ "$num_params" -ge 3 ]; then
	target_year=$2
	target_month=$3 
	data_url=$(echo "$data_url" | sed "s/\$/?year=$target_year\&month=$target_month/g")
fi
echo $data_url 

