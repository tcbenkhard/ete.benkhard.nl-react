import md5Hex from "md5-hex";

interface PicnicClientOptions {
    authToken?: string
    baseUrl: string
}

class PicnicError extends Error {}

export interface Product {
    type: string,
    id: string,
    name: string,
    display_price: number,
    unit_quantity: string
    image_id: string
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

    public addToCart = async (productId: string) => {
        const url = `${this.baseUrl}/cart/add_product`
        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-picnic-auth': this.authToken!
            },
            body: JSON.stringify({
                product_id: productId, count: 1
            })
        })
    }
}