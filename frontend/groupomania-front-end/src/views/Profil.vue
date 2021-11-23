<template>
    <div class="Profil">
        <headers/>
        <div class="userProfil">
        <div class="infosUser">
             <h2> Bienvenue <span>{{user.first_name}}</span> <span>{{user.name}}</span> sur votre profil, </h2>
                <p> Nous vous comptons parmi nous depuis le <span>{{ dateFormat (user.created_at)}}</span> pour un job <span> {{user.job}} </span></p>
        </div>

        <div class="deleteprofil">

        <div class="delete_item">
            <i v-on:click="deleteUser" class="fas fa-trash-alt"> Supprimer le compte</i> 
        </div>

        </div>

        <div class="infoducompte">
            <p class="textinfos">Informations générales du compte utilisateur </p>
            <form id="newProfil">
                <div class="form-group">
                    <label for="firstName">Prénom * : </label>
                    <input type="text" id="userFirstName" name="userFirstName"  
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.first_name"/>
                </div>

                <div class="form-group">
                    <label for="Nom">Nom * : </label>
                    <input type="text" id="userName" name="userName"
                    pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.name"/>
                </div>

                <div class="form-group">
                    <label for="email">Email * : </label>
                    <input type="text" id="userEmail" name="userEmail"
                    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" placeholder="email@groupomania.com" v-model="input.email">
                </div>
                <div class="form-group">
                    <label for="job">Job * : </label>
                    <input type="text" id="userJob" name="userJob"
                    pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.job"/>
                </div>
                <button v-on:click="modifyOneUser">Modifier</button>
            </form>
            
        </div>
        </div>
                   <!--Footer-->
        <div class="footer-basic">
            <p class="copyright">Company Groupomania © 2021</p>
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
                userfirst_name:"",
                username:"",
                useremail:"",
                userjob:"",
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
        //supprimer un utilisateur
        deleteUser() {
    
            axios.delete(`http://localhost:3000/api/user/delete/${ this.user.id_users }`,

            {
                headers:{'Authorization': "Bearer "+ localStorage.getItem("token"),
                'Content-Type': 'application/json'}

            })
            .then(response => {
                console.log(response)
                localStorage.clear()
                this.$router.push("/")
            })
            .catch(error => console.log(error));

        },
        //Affiche la date de publication au bon format
        dateFormat(date){
            if(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        //Modification pour les informations générales du compte utilisateur
        modifyOneUser(){
            const first_name = this.input.first_name;
            const name = this.input.name;
            const email = this.input.email;
            const job = this.input.job;
    
            axios.put("http://localhost:3000/api/user" + "/" + this.user.id_users,
            {
                id_users: this.user.id_users,
                first_name,
                name,
                email,
                job

            },
            {
                headers:{'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'}

            })
            .then((response) => {
                console.log(response)
                if(response.ok) {
                    this.input = {}
                    location.reload();
                } else {
                    alert(" Attention : Vous allez modifié vos informations ! ")
                }
            })
            .catch(error => console.log(error));
        },

        
    },
    
};

</script>

<style scoped lang="scss">
.userProfil{
    display: flex;
    flex-direction: column;
    min-width: 30%;
    max-width: 50%;
    margin: 3rem auto;
    font-family:Arial, Helvetica, sans-serif

}

span{
    color: #f3976c ;
}
.infosUser{
    float: left;

}

.delete_item{
    display: flex;
    float: right;
    cursor: pointer;
    padding: 15px;

}
.infoducompte, .infopassword {
    text-align:  center;
    border: 2px solid black;
    padding-bottom: 10px;
    

}
.infoducompte{
    margin-bottom: 30px;
}
.textinfos{
    padding-top: 5px;
    padding-bottom: 5px ;
    border: none;
    border-bottom: 2px solid #f3976c;
    border-top: 2px solid #f3976c;
    font-size: 18px;
    background-color: #f3976c;
    color: #fff!important;
    

}

label{
    display: inline-block;
    width: 130px;
}
input{
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin-bottom: 5px;
}
button{
    color: #fff!important;
    border: none;
    border-radius: 5px;
    background: #f3976c;
    margin-left: 70%;
    font-weight: 700;
    padding: 12px 18px 12px 18px;
    font-size: 13px;
    
    &:hover, &:focus {
			border: 1px solid #7e1b04;
            cursor: pointer;
    }
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
@media(max-width:425px){
    .userProfil{
        max-width: none;
        
    }
    label{
        width: 100px;
    }
    button{
        margin-left: 0;
    }
    

}



</style>
