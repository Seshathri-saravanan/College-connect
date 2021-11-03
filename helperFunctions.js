function getPostsByGroupID(posts,groupID){
    var postsByGroupID=[]
    for(var post of posts){
        if(post.groups.indexOf(groupID)!=-1){
            postsByGroupID.push(post);
        }
    }
    return post;
}

function getGroupsByUsername(groups,username){
    console.log("groups",groups,username)
    var groupsByUsername = []
    for(var group of groups){
        if(group.visibleTo.indexOf(username)!=-1){
            groupsByUsername.push(group);
        }
    }
    return groupsByUsername;
}


function getPostsByUsername(posts,groups,username){
    var groupsByUsername = getGroupsByUsername(groups,username);
    var postsByUsername = []
    for(var group of groupsByUsername){
        postsByUsername = [...postsByUsername,...getPostsByGroupID(posts,group.ID)]
    }
    return postsByUsername;
}

module.exports = {
    getPostsByGroupID,
    getGroupsByUsername,
    getPostsByUsername
}