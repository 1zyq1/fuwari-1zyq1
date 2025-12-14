---
title: 在 Debian 12 上安装和配置 AdGuard Home 完整指南
published: 2025-10-09T22:28:00.000Z
updated: 2025-10-09T22:28:00.000Z
description: "获取在 Debian 12 上安装和配置 AdGuard Home 的终极指南。本教程涵盖从系统要求、官方脚本或手动安装，到配置 DNS、过滤器、防火墙及故障排除的完整流程，助您轻松实现全网广告拦截与家庭网络安全管理。"
draft: false
---

# 系统要求

- **操作系统**: Debian 12 (Bookworm)
- **内存**: 至少 512MB RAM
- **存储**: 至少 1GB 可用磁盘空间
- **权限**: root 或 sudo 权限
- **网络**: 稳定的网络连接

# 安装方法

## 方法一：使用官方脚本安装（推荐）

这是最简单快捷的安装方法：


### 更新系统包列表
```bash
sudo apt update
sudo apt upgrade -y
```

### 安装 curl（如果尚未安装）
```bash
sudo apt install curl -y
```
### 下载并运行 AdGuard Home 安装脚本
```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```
## 方法二：手动安装
如果您更喜欢手动控制安装过程：
### 创建 AdGuard Home 目录
```bash
sudo mkdir -p /opt/AdGuardHome
```
### 下载最新版本的 AdGuard Home
```bash
cd /tmp
wget https://static.adguard.com/adguardhome/release/AdGuardHome_linux_amd64.tar.gz
```
### 解压文件
```bash
tar xvf AdGuardHome_linux_amd64.tar.gz
```
### 将文件移动到目标目录
```bash
sudo mv AdGuardHome/AdGuardHome /opt/AdGuardHome/
```

## 启动 AdGuard Home：


### 进入安装目录
```bash
cd /opt/AdGuardHome
```
### 启动 AdGuard Home（首次运行会进入配置模式）
```bash
sudo ./AdGuardHome -s install
sudo ./AdGuardHome -s start
```
访问管理界面：

打开浏览器，访问 http://your-server-ip:3000

完成初始设置：

设置管理员账号和密码

配置监听接口（通常保持默认）

设置 DNS 服务端口（默认 53）

高级配置
配置上游 DNS 服务器
在管理界面中，转到 设置 → DNS 设置：

# 推荐的上游 DNS 服务器配置
上游 DNS 服务器：
```bash
- https://dns.google/dns-query
- https://cloudflare-dns.com/dns-query
- tls://dns.adguard.com
```
Bootstrap DNS 服务器：
```bash
- 8.8.8.8:53
- 1.1.1.1:53
```

# 配置防火墙
如果使用 UFW 防火墙：


### 允许 DNS 流量（端口 53）
```bash
sudo ufw allow 53/tcp
sudo ufw allow 53/udp
```
### 允许管理界面访问（端口 3000）
```bash
sudo ufw allow from 192.168.1.0/24 to any port 3000
```
### 重新加载防火墙规则
```bash
sudo ufw reload
```

# 故障排除

### 检查端口占用
```bash
sudo netstat -tulpn | grep :53
```

### 权限问题：


### 确保 AdGuard Home 有正确的权限
```bash
sudo chown -R root:root /opt/AdGuardHome
sudo chmod +x /opt/AdGuardHome/AdGuardHome
```
## 无法访问管理界面：


### 检查防火墙设置
```bash
sudo ufw status
```
### 检查服务是否正常运行
```bash
sudo systemctl status AdGuardHome
```
结论
通过本教程，您已经在 Debian 12 上成功安装并配置了 AdGuard Home。您现在拥有一个功能完整的本地 DNS 服务器，可以提供广告拦截、隐私保护和家长控制功能。

记得定期更新 AdGuard Home 以获得最新的功能和安全修复，并监控其性能以确保网络顺畅运行。

相关资源：

AdGuard Home 官方文档

AdGuard Home 过滤器订阅

希望这个指南对您有帮助！如有任何问题，请参考官方文档或在相关社区寻求帮助。
