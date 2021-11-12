<template>
<div class="bloc-modale" v-if="obtenir">

    <div class="overlay" v-on:click="modale"></div>
    <div class="modale card">
        <div v-on:click="modale" class="btn-modale btn btn-danger">X</div>
        <h2>Contenu modale pour modifier un post</h2>

        <from @submit.prevent= modifiyPost()>
            <div>
            <label for="modify-title">Title : </label>
            <input id="titleModify" type="text" placeholder="modification du titre du post" />
            </div>

            <div>
                <label for="modify-text">Text : </label>
                <input id="textModify" type="text" placeholder="Modification du text du post" />
            </div>
            <button>Modifier</button>
            
        </from>
    </div>
</div>
 
</template>

<script>
//import axios from 'axios';
//import moment from 'moment';

export default {
    name: "modifyOnePost",
    props: ['obtenir', 'modale', 'id_post']
}

</script>
