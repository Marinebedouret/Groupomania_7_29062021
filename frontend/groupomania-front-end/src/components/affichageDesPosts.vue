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
                <button v-if="id_users == post.id_users || post.user.isAdmin == 'true'" type="button"  v-on:click="deletePost(post.id_post)" class="delete-btn"> Supprimer </button>
            </div>

 
        <modify :id_post="post.id_post" :id_users="post.id_users"  v-bind:obtenir="obtenir" v-bind:modale="modale"></modify>
        <div  v-if="id_users == post.id_users || post.user.isAdmin == 'true'" :id_post="post.id_post" v-on:click="modale" class="btn btn-success">Bouton pour modifier post</div>
        <!--<like :id_post="post.id_post" :id_users="post.id_users"></like>-->
        <div class="container my-5">
       

        <comments :id_post="post.id_post" v-bind:revele="revele" v-bind:toggleModale="toggleModale"></comments>
        <div v-on:click="toggleModale" class="btn btn-success">Commentaires</div>
        </div>

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
         comments,
         modify
         
         
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
            text:"",
            revele: false,
            obtenir: false

     
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
        //Ouverture de la fenêtre modale
        toggleModale: function(){
            this.revele = !this.revele
        },

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
        modifiyPost(id_post){
            axios.put(`http:/localhost:3000/api/post/` + id_post,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
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