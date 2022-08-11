import { useEffect } from "react";
import { useDataContext } from "../../context/DataProvider";
import { getPostsApi } from "../../helpers/apiCalls";
import { PostList } from "./PostList";
import "./Posts.scss";

export const Posts = () => {
  const { posts, setPosts, errors, setErrors } = useDataContext();

  useEffect(() => {
    const loadPosts = async () => {
      // const result = await getPostsApi(user.token);
      const result = await getPostsApi();
      if (result.error) {
        return setErrors(result.error);
      }
      setErrors("");
      setPosts(result);
    };
    loadPosts();
    // }, [user]);
  }, []);

  return (
    <div className="Posts">
      <PostList />
      <div className="errors">{errors}</div>
    </div>
  );
};
