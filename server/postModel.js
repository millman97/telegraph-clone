module.exports = class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.name = data.name;
    this.body = data.body;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        /* const result = await db query here; */

        const posts = result.rows.map((p) => new Post(p));

        resolve(posts);
      } catch (err) {
        reject("Error retrieving posts");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        /* let postData = await db query */

        let post = new Post(postData.rows[0]);
        resolve(post);
      } catch (err) {
        reject("post not found");
      }
    });
  }

  static create(newPost) {
    return new Promise(async (resolve, reject) => {
      try {
        /* let postData = await db insert newPost */
        let post = new Post(postData.rows[0]);
        resolve(post);
      } catch (err) {
        reject("Post could not be created");
      }
    });
  }
};
