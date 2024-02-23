const API_KEY = "3bbdbfe25dbe4618965ddb4bbc0caf26";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  try {
    const url = new URL(
      `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddddd", newsList);
  } catch (error) {
    console.error("Error fetching latest news:", error);
  }
};

const getNewsByCategory = async (event) => {
  try {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    const url = new URL(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news by category");
    }
    const data = await response.json();
    newsList = data.articles;
    console.log("ddd", data);
    render();
  } catch (error) {
    console.error("Error fetching news by category:", error);
  }
};

const getNewsByKeyword = async () => {
  try {
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
    const url = new URL(
      `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news by keyword");
    }
    const data = await response.json();
    newsList = data.articles;
    console.log("keyword-data", data);
    render();
  } catch (error) {
    console.error("Error fetching news by keyword:", error);
  }
};

const render = () => {
  try {
    if (!Array.isArray(newsList)) {
      throw new Error("newsList is not an array");
    }
    const newsHtml = newsList
      .map(
        (news) => `<section id="news-board">
  <div class="row news">
    <div class="col-lg-4">
      <img
        class="image-size"
        src=${news.urlToImage}
      />
    </div>
    <div class="col-lg-8">
      <h1>${news.title}</h1>
      <p>
        ${news.description}
      </p>
      <div>${news.source.name} ${news.publishedAt}</div>
    </div>
  </div>
</section>`
      )
      .join("");
    document.getElementById("news-board").innerHTML = newsHtml;
  } catch (error) {
    console.error("Error rendering news:", error);
  }
};

getLatestNews();
