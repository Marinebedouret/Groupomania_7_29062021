<template>
    <div class="blocposts">
    <!-- Affichage des différents posts sur l'accueil-->
    <div v-for="post in posts" :key="post.id_post" class="card">
        <div class="card-body">
        <div class="viewUser">
            <i v-if="id_users == post.id_users || user.isAdmin == 1" type="button"  v-on:click="deletePost(post.id_post)" class="delete Post-btn far fa-trash-alt"> </i>
            <modify v-if="id_users == post.id_users || user.isAdmin == 1" :id_post="post.id_post"></modify>

            <i class="fas fa-calendar-day"> Posté le {{ dateFormat(post.created_at)}} </i>
            <i class="fas fa-user"> {{post.user.first_name}} {{post.user.name}}</i>
            <p> Job : {{post.user.job}}</p>
            <p> {{user.isAdmin}}</p>
        </div>
        <div class="viewPost">
            <h3 class="card-title">{{post.title}}</h3>
            <p class="card-text">{{post.text}} </p>
            <img v-if="post.picture" :src="post.picture" class="img_post" :imgPostId="post.id_post" alt="Image insérée dans le post">
            

        </div>
        </div>
        
        <!--Création et affichage des commentaires-->
 
        <comments :id_post="post.id_post"></comments>
        <i @click="displayComment(post.id_post)" v-on:click="viewComment" class="displayComment_item far fa-comment-alt"></i>

    

        <div class="displayComment card-body"> 
            <div v-for="comment in comments" :key="comment.id_comment" class="allComments">
                <div v-bind:showComment="showComment" v-if="showComment && post.id_post == comment.id_post">
                    <div class="comment-infos">
                        <i class="fas fa-user"> {{comment.user.first_name}} {{comment.user.name}} </i> 
                        <i class="fas fa-calendar-day"> {{dateFormat(comment.created_at)}}</i>
                    </div>
                        <p class="text">{{comment.text}}</p>
                        <i v-if="id_users == post.id_users || user.isAdmin == 1" v-on:click="deleteComment(comment.id_comment)" class="delete Comment_btn far fa-trash-alt"></i>
                        <modifyComment v-if="id_users == post.id_users || user.isAdmin == 1" :id_comment="comment.id_comment"></modifyComment>
                </div>
            </div>
            
        </div>


    </div>
</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

import comments from './affichageDesCommentaires.vue';
import modify from './modify.vue';
import modifyComment from './modifyComment.vue';



export default {
    name: "viewAllPosts",
    components: {
         modify,
         comments,
         modifyComment
         
         
    },
    data(){
        return {
            user:"",
            first_name:"",
            name: "",
            job:"",
            id_post:"",
            id_comment:"",
            id_users: localStorage.getItem('id_users'),
            picture: "",
            picturePreview: null,
            posts: [],
            comments:[],
            comment:"",
            text:"",
            showComment: false

     
        }
    
    },
    mounted(){

        
        axios.get(`http://localhost:3000/api/post`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(response => {
            console.log(response)
            this.posts = response.data.posts;
            this.user = response.data.user;
            console.log(this.posts)
            
        })
        .catch(error => console.log(error));
    },
    
    methods:{
        //Function pour l'afficher les commentaires
        viewComment:function(){
            this.showComment =!this.showComment

        },
        //Permet d'obtenir les commentaires sous les posts en fonction de l'id_post
        displayComment(id_post){
        axios.get("http://localhost:3000/api/comment" + "/"  + id_post,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
    
            })
        .then(response => {
            console.log(response)
            this.comments = response.data;
            console.log(this.comments)
            
        })
        .catch(error => console.log(error))
    },
    
        //Supprimer un commentaire
        deleteComment(id_comment){
            axios.delete(`http://localhost:3000/api/comment/delete` + "/" + id_comment,
            {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log(response)
                location.reload()
            })
            .catch(error => console.log(error));
        },

        //ouverture de la fenêtre modale pour modifier un post

        modale: function(){
            this.obtenir = !this.obtenir
        },


        //Affiche la date de publication au bon format
        dateFormat(date){
            if(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        //supprimer un post si isAdmin ou non 
        deletePost(id_post){
           axios.delete(`http://localhost:3000/api/post/delete/` + id_post,

           {
               headers:{
                   'Authorization': 'Bearer ' + localStorage.getItem("token"),
                   'Content-Type': 'application/json',
                   
                    }
           })
             .then(response => {
                 console.log(response)
                 location.reload()
             })
            .catch(error => console.log(error));
        },
        
    },
}

</script>
<style scoped lang="scss">
.card{
    margin-bottom: 15px;
    position: initial;
}
.card-title, .card-text{
    text-align: center;
}
.fa-calendar-day{
    margin-right: 5px;
    margin-left: 5px;
}

.fa-trash-alt{
    float: right;
}
.fa-comment-alt{
    margin-left: 30px;
}
.text{
    margin-top: 15px;
}
.img_post{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}



</style>
