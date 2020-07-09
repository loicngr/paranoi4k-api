const fetch = require('node-fetch');

class YoutubeApi {
    #api_key;
    #user_id;
    playlistID;

    constructor() {
        this.#api_key = process.env.YOUTUBE_API_KEY;
        this.#user_id = process.env.YOUTUBE_CHANNEL_ID;
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

    uploadsPlaylist() {
        let baseUrl = 'https://www.googleapis.com/youtube/v3/channels/';
        baseUrl += `?part=snippet,contentDetails,statistics&id=${this.#user_id}&key=${this.#api_key}`;

        return this.fetchRequest('get', baseUrl, {}).then(playlist => {
            if (playlist.status && playlist.response) {
                this.playlistID = playlist.response.items[0].contentDetails.relatedPlaylists.uploads;
                return true;
            }
            return false;
        });
    }

     get lastVideo() {
        return new Promise(async (res, rej) => {
            await this.uploadsPlaylist();

            let baseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
            baseUrl += `?part=snippet&playlistId=${this.playlistID }&maxResults=1&key=${this.#api_key}`;

            const video = await this.fetchRequest('get', baseUrl, {});
            if (video.status) res(video);
            else rej(video);
        });
    }

}

module.exports = {YoutubeApi};