<template>

  <div class="home">
    <img alt="Logo Groupomania" src="../assets/icon-left-font-monochrome-black.svg" class="logo">

    <h1>Bienvenue sur le reseau social de l'entreprise Groupomania 😃!</h1>

    <nav>Créez votre compte <router-link to="/" class="active"></router-link> ou <router-link to="/login">connectez-vous</router-link></nav>

 
    <form v-on:submit.prevent="signup" class="formulaire" >
      <h2>Inscription</h2>

      <div class="form-group col-md-6">
      <label for="firstName"> Prénom : </label>
      <input type="text" id="firstName"  name="firstName" class="form-control" placeholder="Prénom" required
      pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.first_name"/>
      </div>

      <div class="form-group col-md-6">
      <label for="name"> Nom : </label>
      <input id="name" type="text" name="name" class="form-control" placeholder="Nom" required 
      pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.name"/>
      </div>

      <div class="form-group col-md-6">
      <label for="email"> Email : </label>
      <input id="email" type="text" name="email" class="form-control" placeholder="Email" required 
      pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="input.email"/>
      </div>

      <div class="form-group col-md-6">
      <label for="password"> Mot de passe : </label>
      <input id="password" type="password" name="password" class="form-control" placeholder="Mot de passe" required
      pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="input.password"/>
      </div>
        <span> Minimum 10 caractères dont 1 majuscule, 1 minuscule et 1 chiffre</span>

      <div class="form-group col-md-6">
      <label for="passwordvalidator"> Confirmation du mot de passe : </label>
      <input id="passwordvalidator" type="password" class="form-control" name="passwordvalidator" placeholder="Confirmation mot de passe" required
      pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="input.passwordvalidator"/>
      </div>

      <div class="form-group col-md-6">
      <label for="job"> Poste occupé : </label>
      <input id="job" type="text" class="form-control" name="job" placeholder="Poste occupé" required
      pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.job"/>
      </div>

      <button id="signupBtn" type="submit" class="btn btn-primary">Inscription</button>

    </form>


    <img alt="Photo reseau social" src="../assets/groupomania-reseau.png" class="image-reseau">

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Signup',

  data(){
    return{
      input: {
        first_name: "",
        name: "",
        email: "",
        password: "",
        passwordvalidator: "",
        job: ""
      }
    }
  },
  methods: {
    signup() {
      const first_name = this.input.first_name;
      const name = this.input.name;
      const email = this.input.email;
      const password = this.input.password;
      const passwordvalidator = this.input.passwordvalidator;
      const job = this.input.job
      console.log(first_name)
      console.log(name)
      console.log(email)
      console.log(password)
      console.log(passwordvalidator)
      console.log(job)

      axios.post("http://localhost:3000/api/user/signup",
      {
        first_name,
        name,
        email,
        password,
        passwordvalidator,
        job

      },
      {
        headers: {'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      })
      .then((response) => {
        this.signup(response)
        console.log(response)
        this.$router.push("/login");

      })
     .catch((error)=>{error('Désolé le serveur ne répond pas ! Veuillez réessayer plus tard !')});
      
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
  background: #f07b58;
}

h1{
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
  margin-bottom: 50px;
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

#signupBtn{
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
  padding-right: 10%;

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






</style>
