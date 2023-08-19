const btn = document.getElementById("btn");
// const repoName = document.querySelector(".repo-name");
const userNameRepo = document.getElementById("userName-repo");
let user = document.getElementById("user");
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
          userNameRepo.innerHTML = `Repos: ${user.value}`;
          parentRepos.className = "repos";
          let createReopDiv = document.createElement("div");
          createReopDiv.className = "repo";
          //
          let repoNameA = document.createElement("a");
          repoNameA.className = "repo-name";
          let repoName = document.createTextNode(result[i].name);
          repoNameA.href = `https://${user.value}.github.io/${result[i].name}`;
          repoNameA.target = "blank"
          // repoNameA.href = `https://${user.value}.github.io/${result[i].name}`;
          // repoNameA.append(document.createTextNode(result[i].name));  
          //
          createReopDiv.appendChild(repoNameA);
          parentRepos.before(userNameRepo);
          repoNameA.appendChild(repoName);
          parentRepos.appendChild(createReopDiv);
          document.body.appendChild(parentRepos);
          // repos.appendChild(createReopDiv)
        }
        user.value = "";
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
