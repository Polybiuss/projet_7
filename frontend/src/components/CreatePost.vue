<template>
<div class="newpost">
    <form action="get" class="newpost__form">
        <label for="newpost">Nouvelle Publication</label>
        <textarea name="newpost" id="newpost" cols="30" rows="5" v-model="NewPost.text"></textarea>
        <button @click.prevent="PostCreate" type="submit">Postez</button>
    </form>
 
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "CreatePost",
    data() {
        return {
            NewPost: {
                text: null
            },
        };
    },
    methods: {
        PostCreate() {
            if (
                this.NewPost.text !== null
            ) {
                axios
                .post("http://localhost:3000/api/posts/add", this.NewPost, {
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
        }
    }
};
</script>

<style lang="scss">
    .newpost{
        width: 50%;
        margin: 10px auto;
        text-align: center;
        border: 1px solid black;
        background-color: #FD2D01;
        padding: 5px;
        &__form{
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-flow: column;
            background-color: rgb(255, 255, 255);
            padding: 5px;
            & label{
                font-size: 26px;
            }
            & textarea{
                border: 1px solid #c5c1c1;
                border-radius: 5px;
                width: 100%;
            }
            & button{
                width: 100%;
                border-radius: 5px;
                border: 1px solid black;
                padding: 5px;
                font-size: 26px;
                text-justify: auto;
                overflow: hidden;
                background-color: #FD2D01;
                
            }
        }
    }

</style>