const puppeteer = require('puppeteer');
const args = process.argv;

if (args.length < 3){
	console.error("URLを指定してください")
	process.exit(1)
}
const url=args[2];
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
        const tables = Array.from(document.querySelectorAll('div.pc-only table')); // すべてのtableタグを取得
	return tables.map((tbl)=>{
		const ret = {issue:"",date:"",numbers:"",bonus:"",prizes:[],sales:"",over:""};
		const kaibetsu = tbl.querySelector("th.js-lottery-issue-pc");
		if (kaibetsu){
			ret.issue=kaibetsu.innerText;
		}
              	const date = tbl.querySelector("p.js-lottery-date-pc");
		if (date){
			ret.date=date.innerText.replace(/年|月/g,"-").replace("日","")
		}
		const numbers = Array.from(tbl.querySelectorAll('b.js-lottery-number-pc')).map(
			(numelm) =>{
				return numelm.innerText.replace(/[^0-9]/g,"");
			}
		).join(",")
		ret.numbers = numbers;
		const bonus = Array.from(tbl.querySelectorAll('tbody tr:nth-child(4) td')).map(
			(numelm) =>{
				return numelm.innerText.replace(/[^0-9]/g,"");
			}
		).filter((t)=>{return (t.length>0);}).join(",");

		ret.bonus= bonus;
		const prizes = Array.from(tbl.querySelectorAll('tr.js-lottery-prize-pc')).map(
			(elm) =>{
				const prize={volume: "", money:""}
				const vals=Array.from(elm.querySelectorAll('td')).map(
					(elm2)=>{return elm2.innerText.replace(/[^0-9]/g,"")}
				);
				prize.volume = vals[0].length==0?"0":vals[0];
				prize.money = vals[1].length==0?"0":vals[1];
				return prize;
			}
		);
		ret.prizes = prizes;
              	const sales = tbl.querySelector("p.js-lottery-sum-pc");
		if (sales){
			ret.sales=sales.innerText.replace(/[^0-9]/g,"");
		}
              	const over = tbl.querySelector("b.js-lottery-over-pc");
		if (over){
			ret.over=over.innerText.replace(/[^0-9]/g,"");
		}
		return ret
	});
        //return tables.map(table => table.outerHTML); // 各テーブルのHTMLを配列で返す
    });
	    // すべてのテーブル要素のHTMLを出力
    console.log(JSON.stringify(data));
    await browser.close();
})();

