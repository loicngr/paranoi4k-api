const fetch = require('node-fetch');

class TwitchApi {
    constructor() {
        this.client_id = process.env.TWITCH_CLIENT_ID;
        this.client_secret = process.env.TWITCH_CLIENT_SECRET;
        this.user_login = process.env.TWITCH_USER_LOGIN;
        this.client_token = '';
    }

    async fetchRequest(type, url, headers, body) {
        const output = {status: false, response: null};

        switch (type) {
            case 'get': {
                const response = await fetch(url, {
                    method: 'get',
                    headers: headers
                })
                if (response.ok) {
                    const responseData = await response.json();

                    output.status = true;
                    output.response = responseData;
                }
                break;
            }
            case 'post': {
                const response = await fetch(url, {
                    method: 'post',
                    headers: headers,
                    body: body
                })
                if (response.ok) {
                    const responseData = await response.json();

                    output.status = true;
                    output.response = responseData;
                }
                break;
            }
            default:
                break;
        }

        return output;
    }

    generateToken() {
        const url = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`;
        return this.fetchRequest('post', url, {
            'Client-ID': this.client_id,
        }).then(token => {
            if (token.status && token.response.access_token) {
                this.client_token = token.response.access_token;
                return true;
            }
            return false;
        });
    }

    get user() {
        return new Promise(async (res, rej) => {
            await this.generateToken();
            const user = await this.fetchRequest('get', `https://api.twitch.tv/helix/streams?user_login=${this.user_login}`, {
                'Client-ID': this.client_id,
                'Authorization': `Bearer ${this.client_token}`
            });
            if (user.status) res(user);
            else rej(user);
        });
    }

}

module.exports = {TwitchApi};