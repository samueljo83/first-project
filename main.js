const API_KEY = "3bbdbfe25dbe4618965ddb4bbc0caf26";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://noona-times-v2.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
);
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};

const render = () => {
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
};

const errorRender = (errorM) => {
  const errorHtml = `<div class="alert alert-danger" role="alert">
 ${errorM}
</div>`;
  document.getElementById("news-board").innerHTML = errorHtml;
};

getLatestNews();
