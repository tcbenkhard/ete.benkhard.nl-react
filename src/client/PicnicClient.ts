import md5Hex from "md5-hex";
import {types} from "sass";

interface PicnicClientOptions {
    authToken?: string
    baseUrl: string
}

class PicnicError extends Error {

    constructor(message: string) {
        super(message);
    }
}

export interface Product {
    type: string,
    id: string,
    name: string,
    display_price: number,
    unit_quantity: string
}

export interface QueryResults {
    type: string,
    id: string,
    name: string,
    items: Array<Product>
}

export class PicnicClient {
    private authToken: string | undefined;
    private baseUrl: string;

    constructor({authToken, baseUrl}: PicnicClientOptions) {
        this.authToken = authToken
        this.baseUrl = baseUrl
    }

    public login = async (username: string, password: string): Promise<string> => {
        console.log('logging in')
        const response = await fetch(`${this.baseUrl}/user/login`, {
            method: 'post',
            body: JSON.stringify({
                "key": username,
                "secret": md5Hex(password),
                "client_id": 30100
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            if(!response.headers.has('x-picnic-auth')) {
                console.log(response)
                throw new PicnicError('Missing auth header')
            }
            this.authToken = response.headers.get('x-picnic-auth')!
            return this.authToken
        } else {
            const responseBody = await response.json()
            throw new PicnicError(responseBody.error.message)
        }
    }

    public logoff = () => {
        this.authToken = undefined
    }

    public query = async (queryString: string): Promise<Array<QueryResults>> => {
        console.log('Querying for ingredients')
        const url = `${this.baseUrl}/search?` +  new URLSearchParams({
            search_term: encodeURIComponent(queryString)
        })
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'x-picnic-auth': this.authToken!
            }
        })
        console.log('Response', response)
        return await response.json()
    }

    public isLoggedIn = () => {
        if (this.authToken) return true
        return false
    }
}