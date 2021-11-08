<template>
    <section>
        <headers></headers>
        <div>
            <h2>Création d'un post</h2>
            <form id="new-post">

                <div class="form-group">
                        <label for="title"> Titre du post : </label>
                        <input id="title" type="text" name="title" class="from-control" required v-model="input.title" placeholder="Votre titre..."/>
                </div>
                <div class="form-group">
                    <label for="text"> Contenu du post : </label>
                    <input id="text" type="text" name="text" class="from-control" required v-model="input.text" placeholder="Votre texte..."/>
                </div>
                <div class="form-group">
                    <label for="picture"> Image : </label>
                    <input id="picture" name="picture" type="file" placeholder="Importer votre photo"/>
                </div>
            </form>
            <button  @click="send()">Publier</button>
        </div>
        <posts/>



    </section>
        
</template>
<script>
import axios from 'axios';
import headers from '../components/header.vue'
import posts from '../components/affichageDesPosts.vue'

export default{
    name:'Post',
    components: {
        headers,
        posts

    },
    data() {
        return {
            input: {
                title: "",
                contenu: "",
                picture: "",
            },
            id_users: ""

        }
    },
    mounted(){
       this.id_users = JSON.parse(localStorage.getItem("id_users"));
       console.log(localStorage);
     
    },
    methods: {

        },
        send(){
            const title = this.input.title;
            const text = this.input.text;
            const picture = this.picture;
            console.log(title)
            console.log(text)
            console.log(picture)

            axios.post(`http://localhost:3000/api/post/create`,
            {
                id_users: this.id_users,
                title,
                text,
                picture
            },
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token"),
                }
            })
            .then((response) => {
                console.log(response)
                if(response.ok) {
                    window.location.reload();
                    this.input = {}
                } else {
                    alert("Félicitation pour votre nouveau post sur le reseau social Groupomania ! Nous avons hâte de le lire !");
                }
            })

            .catch(error => console.log(error))
        }
      
    }
 
</script>
