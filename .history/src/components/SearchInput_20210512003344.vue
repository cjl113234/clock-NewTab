<template>
  <div class="container">
    <!-- <a-input-search v-model:value="value"
                    @search="onSearch"
                    placeholder="Search"
                    size="large"
                    suffix
                    @focus="bgFocus"
                    @blur="bgBlur"
                    @keyup="get($event)"
                    @keydown.down.prevent="selectDown"
                    @keydown.up.prevent="selectUp">
    </a-input-search>
    <ul v-for="(val,index) in data"
        :key="index">
      <li>{{val}}</li>
    </ul> -->

    <!-- <a-auto-complete v-model:value="value"
                     class="global-search"
                     size="large"
                     allowClear
                     style="width: 100%"
                     option-label-prop="value"
                     @focus="bgFocus"
                     @blur="bgBlur"
                     @keydown="get($event)">
      <template #dataSource>
        <a-select-option v-for="(val,index) in data"
                         :key="index">
          <a :href="`http://www.baidu.com/s?wd=${value.value}`"
             target="_blank"
             rel="noopener noreferrer">
            {{ val }}
          </a>
        </a-select-option>
      </template>
    </a-auto-complete> -->

    <div class="global-search-wrapper"
         style="width: 300px">
      <a-auto-complete v-model:value="value"
                       class="global-search"
                       size="large"
                       style="width: 100%"
                       option-label-prop="value"
                       backfill
                       @select="onSelect"
                       @search="handleSearch">
        <template #dataSource>
          <a-select-option v-for="(item,index) in dataSource"
                           :key="index">
            <a :href="`http://www.baidu.com/s?wd=${item}`"
               target="_blank"
               rel="noopener noreferrer">
              {{ item }}
            </a>
          </a-select-option>
        </template>
        <a-input-search size="large"
                        placeholder="input here"
                        enterButton></a-input-search>
      </a-auto-complete>
    </div>

  </div>
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


  // // eslint-disable-next-line no-unused-vars
  // setup () {
  //   //引用全局变量
  //   const { ctx } = getCurrentInstance();
  //   const value = ref('');
  //   const myData = ref([]);
  //   const data = ref([])
  //   const now = ref(-1)
  //   const sershow = ref(false)

  //   const onSearch = () => {
  //     window.open(`http://www.baidu.com/s?wd=${value.value}`, '_blank')
  //   };

  //   const get = async (event) => {
  //     data.value = [];
  //     if (event.keyCode == 38 || event.keyCode == 40) return;
  //     else if (event.keycode == 13) {
  //       window.open(`http://www.baidu.com/s?wd=${value.value}`, '_blank')
  //     }
  //     sershow.value = !sershow.value
  //     const { data: res } = await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=');
  //     // eslint-disable-next-line no-useless-escape
  //     myData.value = res.replace(/[(;)]/g, "")
  //     myData.value = myData.value.replace(/\)/g, '')
  //     myData.value = myData.value.replace(/;/g, '')
  //     myData.value = JSON.parse(myData.value)
  //     for (let i = 0; i < 10; i++) {

  //       data.value.push(myData.value.s[i])
  //       // console.log(JSON.stringify(data.value))
  //     }
  //     // JSON.stringify(data.value)
  //     // console.log(myData.value.s[1])
  //   };
  //   // const selectDown = async () => {
  //   //   now.value++;
  //   //   if (now.value == data.value.length) now.value = -1;
  //   //   value.value = data.value[now.value];
  //   //   console.log(data.value[now.value])
  //   // };
  //   // const selectUp = async () => {
  //   //   now.value--;
  //   //   if (now.value == -2) now.value = data.value.length - 1;
  //   //   value.value = data.value[now.value];
  //   // };


  //   const onSelect = value => {
  //     console.log('onSelect', value);
  //   };

  setup () {
    const { ctx } = getCurrentInstance();
    const value = ref('');
    const dataSource = ref([]);
    const myData = ref(new Array(10));

    const onSelect = value => {
      // value.value = '的放歌'
      console.log('onSelect', value);
    };

    const getRandomInt = (max, min = 0) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // eslint-disable-next-line no-unused-vars
    const searchResult = query => {
      dataSource.value = [];
      const { data: res } = await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=');
      myData.value = res.replace(/[(;)]/g, "")
      // myData.value = '"' + myData.value + '"'

      // myData.value = JSON.parse(myData.value.s)
      myData.value = eval('(' + myData.value + ')');
      console.log(myData.value.s);

      // myData.value = JSON.stringify(myData.value)
      for (let i = 0; i < 10; i++) {
        dataSource.value.push(myData.value.s[i])
        // console.log(myData.value.s[i])
      }
      // console.log(myData.value)


      // if (event.keyCode == 38 || event.keyCode == 40) return;
      // else if (event.keycode == 13) {
      //   window.open(`http://www.baidu.com/s?wd=${dataSource.value}`, '_blank')
      // }

    };

    const handleSearch = async () => {
      dataSource.value = [];
      const { data: res } = await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=');
      myData.value = res.replace(/[(;)]/g, "")
      // myData.value = '"' + myData.value + '"'

      // myData.value = JSON.parse(myData.value.s)
      myData.value = eval('(' + myData.value + ')');
      console.log(myData.value.s);

      // myData.value = JSON.stringify(myData.value)
      for (let i = 0; i < 10; i++) {
        dataSource.value.push(myData.value.s[i])
        // console.log(myData.value.s[i])
      }
      // console.log(myData.value)


      // if (event.keyCode == 38 || event.keyCode == 40) return;
      // else if (event.keycode == 13) {
      //   window.open(`http://www.baidu.com/s?wd=${dataSource.value}`, '_blank')
      // }
    };

    return {
      value,
      dataSource,
      myData,
      // onSearch,
      // get,
      // selectDown,
      // selectUp,
      // now,
      // data,
      // sershow,
      onSelect,
      handleSearch
    };
  },
});
</script>

<style scoped>
.container {
  position: relative;
  bottom: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ant-input-search {
  width: 50%;
  opacity: 0.3;
  background-color: #000 !important;
  border: none;
  border-radius: 20px;
  filter: drop-shadow(8px 8px 10px rgb(182, 179, 179));
}

.ant-input-search:hover {
  opacity: 0.6;
  width: 100%;
}

.ant-input-search:focus {
  filter: blur(10px);
}

.ant-input-search > :global(.ant-input) {
  background-color: #000 !important;
  color: #fff !important;
}

.ant-input-search > :global(.ant-input-affix-wrapper .ant-input) {
  position: absolute;
  text-align: center !important;
  left: 10px;
}
</style>