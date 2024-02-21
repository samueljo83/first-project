const API_KEY = "3bbdbfe25dbe4618965ddb4bbc0caf26";
let newsList = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("ddddd", newsList);
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
