const db = require ('../dbConfig')

module.exports = class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.body = data.body;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await db.query(`SELECT * FROM posts;`)
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
        let postData = await db.query("SELECT * FROM posts WHERE id = $1;", [id]);
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
        let postData = await db.query(`INSERT INTO posts (title, author, body) VALUES ($1, $2, $3) RETURNING posts`, [newPost.title, newPost.author, newPost.body])
        let post = postData.rows[0];
        console.log(post);
        resolve(post);
      } catch (err) {
        reject("Post could not be created");
      }
    });
  }
};
