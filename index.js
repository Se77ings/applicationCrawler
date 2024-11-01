const puppeteer = require("puppeteer");

puppeteer
	.launch({
		headless: false,
		defaultViewport: false,
	})
	.then(async (browser) => {
		const page = await browser.newPage();

		await page.setViewport({ width: 1200, height: 800 });

		const dorkQuery = 'site:https://jobs.lever.co "React Developer" "remote" -"remote only in the US"';

		await page.goto(`https://www.google.com`);
		await page.type('::-p-xpath(//*[@id="APjFqb"])', dorkQuery); //aqui peguei o xpath do input de pesquisa do google
		await page.keyboard.press("Enter");

		await page.waitForSelector("div#search", { timeout: 10000 });

		// const results = await page.evaluate(() => {
		//     return Array.from(document.querySelectorAll('div.g')).slice(0, 6).map(result => {
		//         const titleElement = result.querySelector('h3');
		//         const linkElement = result.querySelector('a');
		//         return {
		//             title: titleElement ? titleElement.innerText : 'No title',
		//             url: linkElement ? linkElement.href : 'No URL'
		//         };
		//     });
		// });

		await page.screenshot({ path: "google-search-results.png" });

		setTimeout(async () => {
			console.log("ia fechar...");
			// await browser.close();
		}, 5000);
	});
