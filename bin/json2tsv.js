const inputPromise = new Promise((resolve,reject)=>{
	process.stdin.setEncoding('utf8');

	let inputData = '';

	process.stdin.on('data', (chunk) =>{
		inputData += chunk;
	});

	process.stdin.on('end', ()=>{
		try {
			const parsedData = JSON.parse(inputData);
			resolve(parsedData);
		} catch (error){
			reject(error);
		}
	});
});
(async () => {
	const data = await inputPromise;
	console.log("#回別\t抽せん日\t本数字\tボーナス数字\t1等口数\t1等賞金\t2等口数\t2等賞金\t3等口数\t3等賞金\t4等口数\t4等賞金\t5等口数\t5等賞金\t6等口数\t6等賞金\t販売実績額\tキャリーオーバー");
	const rows = Array.from(data);
	rows.forEach((row)=>{
		const print_str =
		[ row.isuue, row.date, row.numbers, row. bonus, 
			row.prizes[0]?.volume, row.prizes[0]?.money, 
			row.prizes[1]?.volume, row.prizes[1]?.money, 
			row.prizes[2]?.volume, row.prizes[2]?.money, 
			row.prizes[3]?.volume, row.prizes[3]?.money, 
			row.prizes[4]?.volume, row.prizes[4]?.money, 
			row.prizes[5]?.volume, row.prizes[5]?.money, 
			row.sales, row.over
		].map((itm)=>{ return '"' + itm + '"';})
		.join("\t")
		console.log(print_str);
	});
})();
