// This one stores the accessToken in memory from when it is fetched until the page is reloaded
let accessToken;

export function getIsLoggedIn() {
    accessToken ??= sessionStorage.getItem("accessToken");
    return !!accessToken;
}

// mock authentication request - runs the fetch once, no matter how many times consumers call it
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
            sessionStorage.setItem("accessToken", accessToken);
            return accessToken;
        });
    }
    return accessToken;
}
