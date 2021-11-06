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
            <div>
                <button v-if="id_users == post.id_users || post.user.isAdmin == 'true'" type="button"  v-on:click="deletePost(post.id_post)" class="delete-btn"> Supprimer </button>
            </div>
            
        </div>
        <!--<like :id_post="post.id_post" :id_users="post.id_users"></like>-->
        <comment :id_post="post.id_post" :id_users="post.id_users"></comment>
    </div>
    

</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import comment from '../components/affichageDesCommentaires.vue'



export default {
    name: "viewAllPosts",
    components: {
        comment
  

    },
    data(){
        return {
            first_name:"",
            name: "",
            job:"",
            isAdmin:"",
            id_post: "",
            picture: "",
            id_users: localStorage.getItem('id_users'),
            posts: [],
            post: "",
     
        }
    
    },
    mounted(){
        console.log(localStorage)
        
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
        .catch(error => console.log(error))

    },
    methods:{
        
        //Affiche la date de publication au bon format
        dateFormat(date){
            if(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        //supprimer un post si isAdmin ou non 
        deletePost(id_post){
           axios.delete(`http://localhost:3000/api/post/` + id_post,
    
           {
               headers:{
                   'Content-Type': 'application/json',
                   'Authorization': "Bearer " + localStorage.getItem('token')
                    }
           })
             .then(response => {
                 console.log(response)
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