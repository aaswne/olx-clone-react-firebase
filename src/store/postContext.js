import { useState, createContext } from "react";

export const PostContext = createContext(null);

export function Post({ children }) {
  const [postContent, setPostContent] = useState();

  return (
    <PostContext.Provider value={{ postContent, setPostContent }}>
      {children}
    </PostContext.Provider>
  );
}

export default Post;