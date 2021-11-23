<template>
    <section>
        <headers></headers>
        <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Bienvenue sur votre reseau social Groupomania!</h1>
                </div>
            </div>

            <div class="card text-center">
                <div class="card-header">
            <h2>Création d'un post</h2>
                </div>
                <div class="card-body">
                <form id="new-post">

                    <div class="form-group">
                        <label for="title" class="card-title"> Titre du post : </label>
                        <input id="title" type="text" name="title" class="form-control col-md-6" required v-model="title" placeholder="Titre de votre post"/>
                    </div>

                    <div class="form-group">
                        <label for="text"> Contenu du post : </label>
                        <input id="text" type="text" name="text" class="form-control col-md-6" required v-model="text" placeholder="Le texte de votre post"/>
                    </div>

                    <div class="form-group">
                        <input class="form-control col-md-6" id="picture" name="picture" type="file" @change="onFileSelected" accept="image/*" placeholder="Importer votre photo"/>
                    </div>
                    <div id="preview">
                        <img v-if="picturePreview" :src="picturePreview" id="preview" alt="Prévisualisation de l'image">
                    </div>
                </form>
                <div class="card-footer text-muted">
                    <button class="btn btn-link"  @click="send()">Publier</button>
                </div>
                </div>
            </div>
        </div>
        <posts/>

           <!--Footer-->
        <div class="footer-basic">
            <p class="copyright">Company Groupomania © 2021</p>
        </div>

    </section>

        
</template>
<script>
import axios from 'axios';

import headers from '../components/header.vue';
import posts from '../components/affichageDesPosts.vue';


export default{
    name:'Post',
    components: {
        headers,
        posts,

    },
    data() {
        return {
            title:"",
            text:"",
            id_users: "",
            picturePreview: null,

        }
    },
    mounted(){
        this.id_users = JSON.parse(localStorage.getItem("id_users"));
        console.log(localStorage);

     
    },
    methods: {
       onFileSelected(event) {
            console.log(event)
                this.picture = event.target.files[0];
                this.picturePreview = URL.createObjectURL(this.picture);
            },    
     
        send(){

            const formData = new FormData();
            formData.append("image", this.picture);
            formData.append("title", this.title);
            formData.append("text", this.text);
            formData.append("id_users", this.id_users);

            axios.post(`http://localhost:3000/api/post`, formData,
            {
        
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem("token"),
                }
            })
            .then(response => {
                console.log(response)
                    //this.input = {}
                    location.reload();
            })

            .catch(error => console.log(error))
        }
      
    }
}
 
</script>
<style scoped lang="scss">

.jumbotron{
    font-family:Arial, Helvetica, sans-serif;
}
input{
    margin-bottom: 10px;
    margin-top: 5px;
}
.btn-link{
    text-decoration: none;
    border: 1px solid ;
}
.card{
    position: initial;
    margin-top: 30px;
}
.footer-basic {
  padding:40px 0;
  background-color:#ffffff;
  color:#4b4c4d;
}
.footer-basic .copyright {
  margin-top:15px;
  text-align:center;
  font-size:13px;
  color:#aaa;
  margin-bottom:0;
}


</style>
