import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        default:'https://images.app.goo.gl/qXNeL39HFsaHAvgMA'
    },
    slug: {
        type: String,
        required: true,
        unique: true,
      },
    category:{
        type:String,
        default:'uncategorized'
    },
},{timestamps:true});

const Post = mongoose.model('Post',postSchema);
export default Post;