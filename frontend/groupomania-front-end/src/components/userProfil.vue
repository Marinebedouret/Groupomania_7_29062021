<template>
    <div class="userProfil">
        <div class="infosUser">  
            <h2> Bienvenue sur votre profil, </h2>
            <span>user.name</span> <span>user.first_name</span>
        </div>
        <div class="delete_profil" @click="deleteUser()"><i class="fas fa-trash-alt"> Supprimer le compte</i> 
        </div>
        <div class="infoducompte">
            <p class="textinfos">Informations générales du compte utilisateur </p>
            <from>
                <div class="form-group">
                <label for="firstName">Prénom * </label>
                <input type="text" id="userFirstName" name="userFirstName" class="from-control" 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.first_name"/>
                </div>

                <div class="form-group">
                    <label for="Nom">Nom * </label>
                    <input type="text" id="userName" name="userName" class="from-control"
                    pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="input.name"/>
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="text" id="userEmail" name="userEmail" class="from-control" 
                    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}">
                </div>
            </from>
            

        </div>
    </div>
</template>