<template>
    <section>
        <headers></headers>
        <div class="title">
        <h1><img src="../assets/icon-above-font.png"></h1>
        </div>
        <div class="story">
        <h1> Groupomania est une entreprise spécialisée dans la grande distribution</h1>
        <p>Il y a 3 ans, nous étions uniquement 300 collaborateurs.<br> Aujourd'hui nous comptons plus de 600 collaborateurs et continuons de recruté depuis quelques années
        <br> Après avoir réalisé une enquête auprès de nos salariés, nous avons décidé de mettre en place le reseau social d'entreprise de Groupomania. <br>
            Il est important pour nous de privilégié le bien-être et la cohésion de nos collaborateurs</p>
        </div>

    </section>
</template>

<script>
import headers from "../components/header.vue";

export default ({
    name:"A_propos",
    components:{
        headers,
    }
})
</script>
