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

export async function registerUserService(userData: object){
  const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function loginUserService(userData: object){
  const url = `${STRAPI_BASE_URL}/api/auth/local`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error('Error login user:', error);
    throw error;
  }
}