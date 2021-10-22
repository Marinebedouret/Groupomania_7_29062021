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
                    <input id="text" type="text" name="text" class="from-control" required v-model="input.contenu" placeholder="Votre texte..."/>
                </div>
                <div class="form-group">
                    <label for="picture"> Image : </label>
                    <input id="picture" name="picture" type="file" placeholder="Importer votre photo"/>
                </div>
            </form>
            <button v-on:click="send">Publier</button>


        </div>
        <posts/>



    </section>
        
</template>
<script>
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
           id_users: "",

        }
    },
    mounted(){
        this.id_users = JSON.parse(localStorage.getItem("id_users"));
        console.log(this.id_users)
    },
    methods: {
        send(){
            let post = {

                "title" : this.input.title,
                "contenu": this.input.contenu,
                "picture": this.input.picture,
                "id_users": this.id_users,
            }
            console.log(post)
            let apiUrl = "http://localhost:3000/api/post/create"
            let options = {
                method: "POST",
                body: JSON.stringify(post),
                headers: {'Authorization': "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'}
            }
            console.log(options)
            console.log(apiUrl)

            fetch(apiUrl, options)
            .then(response => response.json())
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
 
}
</script>
