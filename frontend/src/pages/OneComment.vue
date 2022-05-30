<template>
<HeaderApp/>
  <div v-for="content in comment" :key="content" class="comment">
      <div class="comment__user" v-for="(value, key) in content.utilisateur" :key="`${ key }`">
        <h3>{{ value }}</h3>
        <p>Ajouté à {{ createdDate(content.createdAt) }}</p>
    </div>
     <div class="comment__text">
             <h2>{{ content.comment }}</h2>
             <button v-on:click="isHidden = !isHidden" class="btn__modify" v-if="admin == true || userId == content.utilisateurId" placeholder="modifier votre poste">modifer votre post</button>
             <div class="comment__text__modify" v-if="!isHidden">
                <textarea rows="5" v-model="updateComment.comment" type="text" v-if="admin == true || userId == content.utilisateurId" placeholder="modifier votre poste"></textarea>
             <div class="comment__text__modify__button">
                 <button @click.prevent="commentUpdate(content.id)" v-if="admin == true || userId == content.utilisateurId" type="submit">Modifer</button>
                 <button @click.prevent="deleteComment(content.id)" v-if="admin == true || userId == content.utilisateurId" type="submit">Supprimer</button>
             </div>
                
             </div>
        </div>

  </div>
  
</template>

<script>
import axios from "axios"
import HeaderApp from "../components/HeaderApp.vue"
export default {
    name: "OneComment",
    components: {
        HeaderApp,
    },
    data() {
        return {
            comment: {},
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
            .get(`http://localhost:3000/api/posts/${id}/comments`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response.data);
                this.comment = response.data;
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
                color: grey;
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

</style>