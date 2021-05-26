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
          <a-select-option v-for="(item,index) in myData.s"
                           :key="index">
            <a :href="`http://www.baidu.com/s?wd=${item}`"
               target="_blank"
               rel="noopener noreferrer">
              {{ item}}
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

  setup () {
    const { ctx } = getCurrentInstance();
    const value = ref('');
    const dataSource = ref([]);
    const myData = ref([]);
    const source = ref(null);

    const onSelect = value => {
      // value.value = '的放歌'
      console.log('onSelect', value);
    };

    // const getRandomInt = (max, min = 0) => {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // };

    // eslint-disable-next-line no-unused-vars
    // const searchResult = async () => {
    //   // console.log(dataSource)
    //   const { data: res } = await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=', {
    //     cancelToken: new ctx.axios.CancelToken(function executor (c) {
    //       // An executor function receives a cancel function as a parameter
    //       source.value = c;
    //     })
    //   });
    const searchResult = async () => {
      // console.log(dataSource)
      await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=', {
        cancelToken: new this.axios.CancelToken(function executor (c) {
          _this.source = c;
        })
      }).then(res => {
        //handle result
        console.log(res)
      }).catch(error => {
        if (this.axios.isCancel(error)) {
          console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
        } else {
          //handle error
          console.log(err);
        }
      })
    }
    // myData.value = res.replace(/[(;)]/g, "")
    // myData.value = '"' + myData.value + '"'

    // myData.value = JSON.parse(myData.value.s)
    myData.value = eval(res);


    // myData.value = JSON.stringify(myData.value)
    // console.log(myData.value)
    // for (let i = 0; i < 10; i++) {
    //   // dataSource.value[i] = myData.value.s[i]
    //   console.log(myData.value.s[i])
    // }
    // dataSource.value.concat(myData.value.s)
    // console.log(dataSource.value)
    // return dataSource.value
    // console.log(JSON.stringify(myData.value.s))
    return JSON.stringify(myData.value.s)

    // console.log(myData.value)


    // if (event.keyCode == 38 || event.keyCode == 40) return;
    // else if (event.keycode == 13) {
    //   window.open(`http://www.baidu.com/s?wd=${dataSource.value}`, '_blank')
    // }

  };

  const handleSearch = val => {
    dataSource.value = searchResult(val);
    console.log(dataSource.value);
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