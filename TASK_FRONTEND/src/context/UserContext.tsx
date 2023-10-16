import { createContext, useContext, useEffect, useState } from "react";

interface User {
  image: string;
  changeImage: (image: string, file: File) => void;
}
const UserContext = createContext<User>({
  image: "",
  changeImage: () => {
    ("");
  },
});
export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState("");
  const [file, setImageFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/perfile.png")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImage(url);
      });
  }, []);

  const changeImage = (image: string, file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setImage(imageUrl);
    } else {
      setImage(image);
    }
  };
  return (
    <UserContext.Provider value={{ image, changeImage }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
