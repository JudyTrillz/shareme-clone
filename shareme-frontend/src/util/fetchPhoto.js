export const fetchRandomImage = async () => {
  const unSplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const categories = ["nature", "technology", "photography"];
  let randomImage;
  try {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${randomCategory}&client_id=${unSplashKey}`
    );
    const data = await res.json();
    const imageUrl = `${data.urls.raw}&w=1600&h=900&fit=crop`;
    randomImage = imageUrl;
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }

  return randomImage;
};
