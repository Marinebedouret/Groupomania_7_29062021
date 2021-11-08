const db = require('../models');
const models = require('../models');
const user = require('../models/user');

//Création d'un post
exports.createdPost = async (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    if(title === null || title === '' || text === null || text === ''){
        return res.status(400).json ({error: "Champs titre et texte obligatoire pour créer un post "})
    }

    const postUser = {
        id_users: req.body.id_users,
        title: req.body.title,
        text: req.body.text,
        picture:`${req.protocol}://${req.get('host')}/images/${req.body.filename}`,
        first_name: req.body.first_name,
        name: req.body.name
    };
   await models.Post.create(postUser)
    .then(() => res.status(201).json({message: "Post créé !"}))
    .catch(error => res.status(400).json({error}));
};


//Afficher tous les posts sur le mur
exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({
        include: ["user", "comments"]
    })
    
    .then((posts) => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
};

//Afficher un post en fonctuon de l'id
exports.getOnePost = (req, res) => {
    db.Post.findByPk(req.params.id_users,
        {
            include: [
                {
                model: db.Users,
                attributes: ['first_name', 'name']
                },
                {
                    model: db.Comments,
                    attributes: ['text'],
                    include:{model: db.Users, attributes: ['first_name', 'name']}
                },
            ]
        }
    )
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));
};


//Suppression du post
exports.deletePost = (req, res, next) => {
    models.Post.destroy({where: {id_post: req.body.id_post}})
        .then(() => res.status(200).json({message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({error}));
};

//Modification du post
exports.modifyPost = (req, res, next) => {


    const postObject = req.body;
    
    models.Post.update({...postObject, id_users: req.body.id_users}, {where: {id_post: req.body.id_post}})
    .then(() => res.status(200).json({message: "Le post est modifié !"}))
    .catch(error => res.status(400).json({error}));
};
