const getUserRepositories = (userName, repos) => {
  const results = []
  for (let repo in repos) {
    const isIncluded = repos[repo].find(collaborator => (collaborator.login).toLowerCase() === userName.toLowerCase())
    if (isIncluded) results.push(repo)
  }
  return results
}

module.exports = getUserRepositories