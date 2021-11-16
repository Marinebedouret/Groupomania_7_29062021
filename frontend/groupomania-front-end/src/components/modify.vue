<template>
<div class="bloc-modale" v-if="obtenir">

    <div class="overlay" v-on:click="modale"></div>
    <div class="modale card">
        <div v-on:click="modale" class="btn-modale btn btn-danger">X</div>
        <h2>Contenu modale pour modifier un post</h2>

        <form @submit.prevent= modifiyPost()>
            <div>
            <label for="modify-title">Title : </label>
            <input id="titleModify" name="title_modify" type="text" placeholder="modification du titre du post" v-model="input.title" />
            </div>

            <div>
                <label for="modify-text">Text : </label>
                <input id="textModify" name="text_modify" type="text" placeholder="Modification du text du post" v-model="input.text"/>
            </div>
            <button>Modifier</button>
            
        </form>
    </div>
</div>
 
</template>

<script>
import axios from 'axios';


export default {
    name: "modifyOnePost",
    props: {
        obtenir: Boolean,
        modale: Function,
        id_post: Number
    },
    data(){
        return{
            input:{
            title: "",
            text:"",

            },
            post: [],
            picture:"",
            id_users: localStorage.getItem('id_users'),
        }
    },
    mounted(){

    },
    methods:{
        modifiyPost(){
            const title = this.input.title;
            const text = this.input.text;
            
            axios.put("http://localhost:3000/api/post/" + this.id_post,
            {
                title,
                text,
                id_users: this.id_users,
                id_post:this.id_post
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
                //location.reload()
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
