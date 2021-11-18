<template>
    <div>
         <button v-on:click="commentModale" class="btn btn-success">Modifier un commentaire</button>
         <!--Modifier un post-->
        <div class="bloc-modale" v-if="view">
            <div class="overlay" v-on:click="commentModale"></div>
                <div class="modale card">
                    <div v-on:click="commentModale" class="btn-modale btn btn-danger">X</div>
                        <h2>Modification d'un commentaire</h2>
                            <form @submit.prevent= modifyComment()>
                                    <label for="modify-text">Texte commentaire : </label>
                                    <input id="textModify" name="text_modify" type="text" placeholder="Modifier le texte" v-model="input.text"/>

                                    <button class="btn btn-success">Modifier</button>
                            </form>
                    </div>
         </div>
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    name: "modifyComment",
    props: {
        id_comment: Number
    },
    data(){
        return{
            input:{
                text: ""

            },
            view: false,
            id_users: localStorage.getItem('id_users')

        }
    },
    methods:{
        //Function pour ouvrir la fenêtre modifier un commentaire
        commentModale:function(){
            this.view = !this.view
        },
        //Modifier un commentaire
        modifyComment(){
            const text = this.input.text;
            axios.put("http://localhost:3000/api/comment/" + this.id_comment,
             {
                text
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)
                this.input = {}
                location.reload()
            })
            .catch(error => console.log(error));


        }
    }
}


</script>
