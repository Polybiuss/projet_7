<template>
<div class="signup">
    <form action="get" class="signup__form">
      <h1>S'inscrire :</h1>
      <div class="signup__form__input">
        <label for="name">Votre nom : </label>
        <input type="text" v-model="dataSignup.nom" name="name"/>
      </div>
      <div class="signup__form__input">
        <label for="email">Votre email : </label>
        <input type="text" v-model="dataSignup.email" name="email"/>
      </div>
      <div class="signup__form__input">
        <label for="password">Votre mot de passe : </label>
        <input type="password" v-model="dataSignup.mdp" name="password"/>
      </div>
        <button @click.prevent="SignIn" type="submit">Sinscrire</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "SignupUser",
    data() {
        return {
            dataSignup: {
                nom: null,
                email: null,
                mdp: null
            },
        };
    },
    methods: {
        SignIn() {
            if (
                this.dataSignup.nom !== null ||
                this.dataSignup.email !== null ||
                this.dataSignup.mdp !== null
            ) {
                axios
                .post("http://localhost:3000/api/users/auth/signup", this.dataSignup)
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error));
            }   else {
                console.log("error !");
            }
        }
    }

};
</script>

<style lang="scss">
.signup{
    width: 55%;
    margin: 5px auto;
    background-color: #FD2D01;
    border: 1px solid black;
    &__form{
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 5px;
      & button{
        font-size: 2rem;
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
        & input {
            border-radius: 5px;
            border: none;
            font-size: 2rem;
        }
      }
    }
  }

</style>