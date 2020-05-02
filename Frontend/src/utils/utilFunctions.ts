import { Errors } from '@/interfaces/errors'

const createEmptyErrorsObject = () => {
  return {
    emailError: false
  } as Errors
}

export { createEmptyErrorsObject }