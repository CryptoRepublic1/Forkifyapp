const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJson = async function(url) {
    try {
        const fetchPro = fetch(url);

        const res = await Promise.race(fetchPro, timeout(10));
        console.log(res);
        const data = await res.getJson();
        if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    } catch (err) {
        throw err;
    }
};