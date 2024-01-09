export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

// Example of google books id : https://books.google.com.sg/books?id=R7YsowJI9-IC&dq=Harry+Potter&hl=en&source=gbs_api
export const getGoogleBooksId = (googleBooksUrl: string) => {
  if (!googleBooksUrl) {
    return null;
  }

  // Parse query params from google books url
  const urlParams = new URLSearchParams(new URL(googleBooksUrl).search);
  return urlParams.get("id");
};

interface tabA11yProps {
  index: number;
  name?: string;
}

export const tabA11y = ({ index, name = "simple" }: tabA11yProps) => {
  return {
    id: `${name}-tab-${index}`,
    "aria-controls": `${name}-tabpanel-${index}`,
  };
};
