<template>
  <div class="container">
    <div class="global-search-wrapper"
         style="width: 300px">
      <a-auto-complete v-model:value="value"
                       class="global-search"
                       style="width: 100%"
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

    const cancelQuest = () => {
      if (typeof source.value === 'function') {
        source.value('终止请求'); //取消请求
      }
    };

    const jumpHref = () => {
      window.he
    }

    // const getRandomInt = (max, min = 0) => {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // };

    // eslint-disable-next-line no-unused-vars
    const searchResult = async () => {
      cancelQuest();
      // console.log(dataSource)
      await ctx.axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value.value + '&json=1&cb=', {
        cancelToken: new ctx.axios.CancelToken(function executor (c) {
          source.value = c;
        })
      }).then(res => {
        // handle result
        // myData.value = eval(" ' " + res.data + " ' ");

        // myData.value = eval(res.data);
        myData.value = res.data.replace(/[(;)]/g, "")
        // myData.value = JSON.parse(myData.value)
        myData.value = eval(" ' " + myData.value + " ' ");
        if (value.value != '') {
          myData.value = JSON.parse(myData.value)
          // console.log(myData.value)
        }

        // dataSource.value = JSON.stringify(myData.value)
        // myData.value = JSON.stringify(JSON.parse(myData.value).s)


        // return JSON.stringify(myData.value.s)
        // return JSON.parse(myData.value).s
      }).catch(error => {
        if (ctx.axios.isCancel(error)) {
          console.log('Rquest canceled', error.message); //请求如果被取消，这里是返回取消的message
        } else {
          //handle error
          console.log(error);
        }
      })
    }
    // myData.value = res.replace(/[(;)]/g, "")
    // myData.value = '"' + myData.value + '"'

    // myData.value = JSON.parse(myData.value.s)





    // 





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




    // 




    // console.log(myData.value)



    // if (event.keyCode == 38 || event.keyCode == 40) return;
    // else if (event.keycode == 13) {
    //   window.open(`http://www.baidu.com/s?wd=${dataSource.value}`, '_blank')
    // }


    const handleSearch = val => {
      // myData.value = eval(" ' " + searchResult(val) + " ' ");
      // myData.value = eval(searchResult(val));
      // console.log(myData.value)
      // console.log(JSON.stringify(myData.value.s))
      searchResult(val)
      // return JSON.stringify(myData.value.s)
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
      handleSearch,
      searchResult
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

.ant-select-selection-search
  > :global(.ant-select-single
    .ant-select-selector
    .ant-select-selection-search-input) {
  width: 100% !important;
  opacity: 0.5;
  background-color: #000 !important;
  border: none;
  border-radius: 20px;
  filter: drop-shadow(8px 8px 10px rgb(182, 179, 179));
}

/* .ant-select-selection-search
  > :global(.ant-select-single
    .ant-select-selector
    .ant-select-selection-search-input):focus {
  width: 150% !important;
} */

.global-search-wrapper > :global(.ant-input) {
  background-color: #000 !important;
  color: #fff !important;
}

.global-search-wrapper {
  position: absolute;
  text-align: center;
}

.ant-input .ant-select-selection-search-input {
  text-align: center !important;
}
</style>