<template>
    <div class="Profil">
        <headers/>
        <userProfil/>
    </div>
    
</template>
<script>
import headers from '../components/header.vue';
import userProfil from '../components/userProfil.vue';

export default {
    name: 'Profil',
    components:{
        headers,
        userProfil
    }
}

</script>
