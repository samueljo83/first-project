const API_KEY = "3bbdbfe25dbe4618965ddb4bbc0caf26";
let newsList = [];

const getLatestNews = async () => {
  try {
    const url = new URL(
      `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch news. Status: ${response.status}`);
    }
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddddd", newsList);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

const render = () => {
  try {
    if (!Array.isArray(newsList)) {
      throw new Error("newsList is not an array.");
    }
    const newsHtml = newsList
      .map(
        (news) => `<section class="news-board">
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
    const newsBoard = document.getElementById("news-board");
    if (!newsBoard) {
      throw new Error("Element with id 'news-board' not found.");
    }
    newsBoard.innerHTML = newsHtml;
  } catch (error) {
    console.error("Error rendering news:", error);
  }
};

getLatestNews();
