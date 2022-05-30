<template>
<HeaderApp/>
  <h1>{{ user.nom }}</h1>
</template>

<script>
import axios from 'axios'
import HeaderApp from '../components/HeaderApp.vue'
export default {
    name: 'ProfilUser',
    components: {
        HeaderApp,
    },
    data() {
        return {
            user: {},
            userId: null
        }
    },
    methods: {
        userProfil() {
            axios
            .get("http://localhost:3000/api/users/account", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                 }
            })
            .then(response => {
                console.log(response.data);
                this.user = response.data;
            })
            .catch(e => {
                console.log(e);
            });

        }
    },
    mounted() {
        this.userProfil();
         console.log(this.userId);
        this.admin = localStorage.getItem('admin');
    }
}
</script>

<style>

</style>