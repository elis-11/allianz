import { useDataContext } from "../context/DataProvider"
import '../styles/App.scss';

export const Home = () => {
  const { user } = useDataContext()

  return (
    <div className="Home">
      <h2>Home</h2>
      {user && (
        <div className="user">
          <img style={{ width: "200px" }} src={user.avatar} />
          <div>Hello {user.username} !</div>
          <div>Email: {user.email}</div>
        </div>
      )}
    </div>
  )
}
