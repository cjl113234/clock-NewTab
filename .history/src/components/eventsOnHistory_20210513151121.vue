<template>
  <!-- <div class="main"> -->
  <div :class="{'container':true,'animate__animated':true ,'animate__bounceInLeft':bounceInLeft}"
       id="mai">

    <!-- <a-steps direction="vertical"
               progress-dot
               :current="1"
               size="small">
        <a-step v-for="(item,index) in data"
                :key="index"
                :title="item.year"
                :description="item.title"> -->
    <!-- :subTitle="item.title" -->
    <!-- </a-step>
      </a-steps> -->
    <a-button class="showHis"
              @click="hideHistory()">
      <SwapOutlined class="hisIcon" />
    </a-button>
    <div>
      <h2 class="carouselTitle">历史上的今天</h2>
    </div>
    <a-carousel autoplay>
      <div v-for="(item,index) in data"
           :key="index">
        <h3>{{ item.year }}年 ——{{ item.title }}</h3>
      </div>
    </a-carousel>
  </div>
  <!-- </div> -->
</template>

<script>
// import { ref, onMounted } from "vue"
import { SwapOutlined } from '@ant-design/icons-vue';
export default {
  name: "App",

  components: {
    SwapOutlined
  },

  data () {
    return {
      Month: new Date().getMonth() + 1,
      Day: new Date().getDate(),
      // year: [],
      // title: [],
      // desc: [],
      data: [],
      showHisto: true,
      bounceInLeft: true
    }
  },
  methods: {
    async GetHistory () {

      this.MonthZero()
      this.DayZero()

      const MDconcat = this.Month.toString() + this.Day.toString()

      const api_url = `${this.Month}.json`
      const { data: res } = await this.$http.get(`https://baike.baidu.com/cms/home/eventsOnHistory/${api_url}`)
      for (let i = 0; i < 10; i++) {
        // this.year[i] = res[this.Month][MDconcat][i].year
        // this.title[i] = res[this.Month][MDconcat][i].title.replace(/<[^>]+>/g, "");
        // this.desc[i] = res[this.Month][MDconcat][i].desc.replace(/<[^>]+>/g, "");
        this.data[i] = res[this.Month][MDconcat][i]
        this.data[i].title = res[this.Month][MDconcat][i].title.replace(/<[^>]+>/g, "");
        this.data[i].desc = res[this.Month][MDconcat][i].desc.replace(/<[^>]+>/g, "");
      }
    },


    MonthZero () {
      this.Month = this.Month < 10 ? '0' + this.Month : this.Month;
    },

    DayZero () {
      this.Day = this.Day < 10 ? '0' + this.Day : this.Day;
    },

    hideHistory () {
      if (document.getElementById('mai').style.left == '0%') {
        document.getElementById('mai').style.left = '-20%';


      }
      else {
        document.getElementById('mai').style.left = '0%';
        this.bounceInLeft = !this.bounceInLeft;

      }
    },
  },
  mounted () {
    this.GetHistory()
  },



  setup () {
    return {
    }
  }
}
</script>

<style scoped>
/* .main {
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
} */
.container {
  width: 20%;
  position: fixed;
  left: 0%;
  top: 74%;
  float: left;
  z-index: -1;
  background-color: rgba(75, 73, 73, 0.5);
  box-shadow: -6px -6px 12px #272626, 6px 6px 12px #272626;
  z-index: 1;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 10%;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.carouselTitle {
  color: #fff;
  text-align: center;
}

.showHis {
  position: absolute;
  width: 1px;
  height: 100%;
  left: 100%;
  border-top-right-radius: 2em;
  border-bottom-right-radius: 2em;
}

.hisIcon {
  position: relative;
  left: -7px;
}

.ant-carousel .slick-dots-bottom {
  bottom: 5px;
}
</style>
