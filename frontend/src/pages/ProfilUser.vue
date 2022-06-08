<template>
  <div class="user">
      <div class="user__content">
          <h3>Nom de votre profil: {{ user.nom }}</h3>
          <h3>Votre adresse mail: {{ user.email }}</h3>
      </div>
      <button @click.prevent="decoUser">Se déconnecter</button>
      <button v-on:click="isHidden = !isHidden">Supprimer votre profil</button>
      <div class="user__delete" v-if="!isHidden">
          <form action="get">
          <label for="deletePassword">Pour supprimer votre profil tapez votre mot de passer et cliquer sur vérifier: </label>
          <input type="password" id="deletePassword" name="password" v-model="verif.mdp">
          <button @click.prevent="verifyProfil">vérifier</button>
          </form>
          <div v-if="verif.ok">
              <h3>Mot de passe correct, attetion tout suppression est définitive</h3>
              <button  @click.prevent="deleteUser">supprimer</button>
          </div>
      </div>

  </div>

</template>

<script>
import router from "../router/index.js";
import axios from 'axios'

export default {
    name: 'ProfilUser',

    data() {
        return {
            user: {},
            userId: null,
            verif: {
                mdp: null,
                ok: null
            },          
            updateUser: {
                mdp: null,
                nom: null,
                email: null,
            },
            isHidden: true,
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
                this.updateUser.nom = response.data.nom;
                this.updateUser.mdp = response.data.mdp;
                this.updateUser.email = response.data.email;
            })
            .catch(e => {
                console.log(e);
            });

        },
        verifyProfil() {
            axios
            .post("http://localhost:3000/api/users/account", this.verif, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {                
                    console.log(response);
                    this.verif.ok = true;
            })
            .catch(e => {
                console.log(e);
            });
        },
        deleteUser() {
            const id = this.userId;
            axios
            .delete(`http://localhost:3000/api/users/accounts/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response);
                localStorage.clear();
                router.replace({ path: '/' });
            })
            .catch(e => {
                console.log(e);
            });
        },
        decoUser() {
            localStorage.clear();
            router.replace({ path: '/' });
        }

    },
    mounted() {
        this.userProfil();
        this.userId = localStorage.getItem('userId');
        console.log(this.userId);
        this.admin = localStorage.getItem('admin');
    }
}
</script>

<style lang="scss">
    .user{
        background-color: #FD2D01;
        width: 50%;
        margin: 20px auto;
        padding: 5px;
        & button{
            width: 100%;
            margin: 10px 0;
        }
        &__content{
            padding: 5px;
            background-color: white;
            margin-bottom: 20px;
            & h3{
                padding: 5px;
            }
        }
        &__delete{
            background-color: white;
            & form{
                display: flex;
                flex-flow: column;
                & label{
                padding: 5px;
            }
            & input{
                padding: 5px;
            }
            }
            
        }
    }

</style>