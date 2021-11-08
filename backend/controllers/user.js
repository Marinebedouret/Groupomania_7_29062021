const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

// Regex
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
const regexPassword = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

//Inscription de l'utilisateur
exports.signup = async (req, res, next) => {
    if (req.body.email == null || req.body.password == null || req.body.first_name == null || req.body.name == null) {
        return res.status(400).json({ 'error': 'Données incomplètes' });
    } 
    console.log("verification de l'user");
    console.log(req.body.password);

    if(!regexEmail.test(req.body.email)){
        return res.status(400).json({'error': 'Email non valide ! '});
    }
    if(!regexPassword.test(req.body.password)){
        return res.status(400).json({'error': 'Mot de passe non valide !'});
    }
    const user = models.User.findOne({where: {email: req.body.email}})
    .then( async user => {
        if (!user) {
            const  newUser = await models.User.create({
                first_name: req.body.first_name,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                job: req.body.job,
                isAdmin: req.body.isAdmin
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json ({error: "Problème lors de la création de l'utilisateur"}));
            
        }
    })
    .catch(error => res.status(500).json({error: 'Utilisateur déjà créé'}));          
};
        


//Connexion de l'utilisateur

exports.login = (req, res, next) => {
    models.User.findOne({where: {email: req.body.email}})
    .then(user => {
        if (!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).send({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).send({
                userId: user.id_users,
                token: jwt.sign(
                    {userId: user.id_users},
                    process.env.TOKEN,
                    { expiresIn: '24h'},
                    {isAdmin: user.isAdmin}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json ({ error}));
};

//Profil de l'utilisateur 

exports.getOneUser = (req, res, next) => {
    models.User.findOne({where: {id_users: req.params.id}})
    .then(user => {console.log(user)
        res.status(200).json(user)})
    .catch(error => res.status(500).json(error))
};

//Obtenir tous les profils des utilisateurs 

exports.getAllUser = (req, res, next) => {
    models.User.findAll()
    .then((users) => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
};


//Modification du profil
exports.modifyUser = (req, res, next) => {
   const first_name = req.body.first_name;
   const name = req.body.name;
   const email = req.body.email;
   const job = req.body.job;

   //verification des champs remplis
   if(first_name === null || first_name === '' || name === null || name === '' || email === null || email === '' || job === null || job === ""){
       return res.status(400).json ({'error' : "Les champs 'nom','prénom', 'email' et 'job' ne sont pas renseignés !"})
   }
   const userObject = req.file ?
   {
       ...req.body.user,
       picture: req.file.filename
   } :{...req.body};

   models.User.update({...userObject, id_users: req.body.id_users}, {where: {id_users: req.body.id_users}})
   .then(()=> res.status(200).json ({message: "L'utilisateur est bien modifié !"}))
   .catch(error => res.status(400).json ({error}));

};

//suppression du compte
exports.deleteUser = (req, res, next) =>{
    models.User.findOne({where: {id_users: req.body.id_users}})
    .then((user) => {
        console.log(user)
        models.User.destroy({where: {id_users: req.body.id_users}})
            .then(() => res.status(200).json({message:'Le compte est bien supprimé !'}))
            .catch(error => res.status(400).json({error: "Problème lors de la suppression de l'user"}));
    })
    .catch (error => res.status(500).json({error}));
};
