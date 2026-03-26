import { useEffect, useState } from "react";
import { postClient } from "../clients/api";
import Post from "../components/Post";

function Feed() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        //get our posts from DB

        // const response = await postClient.get('/');
        const { data } = await postClient.get("/");
        // console.log(response.data);

        //save that in the component's state
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  //console.log(posts);


const handleSubmit = async (e) =>{
    e.preventDefault();
try{

    //make a post request to create a post ( based off the state: title and body)

   const { data } = await postClient.post('/', {title, body});
   console.log(data);
    
//add the new post to our state
setPosts([data,...posts ]);

//reset the form

setTitle('');
setBody('');

}catch(error){

}
}



  return (
    <div>
         <h1>Feed Page</h1>
      <form onSubmit={handleSubmit}>
        <h2>Leave a post here:</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          required={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br/><br/>

        <label htmlFor="body">Body:</label>

        <textarea
          type="text"
           id="body"
           required={true}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br/><br/>
        <button type="submit" >Submit</button>
      </form>

     
      {/* key should be there in map and filter functions at the top level element*/}
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Feed;
