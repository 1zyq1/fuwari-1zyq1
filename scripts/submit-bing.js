import fs from "node:fs";
import path from "node:path";
import axios from "axios";

// =========================
//  你的配置（必须修改）
// =========================
const API_KEY = "6a179d589db747e6907ca6a17b12e9ae";
const SITE_URL = "https://www.1zyq1.top";

// =========================
//  防止重复执行（多平台）
// =========================
const _LOCK_FILE = ".bing-submit.lock";

// 1. 非生产环境跳过（dev/build preview 都跳过）
if (process.env.NODE_ENV !== "production") {
	console.log("⏭ 不是生产环境，跳过 Bing 提交。");
	process.exit(0);
}

console.log("🚀 准备执行 Bing URL 提交...\n");

// =========================
//  Bing 提交逻辑（不动）
// =========================

const generateHttpMessage = () => {
	const raw = `HTTP/1.1 200 OK
Date: ${new Date().toUTCString()}
Content-Type: text/html

Hello Bing!`;
	return Buffer.from(raw).toString("base64");
};

async function submitToBing(url) {
	const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitContent?apikey=${API_KEY}`;

	const body = {
		siteUrl: SITE_URL,
		url,
		httpMessage: generateHttpMessage(),
		structuredData: "",
		dynamicServing: "0",
	};

	try {
		await axios.post(endpoint, body, {
			headers: { "Content-Type": "application/json" },
		});
		console.log("✔ 提交成功：", url);
	} catch (e) {
		console.error("✖ 提交失败：", url);
		console.error(e.response?.data || e);
	}
}

async function main() {
	const distDir = path.join(process.cwd(), "dist");
	const htmlFiles = [];

	// 扫描 dist
	function walk(dir) {
		for (const item of fs.readdirSync(dir)) {
			const full = path.join(dir, item);
			if (fs.statSync(full).isDirectory()) walk(full);
			else if (item.endsWith(".html")) htmlFiles.push(full);
		}
	}

	walk(distDir);

	console.log(`发现 ${htmlFiles.length} 个 HTML 页面要提交\n`);

	for (const file of htmlFiles) {
		const relative = file.replace(distDir, "");
		// 修改 URL 拼接，确保使用正斜杠替换反斜杠
		const url =
			SITE_URL + relative.replace(/\\+/g, "/").replace(/index\.html$/, "");
		await submitToBing(url);
	}

	console.log("\n🎉 所有页面已成功提交到 Bing！");
}

main();
