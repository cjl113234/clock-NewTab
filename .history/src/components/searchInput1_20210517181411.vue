<template>
  <input type="text"
         placeholder="搜索"
         v-model="value"
         @focus="bgFocus"
         @blur="bgBlur"
         @keyup="searchResult($event)"
         @keyup.enter=jumpHref
         @keydown.down.prevent="selectDown"
         @keydown.up.prevent="selectUp"
         class="searchInput">
  <ul>
    <li v-for="(item,index) in myData.s"
        :key="index"><span><a :href="`http://www.baidu.com/s?wd=${item}`"
           :class="{gray:index==now.value}"
           target="_blank">
          {{ item}}
        </a></span></li>
  </ul>
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
    const now = ref(-1)


    const cancelQuest = () => {
      if (typeof source.value === 'function') {
        source.value('终止请求'); //取消请求
      }
    };

    const jumpHref = () => {
      window.open(`http://www.baidu.com/s?wd=${value.value}`);
    }


    const searchResult = async (event) => {
      cancelQuest();
      if (event.keyCode == 38 || event.keyCode == 40) return;
      if (event.keyCode == 13) {
        window.open('https://www.baidu.com/s?wd=' + value.value);
        value.value = ''
      }
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


    const selectDown = () => {
      if (myData.value.s == undefined) return
      now.value++;
      if (now.value == myData.value.s.length) now.value = -1;
      value.value = myData.value.s[now.value];
    };

    const selectUp = () => {
      if (myData.value.s == undefined) return
      now.value--;
      if (now.value == -2) now.value = myData.value.s.length - 1;
      value.value = myData.value.s[now.value];
    }

    return {
      value,
      dataSource,
      myData,
      jumpHref,
      searchResult,
      selectDown,
      selectUp,
      now
    };
  },
});
</script>

<style scoped>
.searchInput {
  width: 100%;
  height: 40px;
  position: relative;
  bottom: 13em;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  background-attachment: fixed;
  border-radius: 20px;
  outline: none;
}

input {
  color: #fff;
}

input::-webkit-input-placeholder {
  color: #fff;
}

ul {
  background-position: center top;
  background-size: cover;
  width: 100%;
  position: relative;
  bottom: 10em;
}
ul::after {
  background-image: url(xxx.jpg);
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
}

li {
  list-style: none;
  background-color: #fff;
}
</style>