---
title: 如何在Linux服务器上安装和配置哪吒监控 Dashboard
published: 2025-11-02
description: '哪吒监控 作为一款开源的服务器监控解决方案，提供了轻量级、实时性强的监控能力，让您随时随地掌握服务器健康状况。本文将带您从零开始，完成哪吒监控 Dashboard 的全套安装与配置。'
category: '监控'
draft: false
---

# 在 Linux 服务器上安装和配置哪吒监控 Dashboard

本文档将指导您如何在 Linux 服务器上安装和配置哪吒监控（Nezha Monitoring）的 Dashboard。哪吒监控是一个功能强大的开源服务器监控解决方案，能够帮助您全面了解服务器的运行状态。

## 1. 准备工作

在开始安装之前，请确保您已准备好以下各项：

### 1.1. 服务器要求

*   **服务器一台**：需要能够连接公网。
*   **防火墙配置**：需要放行 Dashboard 的访问端口（默认 8008）。
*   **硬件配置**：单核 512MB 内存的服务器即可满足大多数使用场景。

### 1.2. 域名配置

*   **一个域名**：已设置好 A 记录，指向 Dashboard 服务器的 IP 地址。例如：`dashboard.example.com`。
*   **（可选）CDN 配置**：
    *   如果您计划使用 CDN，建议准备**两个域名**：
        *   一个用于公开访问，配置 CDN（需支持 WebSocket 协议），例如 `dashboard.example.com`。
        *   另一个不使用 CDN，用于 Agent 与 Dashboard 的通信，例如 `data.example.com`。
    *   虽然 V1 版本不再区分访问端口和通信端口，但为了避免不同厂商 CDN 配置可能导致的通信异常，建议按上述方式准备域名（此为非强制要求）。

## 2. 在服务器中安装 Dashboard

在您的面板服务器中，运行以下安装脚本。

### 2.1. 下载并执行安装脚本

1.  **连接服务器**：
    通过 SSH 连接到您的服务器。

2.  **下载安装脚本**：
    执行以下命令下载安装脚本：
    ```bash
    curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh -o nezha.sh && chmod +x nezha.sh
    ```

3.  **运行安装脚本**：
    *   **标准安装**：
        ```bash
        sudo ./nezha.sh
        ```
    *   **中国大陆服务器镜像安装**：
        如果您在中国大陆，可以使用 Gitee 镜像以获得更快的下载速度：
        ```bash
        sudo CN=true ./nezha.sh
        ```

### 2.2. 安装过程中的提示信息

安装脚本会引导您完成配置。请准备好以下信息：

*   **请输入站点标题**: 输入您希望在 Dashboard 页面顶部显示的自定义标题。
*   **请输入暴露端口**: 指定 Dashboard 的公开访问端口。默认是 `8008`，您可以根据需要自定义。
*   **请指定后台语言**: 选择您偏好的后台管理界面语言。

脚本将自动拉取 Docker 镜像并完成安装。

### 2.3. 访问 Dashboard

安装完成后，您可以通过以下方式访问 Dashboard：

*   **访问地址**：`http://<您的Dashboard服务器IP>:<暴露端口>` 或 `http://dashboard.example.com:<暴露端口>`。
    例如：`http://dashboard.example.com:8008`

### 2.4. 登录 Dashboard 配置界面

*   **后台管理路径**：`/dashboard`
*   **完整访问地址**：`http://dashboard.example.com:8008/dashboard`
*   **默认登录凭据**：
    *   用户名：`admin`
    *   密码：`admin`

**重要警告**：默认密码 `admin` 是一个弱密码，存在严重的安全风险。强烈建议您在首次登录后立即修改密码。

### 2.5. 修改密码

1.  登录 Dashboard 后，点击您的头像。
2.  选择“个人信息”。
3.  在“更新个人资料”部分修改您的密码。
4.  建议设置一个至少 18 位、包含大小写字母、数字和符号的强密码。

### 2.6. 重新运行安装脚本

如果需要再次运行安装脚本（例如进行升级或重新配置），只需执行：
```bash
./nezha.sh
```

## 3. 总结

完成以上步骤后，您应该已经成功安装并配置了哪吒监控的 Dashboard。您可以开始添加 Agent 来监控您的服务器了。
