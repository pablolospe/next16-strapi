import qs from 'qs';
const BASE_URL = 'http://localhost:1337';

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            link: { populate: true },
            image: { fields: ["url"] },
          }
        }
      }
    }
  }
}

export async function getHomePage() {
    const query = qs.stringify(QUERY_HOME_PAGE);
    const response = await getStrapiData(`/api/home-page?${query}`)
    return response?.data;
}

export async function getStrapiData<T>(url: string) {
    try {
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) {
            // throw new Error(`Error fetching data from Strapi: ${response.status}`);
        }
        const data = await response.json();
        return data;       
    } catch (error) {
        console.error(error);
        throw null;
    }
}