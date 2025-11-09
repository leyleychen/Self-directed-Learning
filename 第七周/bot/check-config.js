const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

async function checkAndCreateConfig() {
    try {
        const configFile = path.join(process.cwd(), 'config.json');  // 直接使用 config.json

        // Check if config.json exists
        try {
            await fs.access(configFile);
            console.log('config.json 已存在');
        } catch {
            console.log('正在從 GitHub 下載 config.json...');
            console.log("若未下載請到https://raw.githubusercontent.com/leyleychen/third-week/master/config.json 下載並放到資料夾中")

            try {
                const response = await axios.get('https://raw.githubusercontent.com/leyleychen/third-week/master/config.json');
                
                await fs.writeFile(configFile, JSON.stringify(response.data, null, 4), 'utf8');
                console.log('成功下載並創建 config.json');
            } catch (downloadError) {
                console.error('下載 config.json 失敗:', downloadError.message);
                throw downloadError;
            }
        }

        // Verify JSON content
        const configContent = await fs.readFile(configFile, 'utf8');
        try {
            JSON.parse(configContent);  // Verify that it's a valid JSON file
            console.log('config.json 檢查完成，格式正確');
        } catch (e) {
            console.error('config.json 格式錯誤，請檢查內容');
            throw e;
        }

        console.log('配置檢查完成！');
        return true;

    } catch (error) {
        console.error('檢查配置時發生錯誤:', error);
        throw error;
    }
}

module.exports = checkAndCreateConfig;

if (require.main === module) {
    checkAndCreateConfig().catch(err => {
        console.error('啟動錯誤:', err.message || err);
        process.exit(1);
    });
}
