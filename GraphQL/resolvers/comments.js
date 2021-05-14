const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {

      const { username } = checkAuth(context); //our token is signed with the username,id,email info

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const post = await Post.findById(postId);

      //we add the new comment on top
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });

        await post.save();

        return post;

      } else throw new UserInputError('Post not found');

    },


    //to delete the comment, comment must be of user who is trying to delete
    async deleteComment(_, { postId, commentId }, context) {

      const { username } = checkAuth(context);

      const post = await Post.findById(postId); //to delete the comment, the post must exist
      //we delete the comment associated with the post

      if (post) {

        //comments is an array in the post object and hence, we delete the req comment through index

        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {

          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;

        } else {
          throw new AuthenticationError('Action not allowed');
        }

      } else {
        throw new UserInputError('Post not found');
      }
    }


  }

};