<template>

<div v-if="userId">
  <div class="comment" >
      <div class="comment__user">
        <h3>{{ comment.name }}</h3>
        <p>Ajouté à {{ createdDate(comment.createdAt) }}</p>
    </div>
     <div class="comment__text">
             <h2>{{ comment.comment }}</h2>
             <button v-on:click="isHidden = !isHidden" class="btn__modify" v-if="admin == true || userId == comment.utilisateurId" placeholder="modifier votre commentaire">modifer votre commentaire</button>
             <div class="comment__text__modify" v-if="!isHidden">
                <textarea rows="5" v-model="updateComment.comment" type="text" v-if="admin == true || userId == comment.utilisateurId" placeholder="modifier votre commentaire"></textarea>
             <div class="comment__text__modify__button">
                 <button @click.prevent="commentUpdate(comment.id)" v-if="admin == true || userId == comment.utilisateurId" type="submit">Modifer</button>
                 <button @click.prevent="deleteComment(comment.id)" v-if="admin == true || userId == comment.utilisateurId" type="submit">Supprimer</button>
             </div>
                
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
    name: "OneComment",
    data() {
        return {
            comment: {
                name: null
            },
            userId: null,
            admin: null,
            updateComment: {
                comment: null,
            },
            isHidden: true,
        };
    },
    methods: {
        getComment() {
            const id = this.$route.params.id;
            axios
            .get(`http://localhost:3000/api/posts/comments/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response.data);
                this.comment = response.data;
                this.updateComment.comment = response.data.comment;
                this.comment.name = response.data.utilisateur.nom;
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
    commentUpdate(id) {
            if (
                this.updateComment.comment !== null
            ) {
                axios
                .put(`http://localhost:3000/api/posts/comments/${id}`, this.updateComment, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(response => {
                    console.log(response);
                    alert(response.data.message);
                    const id = this.comment.postId;
                    router.replace({ path: `/post/${id}` })
                })
                .catch(e =>{
                    console.log(e);
                });
            } else {
                console.log("error !");
            }
        },
        deleteComment(id) {
        
        axios
        .delete(`http://localhost:3000/api/posts/comments/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response =>{
                console.log(response);
                alert(response.data.message);
                const id = this.comment.postId;
                router.replace({ path: `/post/${id}` });
            })
            .catch(e =>{
                console.log(e);
            });
    },
    },
    mounted() {
        this.getComment();
         this.userId = localStorage.getItem('userId');
        console.log(this.userId);
        this.admin = localStorage.getItem('admin');
    }

}
</script>

<style lang="scss">
.comment{
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
    .not__connected{
        text-align: center;
        margin: 20px auto;
    }

</style>