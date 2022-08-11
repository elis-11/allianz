import { createContext, useContext, useState } from "react"
import { loadUserInLocalStorage } from "../helpers/localStorage"

const DataContext = createContext()

// this here gets me data from central context in any component
export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({ children }) => {

  // check if user is already logged in by looking it up from local storage
  const userLs = loadUserInLocalStorage()

  const [user, setUser] = useState(userLs) // use user from localstorage as default
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState("")
  const [posts, setPosts] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let response = await fetch(`${API_URL}/posts`);
  //     const postsApi = await response.json();
  //     setPosts(postsApi);
  //   };
  //   fetchData();
  // }, []);
  

  const sharedData = { 
    user, setUser, 
    users, setUsers,
    posts, setPosts,
    errors, setErrors
  }

  return <DataContext.Provider value={ sharedData }>
    {children}
  </DataContext.Provider>

}