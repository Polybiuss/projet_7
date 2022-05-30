<template>
  <HeaderApp/>
  <LoginUser/>
  <SignupUser/>
</template>

<script>
import LoginUser from "../components/LoginUser.vue"
import SignupUser from "../components/SignupUser.vue"
import HeaderApp from "../components/HeaderApp.vue"
export default {
    name: "HomeConnexion",
    components: {
        LoginUser,
        SignupUser,
        HeaderApp
    }
}
</script>

<style>

</style>