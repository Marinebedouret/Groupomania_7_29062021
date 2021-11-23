const models = require('../models');
const user = require('../models/user');
const fs = require('fs');

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
        picture: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.picture,
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
        order: [['created_at', 'DESC']],
        include: ["user", "comments"]
    })
    
    .then((posts) => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
};


//Suppression du post
exports.deletePost = (req, res, next) => {
    models.Post.findOne({where: {id_post: req.params.id}})
    .then(post => {
        if(post) {
            if(post.picture != null){
                const filename = post.picture.split('/images/')[1];

                fs.unlink(`images/${filename}`, () => {
                    models.Post.destroy({where:{id_post: req.params.id}})
                })
            }
        }
    })
        .then(() => res.status(200).json({message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({error}));
};

//Modification du post
exports.modifyPost = (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    console.log('file', req.file);


    const postObject = req.file?  
    {
        ...req.body.post,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    
    models.Post.update({...postObject, id_users: req.params.id_users}, {where: {id_post: req.params.id}})
    .then(() => res.status(200).json({message: "Le post est modifié !"}))
    .catch(error => res.status(400).json({error}));
};
