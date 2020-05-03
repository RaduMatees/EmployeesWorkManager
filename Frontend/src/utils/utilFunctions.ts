import { Errors } from '@/interfaces/errors'

const createEmptyErrorsObject = () => {
  return {
    emailError: false,
    loginError: false,
    loginPortalError: false
  } as Errors
}

export { createEmptyErrorsObject }