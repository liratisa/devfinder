const searchBar = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const profile = document.querySelector(".profile");

function notFound() {
  profile.style.display = "none";
  const notFound = document.querySelector(".not-found");
  notFound.classList.add("active");
}

function showProfile(json) {
  profile.style.display = "grid";
  const obj = {
    profileImg: document.querySelector(".profile-img"),
    profileName: document.querySelector(".profile-name"),
    profileCreation: document.querySelector(".profile-creation"),
    profileUsername: document.querySelector(".profile-username"),
    repos: document.querySelector(".repos p"),
    followers: document.querySelector(".followers p"),
    following: document.querySelector(".following p"),
    location: document.querySelector(".location"),
    link: document.querySelector(".link"),
    twitter: document.querySelector(".twitter"),
    business: document.querySelector(".company"),
    bio: document.querySelector(".profile-bio"),
  };

  const createdAt = new Date(json.created_at),
    day = createdAt.getDate(),
    month = createdAt.toLocaleString("en-US", { month: "short" }),
    year = createdAt.getFullYear(),
    fullDate = `${day} ${month} ${year}`;

  obj.profileImg.innerHTML = `<img src="${json.avatar_url}">`;
  obj.profileName.innerText = `${json.name}`;
  obj.profileCreation.innerText = `Joined ${fullDate}`;
  obj.profileUsername.innerText = `@${json.login}`;
  obj.bio.innerText = `${json.bio}`;
  obj.repos.innerText = `${json.public_repos}`;
  obj.followers.innerText = `${json.followers}`;
  obj.following.innerText = `${json.following}`;
  obj.location.innerText = `${json.location}`;
  obj.link.innerText = `${json.html_url}`;
  obj.link.href = json.html_url;
  obj.twitter.innerText = `${json.twitter_username}`;
  obj.business.innerText = `${json.company}`;

  for (const element in obj) {
    if (obj[element].innerText === "null") {
      obj[element].classList.add("null");
      obj[element].innerText = "Not available";
    } else {
      obj[element].classList.remove("null");
    }
  }
}

async function fetchAPI() {
  const valueKeydown = searchBar.value.toLowerCase();
  const url = `https://api.github.com/users/${valueKeydown}`;
  const awaitProfile = await fetch(url);
  const json = await awaitProfile.json();

  if (awaitProfile.status === 404) {
    notFound();
  } else {
    document.querySelector(".active")?.classList.remove("active");
    showProfile(json);
  }
}

searchButton.addEventListener("click", fetchAPI);

const body = document.querySelector("body");
const mode = document.querySelectorAll(".mode");
const lightMode = document.querySelector(".light");
const darkMode = document.querySelector(".dark");

mode.forEach((item) => {
  item.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (!body.classList.contains("light-mode")) {
      darkMode.style.display = "none";
      lightMode.style.display = "flex";
    } else {
      darkMode.style.display = "flex";
      lightMode.style.display = "none";
    }
  });
});
