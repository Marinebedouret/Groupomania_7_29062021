<template>
    <div class="deletePosts">
        <div>
            <p></p>
        </div>
        <div>
        <!--<button v-if="post.user.id_users == id_users || post.user.isAdmin == true" type="button"  @click="deletePost()" class="delete-btn"> Supprimer </button>-->
        </div>
    </div>
</template>

<script>
export default {
    name: "DeletePosts",
    data() {
        return{
            post: "",
            posts: [],
        }
    },
    props:{
        id_post: Number,
        id_users: Number,

    },

}
        

</script>
