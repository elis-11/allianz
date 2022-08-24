import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";

export const PostList = () => {
  const { posts, user } = useDataContext();

  return (
      <div className="content">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div>
              <img src={post.image} />
              {/* <img alt="avatar" src={`https://source.unsplash.com/150x150/?nature,${index}`} /> */}
            </div>
            <div>{post.title}</div>
            <div className="data">
              {/* {post.createdAt.slice(0, 10)} by {post.author} */}
              <img className="user-avatar" src={user.avatar} /> 
              <div>
              {user.name}             {/* {post.createdAt.substring(0, 10)} by {post.author} */}
              </div>
              <div>
              {post.createdAt.slice(0, 10)} 
              </div>
            </div>
            <div>{post.description}</div>
            <div>
              <Link to={`/posts/${post.id}`} >Read more...</Link>
            </div>
          </div>
        ))}
      </div>
  );
};
