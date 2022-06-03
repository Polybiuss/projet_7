<template>
  <div class="header"><router-link to="/post"><img src="../assets/logo.svg" alt="logo" class="header__img"></router-link>
    <div>
        <router-link class="profil" to="/user">Profil</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "HeaderApp",

}
</script>

<style lang="scss">
    .header{
        background-color: #FD2D01;
        padding: 5px;
        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__img{
            display: flex;
            width: 200px;
            height: 50px;
        }
        & .profil{
            text-decoration: none;
            color: black;
            
        }
    }

</style>