module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        text: {
            type: Sequelize.TEXT
        }
    });
    return Post;
}