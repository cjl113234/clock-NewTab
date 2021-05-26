<template>
  <!-- <a-auto-complete v-model:value="value"
                     class="global-search"
                     size="large"
                     backfill
                     optionLabelProp="value"
                     @focus="bgFocus"
                     @blur="bgBlur"
                     @select="onSelect"
                     @search="handleSearch"
                     @keyup.enter=jumpHref>
      <template #dataSource>
        <a-select-option v-for="(item,index) in myData.s"
                         :key="index"
                         :value="item">
          <a :href="`http://www.baidu.com/s?wd=${item}`"
             target="_blank">
            {{ item}}
          </a>
        </a-select-option>
      </template>
    </a-auto-complete> -->
  <input type="text"
         placeholder="请输入想要搜索关键字"
         v-model="value"
         @focus="bgFocus"
         @blur="bgBlur"
         @keyup="handleSearch"
         @keyup.enter=jumpHref
         style="width:100%">
  <ul>
    <li v-for="(item,index) in myData.s"
        :key="index"><span><a :href="`http://www.baidu.com/s?wd=${item}`"
           target="_blank">
          {{ item}}
        </a></span></li>
  </ul>
  <h2 v-show="myData.length==0">(*^__^*)暂时没有数据</h2>
</template>
<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';
export default defineComponent({

  methods: {
    bgFocus: () => {
      document.getElementById('box').style.filter = "blur(10px) brightness(60%)";
      document.getElementById('box').style.transition = "0.5s";
    },
    bgBlur: () => {
      document.getElementById('box').style.filter = "blur(0px)";
    },
  },

  setup () {
    const { ctx } = getCurrentInstance();
    const value = ref('');
    const dataSource = ref([]);
    const myData = ref([]);
    const source = ref(null);


    const cancelQuest = () => {
      if (typeof source.value === 'function') {
        source.value('终止请求'); //取消请求
      }
    };

    const jumpHref = () => {
      window.open(`http://www.baidu.com/s?wd=${value.value}`);
    }


    const searchResult = async () => {
      cancelQuest();
      // console.log(dataSource)
      await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=', {
        cancelToken: new ctx.axios.CancelToken(function executor (c) {
          source.value = c;
        })
      }).then(res => {
        myData.value = res.data.replace(/[(;)]/g, "")
        // myData.value = JSON.parse(myData.value)
        myData.value = eval(" ' " + myData.value + " ' ");
        if (value.value != '') {
          myData.value = JSON.parse(myData.value)
        }

      }).catch(error => {
        if (ctx.axios.isCancel(error)) {
          console.log('Rquest canceled', error.message); //请求如果被取消，这里是返回取消的message
        } else {
          //handle error
          console.log(error);
        }
      })
    }


    const handleSearch = val => {
      searchResult(val)
    };

    const selectDown = () => {
      this.now++;
      if (this.now == this.myData.length) this.now = -1;
      console.log(this.now)
      this.keyword = this.myData[this.now];
    };

    const selectUp = () => {
      this.now--;
      if (this.now == -2) this.now = this.myData.length - 1;
      this.keyword = this.myData[this.now];
    }

    return {
      value,
      dataSource,
      myData,
      jumpHref,
      handleSearch,
      searchResult,
      selectDown,
      selectUp
    };
  },
});
</script>

<style scoped>
</style>