import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
    { url: 'https://www.realitytiger.com', name: 'realitytiger' },
    { url: 'https://ahyan.co.in/', name: 'ahyan' },
    { url: 'https://www.bhaggyamconstructions.com/', name: 'bhaggyam' },
    { url: 'https://www.wheelersedu.com/', name: 'wheelersedu' },
    { url: 'https://www.billiontags.com', name: 'billiontags' },
    { url: 'https://www.jandjp.in', name: 'jandjp' }
];

const devices = [
    { type: 'desktop', width: 1024, height: 640 },
    { type: 'tablet', width: 768, height: 1024 },
    { type: 'mobile', width: 375, height: 812 }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200 || response.statusCode === 302 || response.statusCode === 301) {
                if (response.statusCode === 302 || response.statusCode === 301) {
                    https.get(response.headers.location, (res2) => {
                        res2.pipe(file);
                        file.on('finish', () => { file.close(resolve); });
                    }).on('error', (err) => { file.close(); fs.unlink(dest, () => { reject(err); }); });
                } else {
                    response.pipe(file);
                    file.on('finish', () => { file.close(resolve); });
                }
            } else {
                reject(new Error(`Server responded with ${response.statusCode}`));
            }
        }).on('error', (err) => {
            file.close();
            fs.unlink(dest, () => { reject(err); });
        });
    });
};

const main = async () => {
    for (const site of urls) {
        // Wait 1 second between site batches to respect API limits just in case
        await new Promise(r => setTimeout(r, 1000));

        for (const device of devices) {
            const fileName = `${site.name}_${device.type}.jpg`;
            const savePath = path.resolve('../public/images/projects', fileName);
            // using thum.io viewport scaling 
            // e.g., https://image.thum.io/get/width/375/crop/812/https://...
            const thumUrl = `https://image.thum.io/get/width/${device.width}/crop/${device.height}/${site.url}`;

            console.log(`Downloading ${device.type} view for ${site.url}...`);
            try {
                await download(thumUrl, savePath);
                console.log(`Saved ${fileName}`);
            } catch (e) {
                console.log(`Error downloading ${fileName}: ${e.message}`);
            }
        }
    }
}

main();
