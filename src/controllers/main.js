var _ = require('lodash');

var Main = function(Post, Posts) {
    var self = this;
    self.posts = Posts;
    self.editing = false;
    self.post = new Post();

    function update(post) {
        var updated = Post.update({ oid: post._id['$oid'] }, post);
        var idx = _.findIndex(self.posts, function(post) {
            return post._id['$oid'] === updated._id['$oid']
        });
        self.posts[idx] = updated;
    }

    function create(post) {
        post.$save().then(function(saved) {
            self.posts.push(saved);
        });
    }

    self.save = function save(post) {
        if (post._id) {
            update(post);
        } else {
            create(post);
        }
        self.post = new Post();
        self.editing = false;
    };

    self.delete = function(post) {
        post.oid = post._id['$oid'];
        delete post._id;
        Post.delete(post);
        _.remove(self.posts, post);
    };

    self.clear = function clear() {
        self.post = new Post();
        self.editing = false;
    };

    self.active = function active(post) {
        self.post = Post.get({ oid: post._id['$oid'] }, post);
        self.editing = true;
    };

    return self;
};

Main.resolve = {
    Posts: function(Post) {
        return Post.query().$promise;
    }
};

module.exports = Main;
