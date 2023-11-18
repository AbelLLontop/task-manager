const fs = require("fs");
const { comparePassword, encryptPassword } = require("../libs/encryptPassword");
const UserModel = require("../model/user");
const PUBLIC_URL = process.env.PUBLIC_URL;
class UserService {
  async getUser(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      return false;
    }
    user.set("password", undefined, { strict: false });
    return user;
  }


  async deleteFile(path) {
    try {
      fs.unlinkSync(path, (e) => console.log(e));
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateUser({
    id,
    email,
    name,
    newPassword,
    password,
    file
  }) {
    try {
      const userExist = await UserModel.findById(id);
      if (!userExist) {
        if (file) {
          this.deleteFile(file.path);
        }
        return false;
      }
      if (email && email !== userExist.email) {
        const userExistWithEmail = await UserModel.findOne({email});
        if (userExistWithEmail) {
          if (file) {
            this.deleteFile(file.path);
          }
          return false;
        }
      }
      let fileData = null;
      if (file) {
        fileData = {
          fileName: file.filename,
          url: `${PUBLIC_URL}/${file.filename}`,
        };
        if (userExist?.photo) {
          const fileName = userExist.photo.fileName;
          const pathForDelete = file.destination + "/" + fileName;
          this.deleteFile(pathForDelete);
        }
      }
      if (password) {
        const isMatch = await comparePassword(password, userExist.password);
        if (!isMatch) {
          return false;
        }
        const hash = await encryptPassword(newPassword);
        user.password = hash;
      }
      userExist.email = email || userExist.email;
      userExist.name = name || userExist.name;
      userExist.photo = fileData || userExist.photo;
      const data = await UserModel.findOneAndUpdate(userExist._id, userExist);
      data.set("password", undefined, { strict: false });
      return data;
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async deleteUser(id) {
    const user = await UserModel.findByIdAndDelete(id);
    if (user?.photo.fileName!=null) {
      const fileName = user.photo.fileName;
      const pathForDelete = file.destination + "/" + fileName;
      this.deleteFile(pathForDelete);
    }
    return user;
  }
}

module.exports = UserService;