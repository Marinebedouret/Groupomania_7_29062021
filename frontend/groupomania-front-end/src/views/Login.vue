<template>

  <div class="home">
    <img alt="Logo Groupomania" src="../assets/icon-left-font-monochrome-black.svg">
    <h1>Bienvenue sur le reseau social de l'entreprise Groupomania 😃!</h1>
    <nav>Connectez-vous <router-link to="/login" class="active"></router-link> ou <router-link to="/">créez votre compte</router-link></nav>

    <form v-on:submit.prevent="login" class="formulaire">
      <h2>Connexion</h2>

      <div class="form-group">
      <label for="email"> Email : </label>
      <input id="email" type="text" name="email" placeholder="Email" class="from-control" required v-model="input.email"/>
      </div>

      <div class="form-group">
      <label for="password"> Mot de passe : </label>
      <input id="password" type="password" name="password" placeholder="Mot de passe" required v-model="input.password"/>
      </div>

      <div class="error-message">{{message}}</div>

      <button id="login-btn" type="submit">Connexion</button>

    </form>
    <img alt="Photo reseau social" src="../assets/groupomania-reseau.png">

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',

  data() {
    return {
      input: {
        email:"",
        password: ""
      },
      message: "",
    }
  },
  methods: {
    login() {
      const email = this.input.email;
      const password = this.input.password;

      axios.post("http://localhost:3000/api/user/login",
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }

      })
      //stockage des données utilisateur dans le localstorage
      .then(response => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("id_users", JSON.stringify(response.data.userId))
        console.log(localStorage)
        this.$router.push("post");
        alert("Connexion réussi ! Vous allez être redirigé sur la page d'accueil du réseau social Groupomania !");
        window.location.href = "#/accueil"
      })
     .catch((error)=>{
       if (error.response.status === 404) {
         this.message = "Utilisateur inconnu";
       }
       if(error.response.status === 401) {
         this.message = "Email ou mot de passe invalide";
       }
       if(error.response.status === 500) {
         this.message = "Désolé le serveur ne répond pas ! Veuillez réessayer plus tard !"
       }
     });
    }
  }

}
</script>

<style scoped lang="scss">

.formulaire{
  width: 50%;
  float: right;
  padding: 0px 20px 20px 0px;
  margin: -50px auto 30px auto;
  border-left:  1px solid;
  height: 400px;
  border: 1px solid;
}

h1 {
  font-size: 20px;
  margin-left: 15px;
  width: 40%;
  text-align: center;
  float: left;
}

h2{
  font-size: 20px;
  margin-bottom: 20px;
}

a {
  color: #42b983;
}
  
input {
  margin-bottom: 10px;
  margin-top: 15px;
  width: 50%;
}

nav{
  margin-bottom: 50px;
}


label, input {
  margin-left: 30%;
  }

h2, nav {
  text-align: center;
  }

#login-btn{
border: 1px solid;
background-color: rgb(43, 42, 42);
color: white;
margin: 10px auto 30px auto;
font-size: 1rem;
display: flex;
cursor: pointer;

}

</style>
