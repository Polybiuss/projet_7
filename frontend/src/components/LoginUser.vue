<template lang="fr">
  <div class="login">
    <form action="get" class="login__form">
      <h2>Se connecter :</h2>
      <div class="login__form__input">
        <label for="emailLogin">Votre email : </label>
        <input type="email" v-model="dataLogin.email" name="email" id="emailLogin" />
      </div>
      <div class="login__form__input">
        <label for="passwordLogin">Votre mot de passe : </label>
        <input type="password" name="password" v-model="dataLogin.mdp" id="passwordLogin" />
      </div>
    
    <button @click.prevent="logIn" type="submit">Se connecter</button>
    </form>
  </div>
          
     
      
</template>

<script>
import router from "../router/index.js";
import axios from "axios";
export default {
  name: "LoginUser",
  data() {
    return {
      dataLogin: {
        email: null,
        mdp: null
      },
    };
  },
  methods: {
    logIn() {
      if (
        //TO DO : Vérifier par Regex
        this.dataLogin.email !== null ||
        this.dataLogin.mdp !== null
      ) {
        axios
          .post("http://localhost:3000/api/users/auth/login", this.dataLogin)
          .then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('admin', response.data.admin);
            router.push({ path: '/post' });
          })
          .catch(error => {
            console.log(error.response.data);
            alert(error.response.data.error);
            });
      } else {
        console.log("oops !");
      }
    }
  }
};
</script>

<style lang="scss">
  .login{
    width: 100%;
    margin: 5px auto;
    background-color: #FD2D01;
    border: 1px solid black;
    border-top: none;
    &__form{
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 5px;
      & button{
        font-size: 1rem;
        margin: 5px;
        border-radius: 5px;
        border: none;
      }
      &__input{
        display: flex;
        flex-flow: column;
        align-content: center;
        padding: 5px;
        & label {
          padding: 5px;
        }
        & input{
          border-radius: 5px;
          border: none;
          width: 100%;
        }
      }
    }
  }
</style>