<template>
    <div>
        <el-page-header title="企业门户管理系统" icon="" content="首页">
            <el-card class="box-card" shadow="always">
                <el-row>
                    <el-col :span="4">
                        <el-avatar :size="100" :src="avatarUrl"></el-avatar>
                    </el-col>
                    <el-col :span="20">
                        <h3 style="line-height: 100px;">欢迎 {{ store.state.userInfo.username }} 回来 {{ welcomeText }}</h3>
                    </el-col>
                </el-row>
            </el-card>

            <el-card shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>公司厂品</span>
                    </div>
                </template>
                <el-carousel v-if="listData.length > 0" :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in listData" :key="item._id">
                        <div class="carousel-item" :style="{
                            backgroundImage: `url(http://localhost:3001${item.cover})`
                        }">
                            <h3>{{ item.title }}</h3>
                        </div>
                    </el-carousel-item>

                </el-carousel>
            </el-card>

        </el-page-header>

    </div>
</template>

<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import axios from 'axios';


const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar
    ? 'http://localhost:3000' + store.state.userInfo.avatar
    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');

const welcomeText = computed(() => new Date().getHours > 12 ? ', 喝杯咖啡休息一下吧' : ', 开心美美的一天');
const listData = ref([])
onMounted(async () => {
    getData()
})

const getData = async () => {
    const res = await axios.get('/adminapi/product/list')
    console.log('listData: res: ', res.data.data);
    if (res.data.ActionType === 'OK') {
        listData.value = res.data.data
    } else {
        console.log('读取失败：返回数据格式不正确');
    }
}


</script>
<style lang="scss" scoped>
.card_box {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

</style>