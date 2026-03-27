import { postClient } from '../clients/api.js'

function Post({ post, setPosts }) {

    const date = new Date(post.createdAt);


    // allow user to delete post 
    const handleDelete = async () => {
        try {
            // removing post from database
            await postClient.delete(`/${post._id}`)
            // removing post from state
            setPosts(posts => posts.filter(p => p._id !== post._id))
        } catch(e) {
            console.log(e)
            alert(e.response.data.message)
        }
    }




    return (
        <div>
            <h3>Title:{post.title}</h3>
            <h4>Author:{post.author.username}</h4>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{post.body}</p>
             <button onClick={handleDelete}>X</button>
        </div>
    )
}

export default Post;