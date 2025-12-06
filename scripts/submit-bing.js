import fs from "node:fs";
import path from "node:path";
import axios from "axios";

// =========================
//  你的配置（必须修改）
// =========================
const API_KEY = "6a179d589db747e6907ca6a17b12e9ae";
const SITE_URL = "https://www.1zyq1.top";
const PROD_DOMAIN = "www.1zyq1.top"; // 用来确认是否是生产部署

// =========================
//  防止重复执行（多平台）
// =========================
const LOCK_FILE = ".bing-submit.lock";

// 1. 非生产环境跳过（dev/build preview 都跳过）
if (process.env.NODE_ENV !== "production") {
	console.log("⏭ 不是生产环境，跳过 Bing 提交。");
	process.exit(0);
}

// 2. 检查是否属于你允许的 4个平台之一（可修改）
const isVercel = !!process.env.VERCEL;
const isNetlify = !!process.env.NETLIFY;
const isCF = !!process.env.CF_PAGES;
const isEdgeOne = !!process.env.EDGEONE; // 如果 EdgeOne 没环境变量，你可自定义

if (!isVercel && !isNetlify && !isCF && !isEdgeOne) {
	console.log("⏭ 未检测到 Vercel/Netlify/Cloudflare/EdgeOne，跳过提交");
	process.exit(0);
}

// 3. 只在“正式生产域名”构建时执行（比如 Vercel Production 环境）
if (process.env.URL && !process.env.URL.includes(PROD_DOMAIN)) {
	console.log(`⏭ 部署域名不是生产域名 ${PROD_DOMAIN}，跳过提交`);
	process.exit(0);
}

// 4. 防重复（多个平台同时构建）
if (fs.existsSync(LOCK_FILE)) {
	console.log("⏭ 已发现锁文件，表示已经提交过 Bing，本次跳过");
	process.exit(0);
}

// 写入锁文件
fs.writeFileSync(LOCK_FILE, Date.now().toString());

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
		const url = SITE_URL + relative.replace(/index\.html$/, "");
		await submitToBing(url);
	}

	console.log("\n🎉 所有页面已成功提交到 Bing！");
}

main();
