// src/utils/ipUtils.ts
export async function getClientIP(_request: Request): Promise<string> {
	try {
		if (import.meta.env.DEV) {
			return "127.0.0.1";
		}

		const response = await fetch("https://api.ipify.org?format=json");
		if (response.ok) {
			const data = await response.json();
			return data.ip;
		}
		console.warn("获取IP失败:", response.status);
		return "未知";
	} catch (error) {
		console.warn("获取IP失败:", error);
		return "未知";
	}
}
