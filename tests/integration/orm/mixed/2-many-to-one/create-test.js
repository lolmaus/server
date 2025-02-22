import Helper from "./_helper";
import { Model } from "ember-cli-mirage";
import { module, test } from "qunit";

module("Integration | ORM | Mixed | Many To One | create", function(hooks) {
  hooks.beforeEach(function() {
    this.helper = new Helper();
    this.helper.schema.registerModel("foo", Model);
  });

  test("it sets up associations correctly when passing in the foreign key", function(assert) {
    let { schema } = this.helper;
    let user = schema.create("user");
    let post = schema.create("post", {
      userId: user.id
    });
    user.reload();

    assert.deepEqual(post.user.attrs, user.attrs);
    assert.equal(post.userId, user.id);
    assert.ok(user.posts.includes(post), "inverse was set");
    assert.deepEqual(user.postIds, [post.id]);

    let { db } = this.helper;
    assert.equal(db.posts.length, 1);
    assert.deepEqual(db.posts[0], { id: "1", userId: "1" });
    assert.equal(db.users.length, 1);
    assert.deepEqual(db.users[0], { id: "1", postIds: ["1"] });
  });

  test("it sets up associations correctly when passing in the association itself", function(assert) {
    let { schema } = this.helper;
    let user = schema.create("user");
    let post = schema.create("post", {
      user
    });

    assert.deepEqual(post.user.attrs, user.attrs);
    assert.equal(post.userId, user.id);
    assert.ok(user.posts.includes(post), "inverse was set");
    assert.deepEqual(user.postIds, [post.id]);

    let { db } = this.helper;
    assert.equal(db.posts.length, 1);
    assert.deepEqual(db.posts[0], { id: "1", userId: "1" });
    assert.equal(db.users.length, 1);
    assert.deepEqual(db.users[0], { id: "1", postIds: ["1"] });
  });

  test("it throws an error if a model is passed in without a defined relationship", function(assert) {
    let { schema } = this.helper;

    assert.throws(function() {
      schema.create("post", {
        foo: schema.create("foo")
      });
    }, /you haven't defined that key as an association on your model/);
  });

  test("it throws an error if a collection is passed in without a defined relationship", function(assert) {
    let { schema } = this.helper;
    schema.create("foo");
    schema.create("foo");

    assert.throws(function() {
      schema.create("post", {
        foos: schema.foos.all()
      });
    }, /you haven't defined that key as an association on your model/);
  });
});
