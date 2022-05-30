const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server running at port ${port}`);
});
