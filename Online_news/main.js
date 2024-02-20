const API_KEY = "2f3f7acad3a64cf0bdbadc0863012489";
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("ddddd", news);
};

getLatestNews();
