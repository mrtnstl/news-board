import { initScraping } from "./internal/jobs/initScraping.js";

(async () => {
    const results: any = [];
    await initScraping(results);

    console.log(results);
    console.log(results.length);
})();
