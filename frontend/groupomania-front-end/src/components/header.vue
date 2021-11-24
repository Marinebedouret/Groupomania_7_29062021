<template>
    <nav id="navBar">
      <router-link to="/accueil" ><img alt="Logo Groupomania" class="logo" src="../assets/icon-left-font-monochrome-black.svg"></router-link>  
      <ul>
        <li> <router-link to="/accueil" title="accueil">Accueil</router-link></li>
         <li> <router-link to="/apropos" title="A propos"> A propos</router-link> </li>
       <li class="menuderoulant">Mon compte <i class="fas fa-angle-down"></i>
         <ul class="sousmenu">
          <li> <router-link to="/profil" title="user" class="user"> Voir le profil </router-link></li>
          <li> <router-link to="/login" title="Disconnect"><i @click="disconnect" class="fas fa-power-off" title="Disconnect"> Se deconnecter</i></router-link></li>
         </ul>
        </li>
      </ul>
     
     
    </nav>
</template>

<script>
export default {
  name: 'headers',
  methods: {
    disconnect() {
      localStorage.clear();
      this.$router.push("/login");
      }

    }
 
}
</script>

<style scoped lang="scss">

nav{
  width: 100%;
  margin: 0 auto;
  background-color: white;
  position: sticky;
  top: 0px;
}
a{
  text-decoration: none;
}
nav ul {
  list-style-type: none;
}

nav ul li {
  float: left;
  width: 25%;
  text-align: center;
  position: relative;
}

nav ul::after{
  content: "";
  display: table;
  clear: both;
}

nav a{
  display: block;
  color: black;
  border-bottom: 2px solid transparent;
  padding: 10px 0px;
  
}

nav a:hover{
  color: orange;
  border-bottom: 2px solid gold ;
}

.sousmenu{
  display: none;
  box-shadow: 0px 1px 2px #CCC;
  background-color: white;
}

nav > ul li:hover .sousmenu {
  display: block;
}

.sousmenu li{
  float: none;
  width: 100%;
  text-align: left;
}

.sousmenu a:hover{
  border-bottom: none;
  background-color: rgba(200,200,200,0.1) ;
}
.logo{
  width: 20%;
  display: flex;
  margin-bottom: 30px;

}
@media (max-width: 425px){
 nav ul li{
   width: 50%;
    
  }
}


</style>
