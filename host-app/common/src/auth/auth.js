let accessToken;

// mock authentication request - runs the fetch once, no matter how many consumers call it
export async function getAccessToken() {
    if (!accessToken) {
        accessToken = await fetch('https://httpbin.org/anything', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken: 'abc123' }),
        })
        .then(response => response.json())
        .then(data => {
            accessToken = data.json.accessToken;
            return accessToken;
        });
    }
    return accessToken;
}
