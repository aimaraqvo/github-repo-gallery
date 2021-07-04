const overview = document.querySelector(".overview");
const username = "aimaraqvo";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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

//for a click event on the unordered list with a class of "repo-list."
repoList.addEventListener("click", function(e) {
//to check if the event target (i.e., the element that was clicked on) matches the <h3> element 
 if (e.target.matches("h3")) {
     // create a variable called repoName to target the innerText where the event happens
     const repoName = e.target.innerText;
     //call to getRepoInfo async function, passing repoName as an argument.
     getRepoInfo(repoName);
    }
 });

 //create and name an async function to get specific repo information that accepts repoName as a parameter.
 const getRepoInfo = async function (repoName) {
     //make a fetch request to grab information about the specific repository.
     const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
     const repoInfo = await fetchInfo.json()
    //Log out repoInfo
    console.log(repoInfo);
    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //Log out languageData
    console.log(languageData);

    // Make a list of languages
    const languages = [];
    //to loop through languageData and add the languages to the end of the array.
    for (const language in languageData) {
        languages.push(language);
      }
    console.log(languages);
    //call the function to display the repo info. Pass it the repoInfo object and the languages array.
    displayRepoInfo(repoInfo, languages);
 }

 //create and name a new function to display the specific repo information. The function should accept two parameters:  repoInfo and languages.
 const displayRepoInfo = function(repoInfo,languages) {
    //empty the HTML of the section with a class of "repo-data" where the individual repo data will appear.
    repoData.innerHTML = "";

    //Unhide (show) the "repo-data" element. Hide the element with the class of "repos".
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");

    //Create a new div element
    const divElement = document.createElement("div");
    //add the selected repository's name, description, default branch, and link to its code on GitHub
    divElement.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
    repoData.append(divElement);
 };

