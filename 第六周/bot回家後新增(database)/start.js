const fs = require('node:fs');
const path = require('node:path');
const checkConfig = require('./check-config.js');
const { exec } = require('child_process');

async function startApp() {
    try {
        console.log('正在執行 check-config.js...');
        await checkConfig();

        console.log('正在確認 config.json 是否就緒...');
        const configPath = path.resolve('config.json');

        let config;
        try {
            const configContent = await fs.promises.readFile(configPath, 'utf8');
            config = JSON.parse(configContent);
        } catch (err) {
            throw new Error('config.json 讀取失敗或格式無效');
        }

        if (config.token === "YOUR_TOKEN" || config.clientId === "YOUR_CLIENT_ID") {
            console.error('請在 config.json 中填寫有效的 token 和 clientId');
            throw new Error('token 或 clientId 無效');
        }

        console.log('正在執行 deploy-command.js...');
        await executeDeployCommand();

        console.log('正在執行 index.js...');
        require('./index.js');

        console.log("完成");

    } catch (error) {
        console.error('啟動錯誤:', error.message || error);
        countdownAndExit();
    }
}

async function executeDeployCommand() {
    return new Promise((resolve, reject) => {
        exec('node deploy-command.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`執行 deploy-command.js 發生錯誤: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`deploy-command.js 錯誤: ${stderr}`);
                reject(stderr);
                return;
            }
            console.log(stdout);
            resolve();
        });
    });
}

function countdownAndExit() {
    let seconds = 5;
    console.log('錯誤發生，五秒後關閉...');
    const interval = setInterval(() => {
        console.log(seconds);
        seconds--;
        if (seconds < 0) {
            clearInterval(interval);
            process.exit(0);
        }
    }, 1000);
}

startApp();
