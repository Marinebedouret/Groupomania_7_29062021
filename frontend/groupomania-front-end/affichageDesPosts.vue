<template>
    <div class="blocposts">
    <!-- Affichage des différents posts sur l'accueil-->
    <div v-for="post in posts" :key="post.id_post" class="allPosts">
        <div class="viewUser">
            <span class="info_date"> Posté le {{ dateFormat(post.created_at)}} </span>
            <i class="fas fa-user"> {{post.user.first_name}} {{post.user.name}}</i>
            <p> Job : {{post.user.job}}</p>
            <p> {{post.user.isAdmin}}</p>
        </div>
        <div class="viewPost">
            <h3>{{post.title}}</h3>
            <img src=""> Image du post : {{post.picture}}
            <p>{{post.text}} </p>

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
                        <span class="comment_name_first_name">Par {{comment.user.first_name}} {{comment.user.name}}</span> 
                        <span class="comment_date"> le {{dateFormat(comment.created_at)}}</span>
                    </div>
                        <p>Text du commentaire :{{comment.text}}</p>
                        <i v-if="id_users == post.id_users || post.user.isAdmin == 'true'" v-on:click="deleteComment(comment.id_comment)" class="delete Comment_btn far fa-trash-alt"></i>
                        <modifyComment v-if="id_users == post.id_users || post.user.isAdmin == 'true'" :id_comment="comment.id_comment"></modifyComment>
                </div>
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
            first_name:"",
            name: "",
            job:"",
            isAdmin:"",
            id_post:"",
            id_comment:"",
            id_users: localStorage.getItem('id_users'),
            picture: "",
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
.allPosts{
    text-align: center;
}




</style>