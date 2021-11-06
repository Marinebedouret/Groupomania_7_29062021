<template>
    <div>
        <!--Commentaire-->
        <div class="bloccomments">
            <textarea type="text" rows="2" id="text" name="newComment" class="from-control" v-model="text" placeholder="Ajouter un commentaire..." ></textarea>
            <button v-on:click="createComment()" type="submit" id="send_comment"> Publier </button>
        </div>
        <h2> Commentaires :</h2>
        <div class="comment">
            <div v-for="comment in comments" :key="comment.id_comment">
                <div class="comment_infos"> 
                    <span>Posté le {{ dateFormat(comment.created_at)}} </span>
                   
                </div>
                <div class="viewText">
                     <p>{{comment.text}}</p>
                </div>
            
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {

    name: "Comments",
    data() {
        return{
            comment: "",
            comments: [],
        }
    },
    props:{
        id_post: Number,
        id_users: Number
    },
    mounted() {
        //Obtenir tous les commentaires pour chaque posts
        axios.get("http://localhost:3000/api/comment/" + this.id_post,
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')}

        })
        .then(data => {
            console.log (data)
            this.comments = data;
            console.log(this.comments)
        })
        .catch(error => console.log(error))
    },
    methods: {
        //Affiche la date de publication du commentaire
        dateFormat(date){
            if(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }

        },
        //Création d'un commentaire
        createComment() {
            axios.post("http://localhost:3000/api/comment",
            {
               text: this.text,
               id_users: this.id_users,
               id_post: this.id_post
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
        }

    }
    
};

</script>
