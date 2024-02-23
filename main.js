const API_KEY = "3bbdbfe25dbe4618965ddb4bbc0caf26";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("ddddd", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log("ddd", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log("keyword-data", data);
  newsList = data.articles;
  render();
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

getLatestNews();
