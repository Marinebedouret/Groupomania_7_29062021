<template>
    <div>
        <div class="bloclikes">
            
            <button v-on:click="createLike()" type="submit" id="createLikes"> <i class="far fa-thumbs-up"></i></button>
            
        </div>
        <div v-for="like in likes" :key="like.id_like" class="allLikes">
            <div class="viewLike">
                <p>{{ like.aime }}</p>
            </div>
        </div>
    </div>

    
</template>
<script>
export default {
    name: "Likes",
    data(){
        return{
            like: "",
            likes: []
        }
    },
      props:{
        id_post: Number,
        id_users: Number
    },

    mounted(){
        //Obtenir tous les likes pour chaque posts
        let apiUrl = "http://localhost:3000/api/like/" + this.id_post;
        let options ={
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };
        console.log(apiUrl)
        console.log(options)
        fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.likes = data;
            console.log(this.likes)
        })
        .catch(error => console.log(error));
    },
    methods: {
        createLike(){
            let viewLike = {
                "like": this.like,
                "id_post": this.id_post,
                "id_users": this.id_users
            }
            let apiUrl = "http://localhost:3000/api/like"
            let options = {
                method: "POST",
                body: JSON.stringify(viewLike),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type' : 'application/json'
                }
            };
            fetch(apiUrl, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                if(response.ok) {
                    this.likes = {}
                } else {
                    console.log(viewLike)
                }
            })
            .catch(error => console.log(error));
        }
    }
};

</script>
