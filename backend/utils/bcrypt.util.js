import bcrypt from "bcrypt"
export const hashValue = async (value, saltRounds = 7) => await bcrypt.hash(value, saltRounds)
export const compareValues = async (value, hashedValue) => await bcrypt.compare(value, hashedValue)