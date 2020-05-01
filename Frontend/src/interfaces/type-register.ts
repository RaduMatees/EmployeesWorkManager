export interface TypeRegister {
  name: string,
  email: string,
  role: Role,
  password: string,
  password2: string
}

export type Role = 'admin' | 'employee'