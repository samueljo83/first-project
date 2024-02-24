const API_KEY = "3bbdbfe25dbe4618965ddb4bbc0caf26";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://noona-times-v2.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    const response = await fetch(url);
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender(); // Added parentheses to invoke the function
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
  const categoryUrl = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  url = categoryUrl; // Updated global url variable
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const keywordUrl = new URL(
    `https://noona-times-v2.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  url = keywordUrl; // Updated global url variable
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

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  const lastPage = Math.min(pageGroup * groupSize, totalPages);
  const firstPage = Math.max(1, lastPage - (groupSize - 1));
  let paginationHtml = "";
  for (let i = firstPage; i <= lastPage; i++) {
    const activeClass = i === page ? "active" : ""; // Apply 'active' class to the current page
    paginationHtml += `<li class="page-item ${activeClass}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHtml;
};

const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
