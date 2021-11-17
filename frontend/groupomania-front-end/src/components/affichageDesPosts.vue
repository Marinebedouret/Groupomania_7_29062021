<template>
    <div class="blocposts">
    <!-- Affichage des différents posts sur l'accueil-->
    <div v-for="post in posts" :key="post.id_post" class="allposts">
        <div class="viewUser">
            <span class="info_date"> Posté le {{ dateFormat(post.created_at)}} </span>
            <span class="info_name_first_name">par {{post.user.first_name}} {{post.user.name}}</span>
            <p> Job de l'utilisateur : {{post.user.job}}</p>
            <p> {{post.user.isAdmin}}</p>
        </div>
        <div class="viewPost">
            <h3> Title : {{post.title}}</h3>
            <img src=""> Image du post : {{post.picture}}
            <p> Text du post : {{post.text}} </p>

        </div>

            <div>
                <button v-if="id_users == post.id_users || post.user.isAdmin == 'true'" type="button"  v-on:click="deletePost(post.id_post)" class="delete Post-btn"> Supprimer </button>
            </div>

 
        <modify :id_post="post.id_post"></modify>

        <i @click="displayComment(post.id_post)" v-on:click="viewComment" class="displayComment_item far fa-comment-alt">Affichage des commentaires</i>

    

        <div class="displayComment"> 
            <div v-for="comment in comments" :key="comment.id_comment" class="allComments">
                <div v-bind:showComment="showComment" v-if="showComment && post.id_post == comment.id_post">
                    <div class="comment-infos">
                        <span class="comment_name_first_name">Par {{comments.user.first_name}} {{comments.user.name}}</span> 
                        <span class="comment_date"> le {{dateFormat(comments.created_at)}}</span>
                    </div>
                        <p>Text du commentaire :{{comments.text}}</p>
                </div>
            </div>
            <div>
                <i v-if="id_users == post.id_users || post.user.isAdmin == 'true'" v-on:click="deleteComment(post.id_post)" class="delete Comment_btn far fa-trash-alt"></i>
            </div>
            
        </div>
        <comments :id_post="post.id_post"></comments>
       
        


    </div>
</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

import comments from './affichageDesCommentaires.vue';
import modify from './modify.vue';


export default {
    name: "viewAllPosts",
    components: {
         modify,
         comments
         
         
    },
    data(){
        return {
            first_name:"",
            name: "",
            job:"",
            isAdmin:"",
            id_post:"",
            id_users: localStorage.getItem('id_users'),
            picture: "",
            posts: [],
            comments:[],
            //comments:"",
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
            this.posts = response.data;
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
        deleteComment(id_post){
            axios.delete(`http://localhost:3000/api/comment/delete` + "/" + id_post,
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

.allposts{
    border: 1px solid;
    margin-bottom: 15px;



}


</style>