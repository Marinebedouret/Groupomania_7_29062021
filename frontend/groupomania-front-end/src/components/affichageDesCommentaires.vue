<template>

           <!-- Affichage des commentaire + création des commentaires-->
           <div class="bloc-modale" v-if="revele">

               <div class="overlay" v-on:click="toggleModale"></div>
               <div class="modale card">
                   <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                   <h2> commentaires affichage et création</h2>

                   <form @submit.prevent= newComment()>
                           <label for="new-comment">Laisser un commentaire :</label>
                           <input id="send-comment" name="newComment" type="content" placeholder="Rédiger votre commentaire" v-model="text"/>
                           <button class="btn btn-success">Envoyer</button>
                   </form>
                   <div class="comments" >
                       <div v-for="comment in comments" :key="comment.id_comment">
                           <div class="comment-infos"> Par {{comment.user.first_name}} {{comment.user.name}} le {{ dateFormat(comment.created_at)}}
                               <span>{{comment.text}}</span>
                           </div>
                       </div>

                   </div>
               </div>

           </div>

        

        <!--<div>-->
            <!--<i  @click="displayComment()"  class="far fa-comment-alt"></i>-->
            <!--<span v-if="post.comments.length > 0" class="item_length">{{post.comments.length}}</span>-->
        <!--</div>-->
        <!--<div>
            <div class="displayComment" >
                <div class="comment_infos"> 
                    <span>Posté le  </span>
                    <span>{</span>
                </div>
            
                <div class="viewText">
                     <p></p>
                </div>
            </div>
        </div>-->

    
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: "comments",
    props: ['revele', 'toggleModale', 'id_post'],
    data(){
        return{
            comment:"",
            comments: [],
            text: "",

 
        }
        
    },
    mounted(){
        this.id_users = JSON.parse(localStorage.getItem("id_users"));
        console.log(localStorage);
        this.displayComment()

    },
    methods:{
        //Affichage des commentaires
        displayComment(id){
            const id_post = id;
 
            axios.get(`http://localhost:3000/api/comment` +  "/" + id_post,
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
         
        //Affiche la date de publication au bon format
        dateFormat(date){
            if(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        //Création d'un commentaire
        newComment(id_post) {
            const text = this.text

            axios.post(`http://localhost:3000/api/comment/${id_post}`,
            {
                id_users: this.id_users,
                text,
                //id_post: this.id_post
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type' : 'application/json'
                }

            })
            .then(() => {
                //window.location.reload()

               
            })
            .catch(error => console.log(error));
        },
    }     
        
}
</script>

<style scoped lang="scss">

.bloc-modale{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay {
    background-color: rgba(0, 0, 0, 0.034);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

}
.modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top: 30%;
}

.btn-modale{
    position: absolute;
    top: 10px;
    right: 10px;

}

</style>