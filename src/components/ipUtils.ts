// src/utils/ipUtils.ts
export function getClientIP(request: Request): string {
	try {
		const headers = request.headers;

		// 按优先级尝试不同的IP头部
		const ipHeaders = [
			"x-real-ip", // 常见反向代理头
			"x-forwarded-for", // 常见反向代理头
			"cf-connecting-ip", // Cloudflare特有的头
			"fastly-client-ip", // Fastly CDN 头
			"x-client-ip", // 用于一些其他反代
		];

		for (const header of ipHeaders) {
			const value = headers.get(header);
			if (value) {
				const ip = value.split(",")[0]?.trim();
				if (ip && ip !== "") {
					// 本地开发环境处理
					if (ip === "::1") return "127.0.0.1"; // 本地开发环境
					return ip; // 返回首个有效 IP 地址
				}
			}
		}

		// 开发环境默认值
		return import.meta.env.DEV ? "127.0.0.1" : "未知";
	} catch (error) {
		console.warn("获取IP失败:", error);
		return "未知";
	}
}
