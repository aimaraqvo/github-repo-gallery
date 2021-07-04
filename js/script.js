const repoList = document.querySelector(".repo-list");
const overview = document.querySelector(".overview");
const username = "aimaraqvo";

//to fetch information from your GitHub profile using the GitHub API address
const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  //console.log(data);

  //call the function displaying the user information, and pass it the JSON data as an argument
  displayGitUserInfo(data);
};

//call your function to see your results
gitUserInfo();

//to display the fetched user information on the page
const displayGitUserInfo = function (data) {
    // create a new div and give it a class of "user-info"
     const divElement = document.createElement("div");
     divElement.classList.add("user-info");
     //Inside the 5 placeholders, use the JSON data to grab the relevant properties to display on the page. Check out the response from your first function to find out which properties you need to use.
     divElement.innerHTML = `
     <figure>  
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
 `;

 //Append the div to the overview element.
   overview.append(divElement);  
   getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();

    //Log out the response and call the function
    //console.log(repoData);
    displayReposInfo(repoData);
};

//to display information about each repo.
const displayReposInfo = function(repos) {

    //loop and create a list item for each repo and give each item
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        //A class of "repo"
        repoItem.classList.add("repo");
        //An <h3> element with the repo name
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};
