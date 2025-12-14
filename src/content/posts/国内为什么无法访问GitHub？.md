---
title: 国内为什么无法访问GitHub？几个方法教你搞定
published: 2025-10-7T20:12:00.000Z
updated: 2025-10-7T20:12:00.000Z
description: "深入解析GitHub在中国大陆无法访问的根本原因，包括GFW干扰与DNS污染。本文提供多种亲测有效的解决方案，从推荐新手使用的Watt Toolkit一键加速，到手动修改hosts文件，助您稳定访问GitHub，高效进行开发工作，畅享全球代码资源。"
draft: false
---


GitHub 作为全球最大的代码托管平台，对于开发者而言就如同水之于鱼。然而在中国大陆，访问 GitHub 却常常面临各种困难。本文将深入分析原因，并提供几种实用的解决方案。

## 为什么无法访问 GitHub？

### GFW 的影响

由于中国国家防火墙（GFW）的影响，GitHub 在中国大陆地区持续受到大规模的 DNS 污染和 SNI 干扰。目前部分地区只能间歇性访问，有的地方则是完全阻断。

GitHub 在全球开源领域的地位举足轻重，从基础软件到最前沿的科技项目一应俱全。各种知名的开源项目都在上面进行开发和维护。这种访问限制无疑对国内开发者的学习与工作造成了极大阻碍。

### DNS 污染的原理

当我们在浏览器地址输入 `github.com` 时，DNS 就开始发挥作用：

1. **正常流程**：DNS 将域名翻译成可供连接的 IP 地址
2. **被干扰流程**：GFW 监听到 GitHub 访问请求，伪装成 DNS 服务器返回虚假 IP
3. **结果**：浏览器无法找到真正的 GitHub 服务器，导致访问失败

### 解决方案

## 方法一：使用 Watt Toolkit（推荐新手）

Watt Toolkit（原名 Steam++）是一款功能强大的开源加速工具，支持 GitHub 访问加速。

**操作步骤：**

1. **下载安装**：
   - 打开 Microsoft Store，搜索 "Watt Toolkit" 并安装
   - 或访问 [GitHub Releases](https://github.com/BeyondDimension/SteamTools/releases) 下载

2. **配置加速**：
   - 打开 Watt Toolkit
   - 进入「网络加速」页面
   - 在「平台加速」中勾选 "GitHub"
   - 点击「一键加速」

![Watt Toolkit 界面](https://steampp.net/images/home/js.webp)

**优点**：
- 一键操作，简单方便
- 自动更新 hosts
- 支持多个平台加速

## 方法二：手动修改 hosts 文件

hosts 文件是一个用于储存计算机网络中各节点信息的文件，作用是将网址域名与其对应的 IP 地址建立关联。

**hosts 文件位置**：
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`
- **Linux/Mac**: `/etc/hosts`
- **Android**: `/system/etc/hosts`

**Windows 系统操作步骤**：

1. **以管理员身份打开记事本**：
   - 在任务栏搜索 "记事本"
   - 右键点击，选择 "以管理员身份运行"

2. **打开 hosts 文件**：
   - 点击「文件」→「打开」
   - 导航到 `C:\Windows\System32\drivers\etc\hosts`
   - 选择所有文件类型，找到 hosts 文件

3. **添加 GitHub 域名映射**：
   在文件末尾添加以下内容：

```hosts
# GitHub Host Start - 最后更新 2024-05
140.82.113.4 github.com
140.82.114.4 gist.github.com
185.199.108.153 assets-cdn.github.com
185.199.109.153 raw.githubusercontent.com
185.199.110.153 user-images.githubusercontent.com
185.199.111.133 camo.githubusercontent.com
140.82.112.21 education.github.com
