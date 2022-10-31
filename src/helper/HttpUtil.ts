import { APIRequestContext } from "@playwright/test"

export class Response<T>  {
    httpCode: number = 0
    body: string
    error?: any
    bodyJson?: T
}

export default class MyHttp {
    static async POST<T>(url: string, request: APIRequestContext, body: any, token: string): Promise<Response<T>> {

        // gọi post request tới URL 
        const response = await request.post(url, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        // lấy được response, thì check status code 
        if (!response.ok()) {
            return {
                body: (await response.body()).toString(),
                httpCode: response.status(),
                error: "status code not in range 200-299",
            }
        }

        try {
            return {
                httpCode: response.status(),
                body: (await response.body()).toString(),
                bodyJson: await response.json()
            }
        } catch (err: any) {
            return {
                httpCode: response.status(),
                body: (await response.body()).toString(),
                error: err
            }
        }
    }

    static async GET<T>(url: string, request: APIRequestContext, params: any = {}, token: string = ""): Promise<Response<T>> {
        const response = await request.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: params
        })

        // lấy được response, thì check status code 
        if (!response.ok()) {
            return {
                body: (await response.body()).toString(),
                httpCode: response.status(),
                error: "status code not in range 200-299"
            }
        }

        try {
            return {
                httpCode: response.status(),
                body: (await response.body()).toString(),
                bodyJson: await response.json()
            }
        } catch (err: any) {
            return {
                httpCode: response.status(),
                body: (await response.body()).toString(),
                error: err
            }
        }
    }
}