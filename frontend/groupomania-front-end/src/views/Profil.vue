<template>
    <div class="Profil">
        <headers/>
        <div class="infosUser">
             <h2> Bienvenue <span>{{user.first_name}}</span> <span>{{user.name}}</span>, </h2>
                <p> Vous êtes inscrit sur le reseau social Groupomania depuis le <span>{{ dateFormat (user.created_at)}}</span> en tant que : {{user.job}}</p>
        </div>

        <div class="deleteprofil">

        <div @click="deleteUser()">
            <i class="fas fa-trash-alt"> Supprimer le compte</i> 
        </div>

        </div>

        <div class="infoducompte">
            <p class="textinfos">Informations générales du compte utilisateur </p>
            <form id="newProfil">
                <div class="form-group">
                    <label for="firstName">Prénom * </label>
                    <input type="text" id="userFirstName" name="userFirstName" class="form-control" 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.first_name"/>
                </div>

                <div class="form-group">
                    <label for="Nom">Nom * </label>
                    <input type="text" id="userName" name="userName" class="form-control"
                    pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.name"/>
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="text" id="userEmail" name="userEmail" class="form-control" 
                    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="input.email">
                </div>
                <div class="form-group">
                    <label for="job">Job *</label>
                    <input type="text" id="userJob" name="userJob" class="form-control"
                    pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.job"/>
                </div>
                <button v-on:click="modifyOneUser">Modifier</button>
            </form>
            
        </div>
        <div class="infopassword">
            <p lass="textinfos"> Changement de mot de passe</p>
            <form id="newPassword">
                <div class="form-group">
                    <label for="password"> Mot de passe : </label>
                    <input type="password" id="userPassword" name="userPassword" class="form-control"
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="input.password"/>
                </div>
                <div class="form-group">
                    <label for="validatorPassword"> Confirmation du mot de passe :</label>
                    <input type="password" id="userValidatorPassword" name="userValidatorPassword" class="form-control"
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="input.validatorPassword"/>
                </div>
                <!--<button v-on:click="modifyPassword">Modifier</button>-->
            </form>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import headers from '../components/header.vue';
export default {
    name: 'Profil',
    components:{
        headers,

    },
    data() {
        return {
            user:{
                id_users: localStorage.getItem("id_users"),
                first_name:"",
                name:"",
                job: "",
                created_at:"",

            },
            input: {
                first_name:"",
                name:"",
                email:"",
                job:"",
            },
        }
    },
    mounted () {
      axios.get(`http://localhost:3000/api/user/${ this.user.id_users }`,
      {
          headers:{
              'Authorization': "Bearer "+ localStorage.getItem("token"),
              'Content-Type': 'application/json'
          }

      })
        .then(response => {
            console.log(response)
            this.user.first_name = response.data.first_name;
            this.user.name = response.data.name;
            this.user.created_at = response.data.created_at;
            this.user.job = response.data.job;
        })
        .catch(error => console.log(error));
    },
    methods:{
        //Affiche la date de publication au bon format
        dateFormat(date){
            if(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        //Modification pour les informations générales du compte utilisateur
        modifyOneUser(){
            const userfirst_name = this.input.userfirst_name;
            const username = this.input.username;
            const useremail = this.input.useremail;
            const userjob = this.input.userjob;
    
            axios.put("http://localhost:3000/api/user" + "/" + this.id_users,
            {
                id_users: this.id_users,
                userfirst_name,
                username,
                useremail,
                userjob

            },
            {
                headers:{'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'}

            })
            .then((response) => {
                console.log(response)
                if(response.ok) {
                    window.location.reload();
                    this.input = {}
                } else {
                    alert(" Attention : Vous avez modifié vos informations ! ")
                }
            })
            .catch(error => console.log(error));
        }
        
    },
    //supprimer un utilisateur
        deleteUser() {
            axios.delete("http://localhost:3000/api/user/delete" + "/" + this.id_users,
            {
                id_users: this.id_users
            },
            {
                 headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            .then((response) => {
                console.log(response)
                localStorage.clear()
            })
            .then(this.$router.push("/"))
            .catch(error => console.log(error));

        }

};

</script>
