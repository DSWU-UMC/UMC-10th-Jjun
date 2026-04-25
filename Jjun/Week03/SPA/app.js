const BASE_PATH = "/Week03/SPA";

// 1️⃣ 라우트 정의
const routes = {
  "/": () => "<h1>Home</h1>",
  "/about": () => "<h1>About</h1>",
};

// 2️⃣ 라우터 함수
const router = () => {
  let path = window.location.pathname;

  // BASE_PATH 제거
  path = path.replace(BASE_PATH, "");

  // index.html 제거
  path = path.replace("/index.html", "");

  // 빈 값이면 "/" 처리
  path = path || "/";

  const view = routes[path] || (() => "<h1>404</h1>");
  document.getElementById("app").innerHTML = view();
};

// 3️⃣ 링크 클릭 처리 (SPA 이동)
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();

    const href = e.target.getAttribute("href");

    history.pushState(null, "", BASE_PATH + href);
    router();
  }
});

// 4️⃣ 뒤로가기 / 앞으로가기 처리
window.addEventListener("popstate", router);

// 5️⃣ 초기 로딩
document.addEventListener("DOMContentLoaded", router);