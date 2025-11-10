const BASE_URL = 'http://localhost:1337';

export async function getStrapiData<T>(url: string) {
    try {
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) {
            throw new Error(`Error fetching data from Strapi: ${response.status}`);
        }
        const data = await response.json();
        return data;       
    } catch (error) {
        console.error(error);
        throw null;
    }
}