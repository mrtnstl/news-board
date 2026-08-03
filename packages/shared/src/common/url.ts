export function isValid(
    url: string,
): { url: URL; error: null } | { url: null; error: Error } {
    let tempURL: URL | undefined;
    try {
        tempURL = new URL(url);
        return tempURL.protocol === "https:" || tempURL.protocol === "http:"
            ? { url: tempURL, error: null }
            : { url: null, error: new Error("invalid protocol in URL") };
    } catch (err) {
        return {
            url: null,
            error: err instanceof Error ? err : new Error(String(err)),
        };
    }
}

export function normalize(url: URL): string {
    let tempURL = new URL(url.href);

    // force https
    if (tempURL.protocol === "http:") {
        tempURL.protocol = "https:";
    }

    // remove "www."
    if (tempURL.hostname.startsWith("www.")) {
        tempURL.hostname = tempURL.hostname.slice(4);
    }

    // remove fragment
    if (tempURL.hash !== "") {
        tempURL.hash = "";
    }

    // sort query params
    const sorted = [...tempURL.searchParams.entries()].sort(([a], [b]) =>
        a.localeCompare(b),
    );
    tempURL.search = "";
    for (const [key, value] of sorted) {
        tempURL.searchParams.append(key, value);
    }

    let res = tempURL.toString();

    // remove trailing slash
    // DOES NOT STRIP IT WHEN URL HAS QUERY PARAMS!
    if (res[res.length - 1] === "/") {
        res = res.slice(0, res.length - 1);
    }

    return res;
}
