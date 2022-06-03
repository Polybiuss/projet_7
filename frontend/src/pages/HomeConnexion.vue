<template lang="fr">
  <LoginUser/>
  <SignupUser/>
</template>

<script>
import LoginUser from "../components/LoginUser.vue"
import SignupUser from "../components/SignupUser.vue"
export default {
    name: "HomeConnexion",
    components: {
        LoginUser,
        SignupUser,
    }
}
</script>

<style lang="scss">

</style>