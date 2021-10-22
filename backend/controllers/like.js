const models = require('../models');

//création de like pour les différents posts
exports.createLike = async (req, res, next) => {
    models.Like.findOne({where: {id_post: req.body.id_post, id_users: req.body.id_users}})
        const like = {
            id_users: req.body.id_users,
            id_post: req.body.id_post,
            likes: req.body.likes
        }
    models.Like.create(like)
    .then(() => res.status(201).json({message: ' Vous aimez ce post !'}))
    .catch(error => res.status(400).json({error}));
};





//Récupération de tous les likes
exports.getAllLikes = (req, res, next) => {
    models.Like.findAll({where: {id_post: req.body.id_post},
        include: ["user", "post"]
    })
    .then(likes => {
        console.log(likes);
        res.status(200).json({likes});
    })
    .catch(error => res.status(400).json ({error: "Impossible d'afficher les likes !"}))

};


