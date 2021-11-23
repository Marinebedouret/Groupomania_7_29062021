<template>

  <div class="home">
    <img alt="Logo Groupomania" src="../assets/icon-left-font-monochrome-black.svg" class="logo">
    <h1>Bienvenue sur le reseau social de l'entreprise Groupomania 😃!</h1>
    <nav>Connectez-vous <router-link to="/login" class="active"></router-link> ou <router-link to="/">créez votre compte</router-link></nav>

    <form v-on:submit.prevent="login" class="formulaire">
      <h2>Connexion</h2>

      <div class="form-group col-md-6">
      <label for="email"> Email : </label>
      <input id="email" type="text" name="email" placeholder="Email" class="form-control" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" 
      required v-model="input.email"/>
      </div>

      <div class="form-group col-md-6">
      <label for="password"> Mot de passe : </label>
      <input id="password" type="password" name="password" class="form-control" placeholder="Mot de passe"  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required v-model="input.password"/>
      </div>

      <div class="error-message">{{message}}</div>

      <button id="loginBtn" type="submit" class="btn btn-primary">Connexion</button>

    </form>
    <img alt="Photo reseau social" src="../assets/groupomania-reseau.png" class="image-reseau">
                       <!--Footer-->
        <div class="footer-basic">
            <p class="copyright">Company Groupomania © 2021</p>
        </div>

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
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id_users', response.data.userId);
        console.log(localStorage)
        this.$router.push('post');
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
  float: right;
  width: 50%;
  border: 1px solid;
  padding: 0px 20px 20px 0px;
  margin: auto 20px 5px 20px;
  height: 40%;
  background-color: whitesmoke;
}

h1 {
  font-size: 20px;
  width: 40%;
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
  margin-top: 5px;
}

nav{
  margin-bottom: 10px;
  width: 50%;
  float: right;
}
label{
  margin-top: 5px;
}

label, input {
  margin-left: 50%;
  text-align: center;
  }

h2, nav {
  text-align: center;
  }

#loginBtn{
border: 1px solid;
background-color: rgb(43, 42, 42);
color: white;
margin: 10px auto 30px auto;
font-size: 1rem;
display: flex;
cursor: pointer;
}
span{
  color: #a09896!important;
  padding-left: 25%;

}

.logo{
  width: 20%;
  display: flex;
  margin-bottom: 30px;

}
.image-reseau{
  margin-top: 10%;
  margin-left: 10%;

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
  .home{
    max-width: 100%;
  }
  .formulaire{
    float: none;
    padding: 10px 10px 10px 10px;
    border: none;
    background: white;
    width: 100%;
  }
  h1, nav{
    text-align: center;
    width: 100%;
    margin-left: 8%;
  }
  nav{
    padding-left: 15px;
  }
  label, input{
    margin-left: auto;
  }
  .logo{
    margin-bottom: 20px;
    width: 60%;
    margin-left: 20%;
  }
  .image-reseau{
    margin-left: 0px;
  }
  #signupBtn{
    margin: 5px 80px 0px 80px;
  }
}
@media(max-width:1024px){
  span{
    padding-left: 0px;

  }
}


</style>
