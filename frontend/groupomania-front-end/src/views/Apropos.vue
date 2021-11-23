<template>
    <section>
        <headers></headers>
        <div class="text-center">
        <img class="rounded mx-auto d-block" src="../assets/icon-above-font.png">
        </div>
        <div class="card">
            <div class="card-body">
        <h1 class="card-title"> Groupomania est une entreprise spécialisée dans la grande distribution</h1>
        <p class="card-text">Il y a 3 ans, nous étions uniquement 300 collaborateurs.<br> Aujourd'hui nous comptons plus de 600 collaborateurs et continuons de recruté depuis quelques années
        <br> Après avoir réalisé une enquête auprès de nos salariés, nous avons décidé de mettre en place le reseau social d'entreprise de Groupomania. <br>
            Il est important pour nous de privilégié le bien-être et la cohésion de nos collaborateurs</p>
            </div>
        </div>
                   <!--Footer-->
        <div class="footer-basic">
            <p class="copyright">Company Groupomania © 2021</p>
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
<style scoped lang="scss">
.card{
    border: none;
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
@media (max-width: 768px){
    .rounded{
        width: 50%;
    }
}


</style>