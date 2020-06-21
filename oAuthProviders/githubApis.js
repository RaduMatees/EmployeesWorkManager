const { returnUser } = require('../utils/Auth')
const { axiosInstance } = require('./axiosInstance')
const getUserRepositories = require('../utils/getUserRepositories')

const fetchAllRepositoriesCollaborators = async (reposName, reqUser) => {
  const user = await returnUser(reqUser)

  // Get Collaborators
  const getCollaborators = async (repo) => {
    return await axiosInstance.get(`/repos/BigTechEnterprise/${repo}/collaborators`)
  }

  try {
    const collaboratorPromises = reposName.map(repo => getCollaborators(repo))
    const response = await Promise.all(collaboratorPromises)

    const repositoriesCollaborators = {}
    response.forEach((repo, index) => repositoriesCollaborators[reposName[index]] = repo.data)

    return getUserRepositories(user.name, repositoriesCollaborators)
  } catch (err) {
    console.error('Error fetching collaborators for each repository, ', err)
  }

}

const getRepositoriesFromGithub = async (req, res) => {
  try {
    const response = await axiosInstance.get(`/orgs/${process.env.ORGANIZATION}/repos`)
    const reposName = response.data.map(repo => repo.name)

    const userRepositories = await fetchAllRepositoriesCollaborators(reposName, req.user)
    console.log('userRepositories', userRepositories)
    console.log('response,', response)
  } catch (err) {
    console.error('Error trying to fetch repositories, ', err.response.statusText)
    return
  }
}

const getMembersFromGithub = async (req, res) => {
  // const data = await axiosInstance.get(`/orgs/${process.env.ORGANIZATION}/repos`)
  // const orgRepos = data.data
  // console.log('orgRepos', orgRepos)
}

module.exports = { getRepositoriesFromGithub, getMembersFromGithub }