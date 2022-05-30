<template>
<HeaderApp/>
<CreatePost/>
<h1>Actualités</h1>
<div class="actuality">
<div v-for="post in posts" :key="post.id" class="actuality__post">
<router-link :to="{name: 'OnePost' , params: { id: post.id }}" >
     <div class="actuality__post__user">
          <h3>{{ post.utilisateur.nom }} </h3>
          <p>Ajouté à{{ createdDate(post.createdAt) }}</p>
     </div>
     <div class="actuality__post__content">
         <h3>
             {{ post.text }}
         </h3>
     </div>
     <div class="actuality__post__comment">
         <h4>
             {{ nmbComments(post.comments) }} commentaires
         </h4>
     </div>
</router-link>
</div>
</div>

</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost.vue"
import HeaderApp from "../components/HeaderApp.vue"
export default {
    name: "AllPost",
    components: {
        CreatePost,
        HeaderApp
    },
    data: function() {
        return {
     posts: [],
    };
    },
     methods: {
    getAllPosts() {
        axios
        .get("http://localhost:3000/api/posts", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            this.posts = response.data;
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });

    },
    createdDate(timestamp) {
        var date = new Date( timestamp );
        date = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + " le " + date.toLocaleDateString("fr");
        return date;

    },
    nmbComments(comments) {
        let nmb = 0;
        for (let i = 0; i <= comments.length; i++) { 
             nmb = i;   
        }
        return nmb;
    }
  },
    mounted() {
        this.getAllPosts();
    }
}
</script>

<style lang="scss">
    h1{
        font-size: 20px;
        text-align: center;
    }
    .actuality{
        width: 50%;
        margin: auto;
        display: flex;
        align-content: center;
        flex-flow: column;
        &__post{
            & a{
                text-decoration: none;
                color: rgb(87, 84, 84);
                display: flex;
                justify-content: center;
                flex-flow: column;
                border: 1px solid black;
                padding: 5px;
                margin-top: 20px;
                background-color: #FD2D01;
            }
            &__user{
                font-size: 12px;
                background-color: white;
                padding: 5px;
                & h3{
                    padding: 5px;
                    color: black;
                    font-size: 16px;
                }
                & p{
                    padding: 5px;
                }
            }
            &__content{
            background-color: white;
            padding: 5px;
            margin-top: 10px;
            & h3 {
                text-justify: inter-character;
                overflow-wrap: break-word;
                color: black;
            }
            }
            &__comment{
                background-color: white;
            padding: 5px;
            margin-top: 10px;
            text-align: right;
            & h4 {
                font-size: 12px;
            }
            }
        }
       
        
    }

</style>