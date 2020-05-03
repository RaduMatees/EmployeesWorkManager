export interface TypeRegister {
  name: string,
  email: string,
  role: Role,
  password: string,
  password2: string
}

export interface TypeLogin {
  email: string,
  password: string,
  role: Role
}

export type Role = 'admin' | 'employee'