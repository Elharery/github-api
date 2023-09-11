const btn = document.getElementById("btn");
// const repoName = document.querySelector(".repo-name");
const userNameRepo = document.getElementById("userName-repo");
let user = document.getElementById("user");
const showed = document.getElementById("showedRepo")


let parent = document.querySelector(".parent")
// let req = new XMLHttpRequest();
// req.open("GET" , `https://api.github.com/users/elharery`)
// req.send()

// req.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     console.log(this.responseText);
//   }
// }
btn.addEventListener("click", () => {
  if (user.value) {
    fetch(`https://api.github.com/users/${user.value}`).then(res => {
      let data = res.json()
      // console.log(data);
      return data
      }).then(result => {
        // if (parent.innerHTML) {
          parent.innerHTML = ""
          // }
        // console.log(result);
        let userBox = document.createElement("div")
      userBox.className = "user";
      //
      let top = document.createElement("div")
      top.className = "top";
      //
      let imgDiv = document.createElement("div")
      imgDiv.className = "img";
      let img = document.createElement("img")
      img.src = result.avatar_url;
      // console.log(result.avatar_url);
      //
      let info = document.createElement("div")
      info.className = "info";
      //
      let username = document.createElement("span")
      // username.innerHTML = result[m].login;
      username.appendChild(document.createTextNode(result.login))
      // console.log(result.login);
      username.id = "username";
      username.style = "padding-top: 5px; width: fit-content; margin: 0 auto; display: block;"
      //
      let follow = document.createElement("div");
      follow.className = "follows";
      let span1 = document.createElement("span");
      // console.log(`${result.followers} Followers`);
      // span1.innerHTML = `${result[m].followers} Followers`
      span1.appendChild(document.createTextNode(`${result.followers} Followers`))
      let span2 = document.createElement("span");
      span2.style = "padding: 10px;"
      // console.log(`${result.following} Following`);
      // span2.innerHTML = `${result[m].following} Following`
      span2.appendChild(document.createTextNode(`${result.following} Following`))
      //
      if (username.innerHTML === "undefined") {
        userBox.style = "display: none;";
        // parent.innerHTML = ""
        // userBox.innerHTML = ""
        notFound()
      }
        function notFound() {
          let h3 = document.createElement("h3")
          h3.className = "notfound";
          h3.appendChild(document.createTextNode("Not Found This User Name"))
        parent.appendChild(h3)
      }
      // append
      imgDiv.appendChild(img)
      follow.appendChild(span1)
      follow.appendChild(span2)
      info.appendChild(follow)
      info.appendChild(username)
      top.appendChild(imgDiv)
      top.appendChild(info)
      userBox.appendChild(top)
      parent.appendChild(userBox)
      // document.body.appendChild(userBox)
    })
    fetch(`https://api.github.com/users/${user.value}/repos`).then(res => {
      let data = res.json()
      return data
    }).then(result => {
      console.log(result);
      let div = document.createElement("div")
      for (let j = 0; j < result.length; j++){
        // console.log(result[j]);
        div.className = "repos";
        //
        let repo = document.createElement("div")
        repo.className = "repo"
        //
        let bottomBox = document.createElement("a")
        bottomBox.className = "link";
        bottomBox.href = `https://github.com/${user.value}/${result[j].name}`
        bottomBox.appendChild(document.createTextNode(result[j].name))
        repo.appendChild(bottomBox)
        div.appendChild(repo)
        parent.appendChild(div)
      }
    })
  } else {
    alert("Please Enter A User")
    }
// user.value = ""
  
})

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
