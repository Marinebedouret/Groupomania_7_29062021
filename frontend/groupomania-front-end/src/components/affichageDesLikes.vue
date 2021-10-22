<template>
<div class="blocLike">
    <div v-for="like in likes" :key="like.id_like" >
    <button type="button" @click="createLike(post.id_post)"><i class="far fa-thumbs-up"><p>{{like.likes}}</p></i></button>
        
   
    </div>
</div>
</template>

<script>
export default{
    name:"Likes",
    data(){
        return{
            id_users:"",
            id_post:"",
            likes:"",
        }

    },
    mounted(){
         this.id_users = JSON.parse(localStorage.getItem("id_users"));
        this.isAdmin = JSON.parse(localStorage.getItem("idAdmin"));
        console.log(localStorage);
        let apiUrl = "http://localhost:3000/api/like";
        let options = {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}
        };
        fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log (data);
            this.likes = data;
            console.log(this.likes)
        })
        .catch(error => console.log(error))
    },

}
</script>
