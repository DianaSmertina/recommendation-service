export class Api {
    private static base = "http://localhost:5000";

    static async signIn(data: { email: string; password: string }): Promise<
        {
              accessToken: string;
              refreshToken: string;
        } | { message: string }
    > {
        const response = await fetch(`${Api.base}/user/sign-in`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
}
