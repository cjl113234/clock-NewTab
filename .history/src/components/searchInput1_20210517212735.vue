<template>
  <div class="searchContainer">
    <input placeholder="搜索"
           v-model="value"
           @focus="bgFocus"
           @blur="bgBlur"
           @keyup="searchResult($event)"
           @keyup.enter=jumpHref
           @keydown.down.prevent="selectDown"
           @keydown.up.prevent="selectUp"
           class="searchInput"
           id="sInput">
  </div>

  <div class="searchList">
    <ul>
      <li v-for="(item,index) in myData.s"
          :key="index"><span><a :href="`http://www.baidu.com/s?wd=${item}`"
             :class="{gray:index==now.value}"
             target="_blank">
            {{ item}}
          </a></span></li>
    </ul>
  </div>

</template>
<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';
export default defineComponent({

  methods: {
    // bgFocus: () => {
    //   document.getElementById('box').style.filter = "blur(10px) brightness(60%)";
    //   document.getElementById('box').style.transition = "0.5s";
    // },
    // bgBlur: () => {
    //   document.getElementById('box').style.filter = "blur(0px)";
    // },
  },

  setup () {
    const { ctx } = getCurrentInstance();
    const value = ref('');
    const dataSource = ref([]);
    const myData = ref([]);
    const source = ref(null);
    const now = ref(-1);


    const bgFocus = () => {
      document.getElementById('box').style.filter = "blur(10px) brightness(60%)";
      document.getElementById('box').style.transition = "0.5s";
    };

    const bgBlur = () => {
      value.value = ''
      myData.value = []
      document.getElementById('box').style.filter = "blur(0px)";
    };


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
      now,
      bgBlur,
      bgFocus
    };
  },
});
</script>

<style scoped>
.searchContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
}

.searchInput {
  width: 50%;
  height: 40px;
  position: relative;
  bottom: 13em;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  background-attachment: fixed;
  border-radius: 20px;
  outline: none;
  transition: 0.5s;
}

.searchInput:hover {
  width: 100%;
  transition: 0.5s;
}

.searchInput:focus {
  width: 100%;
}

input {
  color: #fff;
}

input::-webkit-input-placeholder {
  color: #fff;
}

.searchList {
  position: relative;
  /* filter: blur(20px); */
}
ul {
  width: 100%;
  position: absolute;
  bottom: -180px;
}

li {
  list-style: none;
  background-color: rgba(0, 0, 0, 0.5);
  padding-left: 20px;
  padding-top: 10px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

li:first-child {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

li:last-child {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>