<template>
<div>
    <button class="btn btn-success" v-on:click="toggleModale">Création d'un commentaire</button>
           <!-- création des commentaires-->
           <div class="bloc-modale" v-if="revele">
               <div class="overlay" v-on:click="toggleModale"></div>
               <div class="modale card">
                   <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                   <h2> commentaires affichage et création</h2>
                        <form @submit.prevent= newComment()>
                           <label for="new-comment">Laisser un commentaire :</label>
                           <input id="send-comment" name="newComment" type="content" required placeholder="Commentaire..." v-model="input.text"/>
                           <button class="btn btn-success">Publier</button>
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
        id_post: Number
        },
    data(){
        return{
            input:{
                  text: "",

            },
            revele: false,
            id_users:localStorage.getItem('id_users')
            
        }
        
    },
    methods:{
        
        toggleModale: function(){
            this.revele = !this.revele
        },


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