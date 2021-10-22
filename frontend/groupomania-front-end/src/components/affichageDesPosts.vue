<template>
    <div class="blocposts">
    <!-- Affichage des différents posts sur l'accueil-->
    <div v-for="post in posts" :key="post.id_post" class="allposts">
        <div class="viewUser">
            <p> Posté le {{post.created_at}} par {{post.user.first_name}} {{post.user.name}}</p>
            <p> {{post.user.job}}</p>

        </div>
        <div class="viewPost">
            <h3> {{post.title}}</h3>
            <p> {{post.text}} </p>
        </div>
        <div>
            <like :id_post="post.id_post" :id_users="post.id_users"></like>
            <button type="button" @click="deletePost(post.id_post)" class="delete-btn"> Supprimer </button>

            <button type="button" @click="getOnePost(id_post)" class="button"> Voir le post</button>
        </div>
        <comment :id_post="post.id_post" :id_users="post.id_users"></comment>
    </div>
</div>

</template>

<script>
import comment from './affichageDesCommentaires.vue';
import like from './affichageDesLikes.vue';
export default {
    name: "viewAllPosts",
    components: {
        comment,
        like
    },
    data(){
        return {
            first_name:"",
            name: "",
            job:"",
            id_users:"",
            id_post:"",
            isAdmin:"",
            posts: []
        }
    
    },

    mounted(){
        this.id_users = JSON.parse(localStorage.getItem("id_users"));
        this.isAdmin = JSON.parse(localStorage.getItem("idAdmin"));
        console.log(localStorage);
        
        let apiUrl = "http://localhost:3000/api/post";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.posts = data;
            console.log(this.posts)
        })
        .catch(error => console.log(error))
    },
    methods: {
        //Suppression d'un Post
        deletePost(id_post){
            let apiUrl = `http://localhost:3000/api/post/${ id_post}`;
            let options = {
                method: "DELETE",
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }
            };
            fetch(apiUrl, options)
            .then((response) => {
                console.log(response);
                alert("Suppression du post");
                //window.location.reload();
            })
            .catch(error => console.log(error))
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