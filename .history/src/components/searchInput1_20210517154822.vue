<template>
  <div class="container">
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
           @@focus="bgFocus"
           @blur="bgBlur"
           @keyup="handleSearch"
           @select="onSelect"
           @keyup.enter=jumpHref
           style="width:100%">
    <ul>
      <li v-for="(item,index) in myData.s"
          :key="index"><span>{{item}}</span></li>
    </ul>
    <h2 v-show="myData.length==0">(*^__^*)暂时没有数据</h2>

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
      // console.log('onSelect', value);
    };

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

    return {
      value,
      dataSource,
      myData,
      jumpHref,
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

.global-search {
  width: 80%;
  /* width: 50%; */
  /* transition: 0.3s; */
}

/* .global-search:hover {
  width: 150%;
} */

.global-search-wrapper > :global(.ant-input) {
  background-color: #000 !important;
  color: #fff !important;
}

.selectList {
  background-color: #000 !important;
}

ul {
  position: relative;
  top: 100px;
}
</style>