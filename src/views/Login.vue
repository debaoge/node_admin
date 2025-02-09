<template>
    <div>login
        <button @click="handleLogin">login</button>
    </div>
</template>
<script>
export default{
    setup(){
        const handleLogin=()=>{
            localStorage.setItem("token","login token");
        }
        return{
            handleLogin
        }
    }
}

</script>