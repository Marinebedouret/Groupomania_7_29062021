<template>
    <div class="blocposts">
    <!-- Affichage des différents posts sur l'accueil-->
    <div v-for="post in posts" :key="post.id_post" class="allposts">
        <div class="viewUser">
            <p> Posté le {{post.created_at}} par {{post.user.first_name}} {{post.user.name}}</p>
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
                <button v-if="post.user.id_users == id_users || post.user.isAdmin == true" type="button"  @click="deletePost(post.id_post)" class="delete-btn"> Supprimer </button>
            </div>
            
            
        </div>
        <like :id_post="post.id_post" :id_users="post.id_users"></like>
        <comment :id_post="post.id_post" :id_users="post.id_users"></comment>
    </div>
</div>

</template>

<script>
import axios from 'axios';
import comment from './affichageDesCommentaires.vue';
import like from './affichageDesLikes.vue';

export default {
    name: "viewAllPosts",
    components: {
        comment,
        like,

    },
    data(){
        return {
            first_name:"",
            name: "",
            job:"",
            isAdmin:"",
            //id_post: "",
            //id_users: "",
            posts: [],
            post: ""
        }
    
    },
    props:{
        id_users: Number,
        id_post:Number

    },
    mounted(){
        this.id_users = JSON.parse(localStorage.getItem("id_users"));
        console.log(this.id_users)
        

        axios.get(`http://localhost:3000/api/post`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token") ,
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
        deletePost(id_post){
           axios.delete(`http://localhost:3000/api/post/${id_post}`,
           {
               id_users: this.id_users,
               id_post: this.id_post,
           },
           {
               headers:{
                   'Authorization': "Bearer " + localStorage.getItem("token"),
                    'Content-Type': 'application/json'}
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