<template>
    <div>
         <i v-on:click="modale" class="fas fa-pencil-alt"></i>
         <!--Modifier un post-->
        <div class="bloc-modale" v-if="obtenir">
            <div class="overlay" v-on:click="modale"></div>
                <div class="modale card">
                    <div v-on:click="modale" class="btn-modale btn btn-danger">X</div>
                        <h2>Modifier le post</h2>
                            <form @submit.prevent= modifiyPost()>
                                <div>
                                    <input id="titleModify" name="title_modify" type="text" placeholder="Modifier le titre" v-model="input.title" />
                                </div>

                                <div>
                                    <input id="textModify" name="text_modify" type="text" placeholder="Modifier le texte" v-model="input.text"/>
                                </div>
                                    <button class="btn btn-link">Modifier</button>
                            </form>
                    </div>
         </div>
    </div>
 
</template>

<script>
import axios from 'axios';


export default {
    name: "modifyOnePost",
    props: {

        id_post: Number
    },
    data(){
        return{
            input:{
            title: "",
            text:"",

            },
            obtenir: false,
            //post: [],
            picture:"",
            id_users: localStorage.getItem('id_users'),
        }
    },
    methods:{
        //Function pour ouvrir la fenêtre modifier un post
        modale:function(){
            this.obtenir = !this.obtenir
        },

        modifiyPost(){
            const title = this.input.title;
            const text = this.input.text;
            
            axios.put("http://localhost:3000/api/post/" + this.id_post,
            {
                title,
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
.fa-pencil-alt{
    float: right;
    margin-right: 20px;
}
.btn-link{
    text-decoration: none;
    border: 1px solid ;
    margin-left: 40%;
    margin-top: 10px;

}
input {
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: 5px;
  text-align: center;
  width: 100%;
  border-radius: 10px;
}


h2{
    text-align: center;

}


</style>
