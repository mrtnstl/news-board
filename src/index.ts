import { ErrorWithCause } from "./common/errors.js";
import { PuppeteerScraper } from "./internal/scraper/puppeteer.js";
import type { TBleepingComputerResponse, TNYTimesResponse } from "./types/scraper.types.js";


const NYTimesSrcaper = new PuppeteerScraper<TNYTimesResponse>(
    {
        url: `https://www.nytimes.com/section/technology`,
        currentPage: 1,
        maxPages: 1,
        selectorToWaitFor: ".xXp2rG_stream",
        elementsRoot: ".css-14ee9cx",
        rawFields: {
            title: { selector: ".css-1l4spti .css-8hzhxf h3" },
            imageURL: { selector: ".css-1l4spti .css-rq4mmj", attribute: "src" },
            publishedAt: { selector: 'div.e15t083i3 span[data-testid="todays-date"]', fallback: "no_data" },
            articleLink: { selector: ".css-1l4spti a.css-8hzhxf", attribute: "href" },
            summary: { selector: ".css-1l4spti p.e15t083i1" },
        },
    }
);


const BleepingComputerScraper = new PuppeteerScraper<TBleepingComputerResponse>(
    {
        url: "https://www.bleepingcomputer.com/",
        currentPage: 1,
        maxPages: 1,
        selectorToWaitFor: ".bc_latest_news #bc-home-news-main-wrap",
        elementsRoot: ".bc_latest_news #bc-home-news-main-wrap li",
        rawFields: {
            title: { selector: ".bc_latest_news_text h4 a" },
            imageURL: { selector: ".bc_latest_news_img a img", attribute: "src" },
            publishedAt: { selector: '.bc_latest_news_text ul .bc_news_date', fallback: "no_data" },
            articleLink: { selector: ".bc_latest_news_text h4 a", attribute: "href" },
            summary: { selector: ".bc_latest_news_text p" },
        }
    }
);

(
    async ()=>{
        try{
            await NYTimesSrcaper.init();
            const mytRes = await NYTimesSrcaper.scrape();
            console.log(mytRes.slice(0, 2));

            await BleepingComputerScraper.init();
            const bleepRes = await BleepingComputerScraper.scrape();
            console.log(bleepRes.slice(0, 2));

        }catch(err: unknown){
            if(err instanceof Error){
                console.log(new ErrorWithCause("Unexpected error", err).unwrapCauses())
            }
        }finally{
            await NYTimesSrcaper.cleanup();
            await BleepingComputerScraper.cleanup();
        }
    }
)();
