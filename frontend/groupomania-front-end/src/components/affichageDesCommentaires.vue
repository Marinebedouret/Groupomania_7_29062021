<template>
    <div>
        <!--Commentaire-->
        <div class="bloccomments">
            <textarea type="text" rows="2" id="text" name="newComment" class="from-control" v-model="text" placeholder="Ajouter un commentaire..." ></textarea>
            <button v-on:click="createComment()" type="submit" id="send_comment"> Publier </button>
        </div>
        <h2> Commentaires :</h2>
        <div class="comment">
            <div v-for="comment in comments" :key="comment.id_comment">
                <div class="comment_infos"> Par {{comment.user.first_name}} {{comment.user.name}} le {{comment.created_at}} 
                </div>
                <div class="viewText">
                     <p>{{ comment.text}}</p>
                </div>
            
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Comments",
    data() {
        return{
            comment: "",
            comments: [],
        }
    },
    props:{
        id_post: Number,
        id_users: Number,
    },
    mounted() {
        //Obtenir tous les commentaires pour chaque posts
        let apiUrl = "http://localhost:3000/api/comment/" + this.id_post;
        let options = {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
        };
        fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log (data)
            this.comments = data;
            console.log(this.comments)
        })
        .catch(error => console.log(error))
    },
    //création d'un commentaire
    methods: {
        createComment() {
            let textComment = {
                "text": this.text,
                "id_post": this.id_post,
                "id_users": this.id_users
            }
            let apiUrl = "http://localhost:3000/api/comment"
            let options = {
                method: "POST",
                body: JSON.stringify(textComment),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type' : 'application/json'
                }
            };
            fetch(apiUrl, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    this.text = {}
                } else {
                    alert("");
                }
            })
            .then(window.location.reload())
            .catch(error => console.log(error));
        }

    }
    
};

</script>
