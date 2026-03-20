import puppeteer from 'puppeteer';
import path from 'path';

const urls = [
    { url: 'https://www.realitytiger.com', name: 'realitytiger.jpg' },
    { url: 'https://ahyan.co.in/', name: 'ahyan.jpg' },
    { url: 'https://www.bhaggyamconstruction.com', name: 'bhaggyam.jpg' },
    { url: 'https://www.wheelersedu.com/', name: 'wheelersedu.jpg' },
    { url: 'https://www.billiontags.com', name: 'billiontags.jpg' },
    { url: 'https://www.jandjp.in', name: 'jandjp.jpg' }
];

const main = async () => {
    // Launch browser
    const browser = await puppeteer.launch();

    for (const site of urls) {
        console.log(`Capturing ${site.url}...`);
        try {
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });

            // Adjust path depending on where script runs from.
            // Since we'll run from scripts/, the target is ../public/images/projects
            const savePath = path.resolve('../public/images/projects', site.name);
            await page.screenshot({ path: savePath, fullPage: false });

            console.log(`Saved screenshot for ${site.name} to ${savePath}`);
            await page.close();
        } catch (error) {
            console.error(`Failed to capture ${site.url}:`, error.message);
        }
    }
    await browser.close();
    console.log("All screenshots captured.");
};

main();
