import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
    { url: 'https://www.realitytiger.com', name: 'realitytiger.jpg' },
    { url: 'https://ahyan.co.in/', name: 'ahyan.jpg' },
    { url: 'https://www.bhaggyamconstruction.com', name: 'bhaggyam.jpg' },
    { url: 'https://www.wheelersedu.com/', name: 'wheelersedu.jpg' },
    { url: 'https://www.billiontags.com', name: 'billiontags.jpg' },
    { url: 'https://www.jandjp.in', name: 'jandjp.jpg' }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const thumUrl = `https://image.thum.io/get/width/1000/crop/800/${url}`;
        https.get(thumUrl, (response) => {
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
        const savePath = path.resolve('../public/images/projects', site.name);
        console.log(`Downloading ${site.url}...`);
        try {
            await download(site.url, savePath);
            console.log(`Saved screenshot to ${savePath}`);
        } catch (e) {
            console.log(`Error downloading ${site.url}: ${e.message}`);
        }
    }
}

main();
