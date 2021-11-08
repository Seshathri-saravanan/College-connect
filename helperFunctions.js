function getPostsByGroupID(posts,groupID){
    var postsByGroupID=[]
    for(var post of posts){
        for(var grp of post.groups){
            if(grp && grp.groupID==groupID)
                postsByGroupID.push(post);
        }
    }
    return postsByGroupID;
}

function getGroupsByUsername(groups,username){
    console.log("groups",groups,username)
    var groupsByUsername = []
    for(var group of groups){
        for(var user of group.visibleTo){
            if(user && user.username==username)
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