import _ from 'lodash';
import { List } from 'immutable';

class Main {
    constructor(Post, Posts) {
        this.posts = List(Posts);
        this.post = new Post();
        this.editing = false;

        const update = (post) => {
            let change = Post.update({ oid: post._id['$oid'] }, post);
            let index = this.posts.findIndex(item => {
                return item._id === change._id;
            });
            this.posts = this.posts.set(index, change);
        };

        const create = (post) => {
            post.$save().then((saved) => {
                this.posts = this.posts.push(saved)
            });
        };

        const save = (post) => {
            if (post._id) {
                update(post);
            } else {
                create(post);
            }
            reset();
        };

        const remove = (index) => {
            var post = this.posts.get(index);
            post.oid = post._id['$oid'];
            delete post._id;
            Post.delete(post);
            this.posts = this.posts.delete(index);
        };

        const reset = () => {
            this.post = new Post();
            this.editing = false;
        };

        const active = (index) => {
            this.post = this.posts.get(index);
            this.editing = true;
        };

        this.save = save;
        this.reset = reset;
        this.active = active;
        this.remove = remove;
    }
}

Main.resolve = {
    Posts: ['Post', (Post) => {
        return Post.query().$promise;
    }]
};

Main.$inject = [ 'Post', 'Posts' ];

export default Main;
