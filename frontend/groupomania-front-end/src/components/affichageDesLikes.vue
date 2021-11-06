<template>
    <div>
        <div class="bloclikes">
            
        <button :id_post="post.id_post" :id_users="post.id_users" @click="createLike()"><i  class="far fa-thumbs-up like_btn" aria-label="Aimer le post"></i></button>
            
        </div>
        <div v-for="like in likes" :key="like.id_like" class="allLikes">
            <div class="viewLike">
                <p>{{ like.likes }}</p>
            </div>
        </div>
    </div>

    
</template>
<script>
import axios from 'axios';
export default {
    name: "Likes",
    data(){
        return{
            like: "",
            likes: [],
        }
    },
      props:{
          id_post: Number,
          id_users: Number
      },

    mounted(){
          //Obtenir tous les likes pour chaque posts
          axios.get("http://localhost:3000/api/like" + "/" + this.id_post,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }

        })
        .then(data => {
            console.log(data)
            this.likes = data;
            console.log(this.likes)
        })
        .catch(error => console.log(error))
   
    },
    methods: {
        createLike(){
            const like = this.like

           axios.post("http://localhost:3000/api/like",
           {
               like

           },
           {
               headers: {
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                    'Content-Type' : 'application/json'
                }
           })

            .then((response) => {
                console.log(response)
                if(response.ok) {
                    this.likes = {}
                } else {
                    console.log(like)
                }
            })
            .catch(error => console.log(error));
        }
    }
};

</script>
