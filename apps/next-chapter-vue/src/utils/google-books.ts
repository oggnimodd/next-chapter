// TODO : Move this to @acme/google-books package
// Example of google books id : https://books.google.com.sg/books?id=R7YsowJI9-IC&dq=Harry+Potter&hl=en&source=gbs_api
export const getGoogleBooksId = (googleBooksUrl: string) => {
  if (!googleBooksUrl) {
    return null;
  }

  // Parse query params from google books url
  const urlParams = new URLSearchParams(new URL(googleBooksUrl).search);
  return urlParams.get("id");
};
