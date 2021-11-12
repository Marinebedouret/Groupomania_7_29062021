const models = require('../models');

//Création d'un commentaire
exports.createComment = async (req, res, next) => {
    const comment = {
        id_users: req.body.id_users,
        id_post: req.body.id_post,
        text: req.body.text,

    };
    await models.Comment.create(comment)
    .then(() => res.status(201).json({message: 'Commentaire créé'}))
    .catch(error => res.status(400).json({error}));
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({where: {id_post: req.params.id}})
    .then((comment)=> {
        models.Comment.destroy({where: {id:req.body.id_post}})
        .then(() => res.status(200).json({message: 'Commentaire supprimée'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json ({error}));
};

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
    models.Comment.findAll({where: {id_post:req.params.id},
        include: ["user", "post"]
    })
    .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}));
};

//Afficher un commentaire en fonction de l'id
exports.getOneComment = (req, res, next) => {
    models.Comment.findOne({where: {id_post: req.params.id},
        include: ["user", "post"]
    })
    
    .then((comment) => {
        console.log(comment);
        res.status(200).json(comment)
    })
    .catch(error => res.status(400).json({error}));
};

//Modification d'une commentaire utilisateur
exports.modifyComment = (req, res, next) => {

    const commentObject = req.body;

    models.Comment.update({...commentObject, id_users:req.body.id_users}, {where: {id_post: req.body.id_post}})
    .then(() => res.status(200).json({message: "Votre commentaire est modifié !"}))
    .catch(error => res.status(400).json({error}));
};
