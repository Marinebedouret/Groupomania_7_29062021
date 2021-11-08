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

            <!-- Affichage des commentaire + création des commentaires-->

        <div class="bloccomments">
            <textarea type="text" rows="2" id="text" name="newComment" class="from-control" v-model="text" placeholder="Ajouter un commentaire..." ></textarea>
            <button v-on:click="createComment(post.id_post)" type="submit" id="send_comment"> Publier </button>
        </div>
        <div>
            <i  @click="displayComment(post.id_post)"  class="far fa-comment-alt"></i>
            <span v-if="post.comments.length > 0" class="item_length">{{post.comments.length}}</span>
        </div>
        <div>
            <div class="displayComment" v-for="comment in comments" :key="comment.id_comment">
                <div class="comment_infos"> 
                    <span>Posté le {{ dateFormat(comment.created_at)}} </span>
                    <span>{{comment.user.first_name}} {{comment.user.name}}</span>
                </div>
            
                <div class="viewText">
                     <p>{{comment.text}}</p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';




export default {
    name: "viewAllPosts",
    components: {


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
            post: "",
            comment: "",
            comments: [],
            text:"",
            
     
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
        
          //Affichage des commentaires
        displayComment(id_post){
            axios.get("http://localhost:3000/api/comment/" + id_post,

            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
        //Création d'un commentaire
        createComment(id_post) {
            axios.post(`http://localhost:3000/api/comment/` + id_post,
            {
                id_users: this.id_users,
                text: this.text,
                id_post

            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type' : 'application/json'
                }

            })
            .then(() => {
                window.location.reload()

               
            })
            .catch(error => console.log(error));
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