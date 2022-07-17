const tweeter = Tweeter();
const render = Render();
tweeter.addComment("p2", "new comment");
render.renderPosts(tweeter.getPosts());
$(".mainbutton").on("click", function () {
  tweeter.addPost($(".mainInput").val());
  render.renderPosts(tweeter.getPosts());
});
function Tweeter() {
  let postIdCounter = 1;
  let commentIdCounter = 1;
  let posts = [];
  const getPosts = function () {
    return posts;
  };
  const addPost = function (text) {
    if (text == "") return;
    const newPost = {
      text: text,
      id: "p" + postIdCounter,
      comments: [],
    };
    posts.push(newPost);
    postIdCounter++;
  };
  const addComment = function (PostID, text) {
    for (post of posts) {
      if (post.id == PostID) {
        post.comments.push({ id: "c" + commentIdCounter, text: text });
        commentIdCounter++;
      }
    }
  };
  const removePost = function (postID) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id == postID) {
        posts.splice(i, 1);
      }
    }
  };
  const removeComment = function (postID, commentID) {
    for (post of posts) {
      if (post.id == postID) {
        for (let i = 0; i < post.comments.length; i++) {
          if (post.comments[i].id == commentID) {
            post.comments.splice(i, 1);
          }
        }
      }
    }
  };

  return {
    getPosts: getPosts,
    addPost: addPost,
    removePost: removePost,
    addComment: addComment,
    removeComment: removeComment,
  };
}
function Render() {
  let = 0;
  const refreshRender = function () {
    $("#postArea").empty();
  };
  const renderPosts = function (thisPosts) {
    refreshRender();
    for (post of thisPosts) {
      $("#postArea").append(
        `<h3 class="post"   data-number=${post.id}>${post.text}</h3>`
      );
      let renderComments = [];
      for (i = 0; i < post.comments.length; i++) {
        renderComments.push(post.comments[i].text);
        $("#postArea")
          .append(
            `<li class="comment" id=${post.comments[i].id} data-commentId=${post.comments[i].id} data-number=${post.id}>${renderComments[i]}</li>`
          )
          .css("margin-left", "10px", "margin", "10px");
        addAction($(`#${post.comments[i].id}`));
      }
      $("#postArea").append(
        `<input class="incomment" id=pInput${post.id} placeholder="got something to say?" data-number=${post.id}>`
      );
      $("#postArea").append(
        `<button class="subcomment" id=pSub${post.id} data-number=${post.id}>comment</button>`
      );
      addAction($(`#pSub${post.id}`));
      $("#postArea").append(
        `<button class="delete" id=pDelete${post.id} data-number=${post.id}>delete post</button>`
      );
      addAction($(`#pDelete${post.id}`));
    }
  };
  return {
    renderPosts: renderPosts,
  };
}

function addAction(id) {
  if (id.attr("id").startsWith("pDelete")) {
    id.on("click", function () {
      let allkids = $("#postArea").children();
      for (kid of allkids) {
        if ($(kid).data().number == $(this).data().number) {
          $(kid).remove();
        }
      }
      tweeter.removePost($(this).data().number);
    });
  } else if (id.attr("id").startsWith("pSub")) {
    id.on("click", function () {
      for (thePost of tweeter.getPosts()) {
        if ($(this).data().number == thePost.id) {
          if ($(`#pInput${thePost.id}`).val() == "") return;
          tweeter.addComment(thePost.id, $(`#pInput${thePost.id}`).val());
          render.renderPosts(tweeter.getPosts());
          break;
        }
      }
    });
  } else if (id.attr("id").startsWith("c")) {
    id.on("click", function () {
      for (thePost of tweeter.getPosts()) {
        if (thePost.id == $(this).data().number) {
          tweeter.removeComment(thePost.id, $(this).attr("id"));
          render.renderPosts(tweeter.getPosts());
        }
      }
    });
  }
}
