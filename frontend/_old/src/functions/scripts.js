const username = "sebastian";
const pw = "youwillnotpass123+*!";

const hash = (string) => {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}

const login = async () => {
    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': "sebastian",
            'passwordHash': "8df6551d2c2c997288cec7d7b80ffedf98827ed9e506331fe3aaca8c7c58d5db"
        }),
        credentials: 'include'
    }

    let logres = fetch('http://localhost:8080/api/login', params).then(res => res.text());
    let promises = [logres];
    Promise.allSettled(promises).then( (results) => results.forEach((res) => {
        console.log(res.value);
    }));
}