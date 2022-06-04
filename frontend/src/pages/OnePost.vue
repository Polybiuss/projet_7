<template>
<div v-if="userId">
  <div class="onePost">
    <div class="onePost__user" >
        <h3>{{ post.name }}</h3>
        <p>Ajouté à {{ createdDate(post.createdAt) }}</p>
    </div>
        <div class="onePost__text">
             <h2>{{ post.text }}</h2>
             <button v-on:click="isHidden = !isHidden" class="btn__modify" v-if="admin = true || userId == post.utilisateurId" placeholder="modifier votre poste">modifer votre post</button>
             <div class="onePost__text__modify" v-if="!isHidden">
                <textarea rows="5" v-model="postUpdate.text" type="text" v-if="admin = true || userId == post.utilisateurId" placeholder="modifier votre poste"></textarea>
             <div class="onePost__text__modify__button">
                 <button @click.prevent="updatePost" v-if="admin == true || userId == post.utilisateurId" type="submit">Modifer</button>
                 <button @click.prevent="deletePost" v-if="admin == true || userId == post.utilisateurId" type="submit">Supprimer</button>
             </div>
                
             </div>
        </div>
    </div>
    <h2>Commentaires</h2>
    <div v-bind:id="comment.id" v-for="comment in post.comments" :key="comment.id" class="comments">
        <div class="comments__user" v-for="(value, key) in comment.utilisateur" :key="`${ key }`">
            <h3>{{ value }}</h3>
            <p>Ajouté à {{ createdDate(comment.createdAt) }}</p>
        </div>
        <div class="comments__text">
             <h2>{{ comment.comment }}</h2>
            <router-link :to="{name: 'OneComment' , params: { id: comment.id }}" v-if="admin = true || userId == comment.utilisateurId">modifer votre commentaire</router-link>
        </div>
    </div>
        <div class="newcomment">
            <div class="newcomment__content">
                <label for="newcomment">Ajouter un commentaire</label>
                <div class="newcomment__content__modify">
                    <textarea type="text" v-model="newComment.comment" id="newcomment"></textarea>
                    <button @click.prevent="commentCreate" type="submit">Ajouté un commentaire</button>
                </div>
           
            </div>
            
        </div>
</div>
<div v-else class="not__connected">
    <h2>Vous devez vous connecté pour ce site web</h2>
    <router-link to="/">aller à la page de connexion</router-link>
    </div>    
          
</template>

<script>
import router from "../router/index.js";
import axios from "axios"
export default {
    name: "OnePost",
    data() {
        return {
            post: {
                name:null
            },
            userId: null,
            admin: null,
            newComment: {
                comment: null,
            },
            postUpdate: {
                text: null
            },
            isHidden: true,
        };
    },
    methods: {
        getOnePost() {
            const id = this.$route.params.id;
            axios
            .get(`http://localhost:3000/api/posts/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
                this.postUpdate.text = response.data.text;
                this.post.name = response.data.utilisateur.nom;
            })
            .catch(e => {
                console.log(e);
            });
        },
        commentCreate() {
            if (
                this.newComment.comment !== null
            ) {
                const postId = this.post.id;
                axios
                .post(`http://localhost:3000/api/posts/${postId}/comments`, this.newComment, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(e => {
                    console.log(e);
                });
            } else {
                console.log("error !");
            }
        },
        
        updatePost() {
        if (
            this.postUpdate.text !== null
        ) {
            const id = this.$route.params.id;
            axios
            .put(`http://localhost:3000/api/posts/${id}`, this.postUpdate, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response =>{
                console.log(response);
                window.location.reload();
            })
            .catch(e =>{
                console.log(e);
            });
        } else {
            console.log("error");
        }
    },
    deletePost() {
        const id = this.$route.params.id;
        axios
        .delete(`http://localhost:3000/api/posts/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response =>{
                console.log(response);
                alert(response.data.message);
                router.replace({ path: '/post' })
            })
            .catch(e =>{
                console.log(e);
            });
    },
    
    createdDate(timestamp) {
        var date = new Date( timestamp );
        date = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + " le " + date.toLocaleDateString("fr");
        return date;

    },
    },
    mounted() {
        this.getOnePost();
        this.userId = localStorage.getItem('userId');
        console.log(this.userId);
        this.admin = localStorage.getItem('admin');
    }
}
</script>

<style lang="scss">
h2{
    font-size: 20px;
    text-align: center;

}
    .onePost{
        background-color: #FD2D01;
        width: 60%;
        margin: 10px auto;
        padding: 5px;
        border: 1px solid black;
        &__user{
            background-color: white;
            padding: 5px;
            & p{
                font-size: 12px;
                color: rgb(0, 0, 0);
                padding: 5px;
            }
            & h3{
                padding: 5px;
            }
        }
        &__text{
            background-color: white;
            padding: 5px;
            margin-top: 5px;
            margin-bottom: 5px;
            & h2{
                padding: 5px;
                border-bottom: 1px solid black;
                text-justify: inter-character;
                overflow-wrap: break-word;
            }
            & .btn__modify{
                padding: 5px;
                display: block;
                margin: 5px 0 5px auto;
            }
            &__modify{
                padding-right: 5px;
                & textarea{
                    width: 100%;
                    
                }
                &__button{
                    text-align: center;
                    padding: 5px;
                    & button{
                        width: 45%;
                        margin: 5px;
                    }
                }
            }

        }
    }
    .comments{
        background-color: #FD2D01;
        width: 50%;
        margin: 10px auto;
        padding: 5px;
        border: 1px solid black;
        &__user{
             background-color: white;
            padding: 5px;
            & p{
                font-size: 12px;
                color: rgb(0, 0, 0);
                padding: 5px;
            }
            & h3{
                padding: 5px;
            }
        }
        &__text{
            background-color: white;
            padding: 5px;
            margin-top: 5px;
            margin-bottom: 5px;
             & h2{
                padding: 5px;
                border-bottom: 1px solid black;
                text-justify: inter-character;
                overflow-wrap: break-word;
            }
            & a{
                padding: 5px;
                text-decoration: none;
                color: black;
                display: block;
                border: 1px solid black;
                width: 40%;
                margin: 5px 0 5px auto;
                font-size: 12px;
                text-align: center;
                border-radius: 5px;
                &:hover{
                    background-color: rgb(197, 193, 193);
                }
            }
        }
    }
    .newcomment{
        width: 50%;
        margin: 20px auto;
        background: #FD2D01;
        padding: 5px;
        border: 1px solid black;
        &__content{
            background-color: white;
            padding: 5px 5px 5px 5px;
             & h3{
                border-bottom: 1px solid black;
                padding: 5px;
            }
            &__modify{
              padding-right: 5px;
              margin-top: 10px;
            & textarea{
                width: 100%;
            }
            & button{
                width: 45%;
                margin: 5px;
            }
            }
        }
    }
    .not__connected{
        text-align: center;
        margin: 20px auto;
    }

</style>