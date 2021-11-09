function getPostsByGroupID(posts,groupID){
    var postsByGroupID=[]
    for(var post of posts){
        for(var grp of post.groups){
            if(grp && grp.groupID==groupID){
                postsByGroupID.push(post);
                break;
            }
        }
    }
    var postsSet = new Set(postsByGroupID);
    return Array.from(postsSet);
}

function getGroupsByUsername(groups,username){
    console.log("groups",groups,username)
    var groupsByUsername = []
    for(var group of groups){
        for(var user of group.visibleTo){
            if(user && user.username==username){
                groupsByUsername.push(group);
                break;
            }
        }
    }
    var groupset = new Set(groupsByUsername);
    return Array.from(groupset);
}


function getPostsByUsername(posts,groups,username){
    var groupsByUsername = getGroupsByUsername(groups,username);
    var postsByUsername = []
    for(var group of groupsByUsername){
        postsByUsername = [...postsByUsername,...getPostsByGroupID(posts,group.ID)]
    }
    var postsSet = new Set(postsByUsername);
    return Array.from(postsSet);
}

module.exports = {
    getPostsByGroupID,
    getGroupsByUsername,
    getPostsByUsername
}