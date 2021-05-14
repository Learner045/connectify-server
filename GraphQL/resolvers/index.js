const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

//resolvers are required to process each query type
module.exports = {
    Post:{ //anytime a query or mutation or subscription returns a post, it will go through this Post modifier

        likeCount(parent){
            return parent.likes.length;
        },

        commentCount(parent){
            return parent.comments.length;
        }

    },
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
    
};