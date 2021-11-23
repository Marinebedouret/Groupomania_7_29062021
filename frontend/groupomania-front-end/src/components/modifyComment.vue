<template>
    <div>
         <i v-on:click="commentModale" class="fas fa-edit">Modifier le commentaire</i>
         <!--Modifier un post-->
        <div class="bloc-modale" v-if="view">
            <div class="overlay" v-on:click="commentModale"></div>
                <div class="modale card">
                    <div v-on:click="commentModale" class="btn-modale btn btn-danger">X</div>
                        <h2>Modification d'un commentaire</h2>
                            <form @submit.prevent= modifyComment()>
                                    <input id="textModify" name="text_modify" type="text" placeholder="Modifier le commentaire.." v-model="input.text"/>

                                    <button class="btn btn-link">Modifier</button>
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

<style scoped lang="scss">
.fas{
    font-weight: 500;
}
.fa-edit{
    margin-bottom: 20px;
}
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
    background-color: rgba(0, 0, 0, 0.400);
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
.btn-link{
    text-decoration: none;
    border: 1px solid ;
    margin-left: 40%;
    margin-top: 10px;

}
input{
    width: 100%;
    border-radius: 10px;
}
h2{
    text-align: center;
    margin-bottom: 10px;
}



</style>
