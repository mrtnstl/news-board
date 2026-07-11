import { writeFileSync } from "node:fs";
import { initScraping } from "./internal/jobs/initScraping.js";

(async () => {
    const results: Record<string, string>[] = [];
    await initScraping(results);

    const filteredResults = results.filter((result) => {
        return !Object.keys(result)
            .filter((property) => property !== "index")
            .every((property) => result[property] === "");
    });
    writeFileSync(
        "./" + new Date().toISOString() + "_results.json",
        JSON.stringify(filteredResults, null, 2),
    );
    console.log(filteredResults);
    console.log(
        `out of ${results.length} record, ${filteredResults.length} has at least some data`,
    );
})();
