<template>
  <h1>Bienvenue sur le réseaux social Groupomania</h1>
  <div class="wrapper">
    <div class="wrapper__button">
       <div class="wrapper__button__login">
      <input type="radio" id="login" name="loginsignup" value="login"
             checked @change="isHidden = !isHidden">
      <label for="login">Connexion</label>
    </div>
    <div class="wrapper__button__signup">
      <input type="radio" id="signup" name="loginsignup" value="signup"
            @change="isHidden = !isHidden">
      <label for="signup">Inscription</label>
    </div>
    </div>
    <div class="wrapper__login" v-if="isHidden">
      <LoginUser/>
    </div>
    <div class="wrapper__signup" v-if="!isHidden">
      <SignupUser/>
    </div>
   </div>
  
</template>

<script>
import LoginUser from "../components/LoginUser.vue"
import SignupUser from "../components/SignupUser.vue"
export default {
    name: "HomeConnexion",
    components: {
        LoginUser,
        SignupUser,
    },
    data() {
      return {
        isHidden: true
      }
    }
}
</script>

<style lang="scss">
h1{
  text-align: center;
  
}
.wrapper{
  width: 50%;
  margin: auto;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  &__button{
    display: flex;
    width: 100%;
    align-items: center;
    text-align: center;
    border: 1px solid black;
    &__signup{
      background-color: rgb(180, 179, 179);
      position: relative;
      width: 100%;
       & label{
        padding: 5px;
        display: block;
        &:hover{
          cursor: pointer;
          background: #ff5938;
        }
      }
      & input{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        visibility: hidden;
        &:checked ~ label{
          background-color: #FD2D01;
        }
      }
    }
    &__login{
      background-color: rgb(180, 179, 179);
      position: relative;
      width: 100%;
      & label{
        padding: 5px;
        display: block;
        &:hover{
          cursor: pointer;
          background: #ff5938;
        }
      }
      & input{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        visibility: hidden;
        &:checked ~ label{
          background-color: #FD2D01;
        }

      }
    }
  }
  &__login{
    width: 100%;
    position: absolute;
    top: 23px;
    right: 1px;
  }
  &__signup{
    width: 100%;
    position: absolute;
    top: 23px;
    right: 1px;

  }
}

</style>