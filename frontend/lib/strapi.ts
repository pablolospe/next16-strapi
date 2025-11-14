import { cacheLife } from 'next/cache';
import qs from 'qs';
export const STRAPI_BASE_URL = 'http://localhost:1337';

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
  'use cache';

  // cacheLife({ expire: 60 }); // cache for 60 seconds

  const query = qs.stringify(QUERY_HOME_PAGE);
  const response = await getStrapiData(`/api/home-page?${query}`)
  return response?.data;
}

export async function getStrapiData<T>(url: string) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`);
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