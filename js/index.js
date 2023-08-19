const btn = document.getElementById("btn");
// const repoName = document.querySelector(".repo-name");
const userNameRepo = document.getElementById("userName-repo");
let user = document.getElementById("user");
const showed = document.getElementById("showedRepo")


// function showSetTime() {
//   showed.style.opacity = "0";
// }

// function showRepo() {
//   showed.style.opacity = "1";
// }

btn.onclick = () => {
  if (user.value) {
    fetch(`https://api.github.com/users/${user.value}/repos`)
      .then((res) => {
        let myData = res.json();
        console.log(myData);
        return myData;
      })
      .then((result) => {
        let parentRepos = document.createElement("div");
        let userNameRepo = document.createElement("A");
        // parentRepos.style.background = "#eee";
        for (let i = 0; i < result.length; i++) {
          userNameRepo.id = "userName-repo";
          userNameRepo.innerHTML = `Repositories : ${user.value}`;
          parentRepos.className = "repos";
          let createReopDiv = document.createElement("div");
          createReopDiv.className = "repo";
          //
          let repoNameA = document.createElement("a");
          repoNameA.className = "repo-name";
          let repoName = document.createTextNode(result[i].name);
          repoNameA.href = `https://${user.value}.github.io/${result[i].name}`;
          repoNameA.target = "blank"
          createReopDiv.appendChild(repoNameA);
          parentRepos.before(userNameRepo);
          repoNameA.appendChild(repoName);
          parentRepos.appendChild(createReopDiv);
          document.body.append(parentRepos);
          // repos.appendChild(createReopDiv)
        }
        user.value = "";
        // showRepo()
        // setTimeout(() => {
        //   showed.style.opacity = "0";
        // }, 2000)
      });
  } else {
    alert("Please Write A Repo");
  }
};


document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
