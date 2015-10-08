import _ from 'lodash';

class Main {
    constructor(Post, Posts) {
        this.posts = Posts;
        this.post = new Post();
        this.editing = false;

        const update = (post) => {
            let updated = Post.update({ oid: post._id['$oid'] }, post);
            let idx = _.findIndex(this.posts, post => post._id['$oid'] === updated._id['$oid']);
            this.posts[idx] = updated;
        };

        const create = (post) => {
            post.$save().then(saved => this.posts.push(saved));
        };

        const save = (post) => {
            if (post._id) {
                update(post);
            } else {
                create(post);
            }
            reset();
        };

        const remove = (post) => {
            post.oid = post._id['$oid'];
            delete post._id;
            Post.delete(post);
            _.remove(this.posts, post);
        };

        const reset = () => {
            this.post = new Post();
            this.editing = false;
        };

        const active = (post) => {
            this.post = Post.get({ oid: post._id['$oid'] }, post);
            this.editing = true;
        };

        this.save = save;
        this.reset = reset;
        this.active = active;
        this.remove = remove;
    }
}

Main.resolve = {
    Posts: function(Post) {
        return Post.query().$promise;
    }
};

export default Main;
