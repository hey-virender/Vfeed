import bcrypt from "bcrypt";

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (e) {
    console.error(e);
  }
};

const compareHash = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (e) {
    console.error(e);
  }
};

export { generateHash, compareHash };
