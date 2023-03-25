const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const PostSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const CommentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', require: true }, 
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
  User,
  Todo,
  Post,
  Comment,
};
