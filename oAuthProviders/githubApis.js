const { returnUser } = require('../utils/Auth')
const { axiosInstance } = require('./axiosInstance')

// const fetchAllRepositoriesCollaborators = async (repos, user) => {
//   // const user = await returnUser(user)
//   // console.log('user', user)

//   // Get Collaborators
//   const getCollaborators = async (repo) => {
//     return await axiosInstance.get(`/repos/BigTechEnterprise/${repo}/collaborators`)
//   }

//   try {
//     const collaboratorPromises = repos.map(repo => getCollaborators(repo))

//     const reponse = await Promise.all(collaboratorPromises)
//     const reponseData
//   } catch (err) {
//     console.error('Error fetching collaborators for each repository, ', err)
//   }

// }

const getRepositoriesFromGithub = async (req, res) => {
  // try {
  //   const response = await axiosInstance.get(`/orgs/${process.env.ORGANIZATION}/repos`)
  //   const repos = response.data.map(repo => repo.name)
  //   fetchAllRepositoriesCollaborators(repos, req.user)
  // } catch (err) {
  //   console.error('Error trying to fetch repositories, ', err.response.statusText)
  //   return
  // }

  // const members = await axiosInstance.get(`/orgs/${process.env.ORGANIZATION}/members`)
  // console.log('members', members.data)

  // const myRepos = await axiosInstance.get('/users/octocat/repos')

  // This request will retreive the user currently logged in on Github on the PC
  // So it would mainly work, however if someone would use someone else's PC it would retreive the Host's user
  // const data = await axiosInstance.get('/user')
  // const myName = data.data.login

  const user = await returnUser(req.user)
  const userName = user.name
  console.log('userName', userName)

  // const data = await axiosInstance.get(`/orgs/${process.env.ORGANIZATION}/repos`)
  const data = await axiosInstance.get(`/orgs/${process.env.ORGANIZATION}/repos`)
  const orgRepos = data.data
  console.log('orgRepos', orgRepos)
}

module.exports = { getRepositoriesFromGithub }