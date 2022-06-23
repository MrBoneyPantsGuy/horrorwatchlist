const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdBlockerPlugin = require('puppeteer-extra-plugin-adblocker');
const stringSimilarity = require('string-similarity');
puppeteer.use(StealthPlugin());
puppeteer.use(AdBlockerPlugin({ blockTrackers: true }));

const sortBySimilarity = (movieTitle, resultArray) => {
    // assign similarity
    resultArray.forEach(element => {
        element.similarity = stringSimilarity.compareTwoStrings(movieTitle, element.title);
    });
    // return sorted Array with highest similarity at first place
    return resultArray.sort((a, b) => b.similarity - a.similarity);
}

exports.checkBFLIX = async (title) => {
    try {
        const bflixURL = 'https://www9.bflix.to/';
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(bflixURL);
        await page.waitForSelector('[name=keyword]', {visible: true});
        await page.type('[name=keyword]', title);
        await page.keyboard.press('Enter');
        await page.waitForSelector('.filmlist', {visible: true});
        let data =  await page.evaluate( () => {
            const items = document.querySelectorAll('.poster');
            return Array.from(items).map(item => { return {
                title: item.title,
                link: item.href,
                poster: item.getElementsByTagName("img")[0].src,
                similarity: 0
            }});
        });
        data = sortBySimilarity(title, data);
        await browser.close();
        return data;
    } catch (e) {
        console.log("Something went wrong:" + e);
        return [];
    }
}

exports.checkSockShare = async (title) => {
    try {
        const sockShareURL = 'https://sockshare1.com/';
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        /*
        const session = await page.target().createCDPSession();
        const {windowId} = await session.send('Browser.getWindowForTarget');
        const chromeArgs = [
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding'
        ];
        await session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'} , chromeArgs});
         */
        await page.goto(sockShareURL);
        const check = await page.waitForSelector('[id=keyword]', {visible: true, timeout: 60000})
            .catch( (err) => {
                console.log('Could not pass Cloudflare DDoS-Protection');
                return false;
            });
        if(!check) {
            return [];
        } else {
            await page.type('[id=keyword]', title);
            await page.keyboard.press('Enter');
            await page.waitForSelector('.thumbcontent', {visible: true});
            let data = await page.evaluate( () => {
                const items = document.querySelectorAll('.item');
                if(items.length > 0) {
                    return Array.from(items).map(item => { return {
                        title: item.getElementsByClassName('thumb')[0].getElementsByTagName('a')[0].onmouseover.toString().match(/<b>(.*?)<\/b>/g).toString().replace(/<\/?b>/g,''),
                        link: item.getElementsByTagName('a')[0].href,
                        poster: item.getElementsByClassName('thumb')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src,
                        similarity: 0
                    }});
                } else {
                    return [];
                }
            });
            data = sortBySimilarity(title, data);
            await browser.close();
            return data;
        }
    } catch (e) {
        console.log("Something went wrong:" + e);
        return [];
    }
}