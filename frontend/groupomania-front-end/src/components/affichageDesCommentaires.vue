<template>

           <!-- Affichage des commentaire + création des commentaires-->
           <div class="bloc-modale" v-if="revele">

               <div class="overlay" v-on:click="toggleModale"></div>
               <div class="modale card">
                   <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                   <h2> commentaires affichage et création</h2>

                   <div class="comments">
                       <div v-for="comment in comments" :key="comment.id_comment" class="allComments">
                           <div class="comment-infos">
                               <span class="comment_name_first_name">Par {{comment.user.first_name}} {{comment.user.name}}</span> 
                               <span class="comment_date"> le {{dateFormat(comment.created_at)}}</span>
                           </div>
                           <p>Text du commentaire :{{comment.text}}</p>
                       </div>
                  

                        <form @submit.prevent= newComment()>
                           <label for="new-comment">Laisser un commentaire :</label>
                           <input id="send-comment" name="newComment" type="content" required placeholder="Rédiger votre commentaire" v-model="input.text"/>
                           <button class="btn btn-success">Envoyer</button>
                        </form>
                    </div>
                </div>

           </div>

    
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: "comments",
    props: {
        revele: Boolean,
        toggleModale: Function,
        id_post: Number,
        //id_users:Number
        },
    data(){
        return{
            input:{
                  text: "",

            },
            //comment:"",
            comments: [],
            id_users:localStorage.getItem('id_users')
            
        }
        
    },
    mounted(){
        //Affichage des commentaires
        axios.get(`http://localhost:3000/api/comment` + "/" + this.id_post,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
    
            })
        .then(response => {
            console.log(response)
            this.comments = response.data;
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
        //Création d'un commentaire
        newComment() {
            const text = this.input.text;
            console.log(text)

            axios.post("http://localhost:3000/api/comment/" + this.id_post,
            {
                id_users: this.id_users,
                text,
                id_post: this.id_post
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type' : 'application/json'
                }

            })
            .then(() => {
                 this.input = {}
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