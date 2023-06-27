import db from '../../knexConfig'

const findExistingUser = async (email: string) => {
  return await db('User')
    .where({email})
    .first()
}

const addNewUser = async (newUser: { username: string; email: string; password: string }) => {
    return await db('User')
      .insert(newUser)
      .returning('id')
  }
  

export {
    findExistingUser,
    addNewUser
}