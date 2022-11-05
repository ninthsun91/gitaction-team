import Users from "../models/user";
import Posts from "../models/post";
import Comments from "../models/comment";


const association = () => {
    Users.associate();
    Posts.associate();
    Comments.associate();
}


export default association;