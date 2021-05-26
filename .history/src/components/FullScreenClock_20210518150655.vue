<template>
  <div class="main">
    <a-button type="danger"
              shape="circle"
              @click="showModal">
      <FullscreenOutlined />
    </a-button>
    <a-modal v-model:visible="visible"
             @ok="handleOk"
             @click="closeModal"
             width="100%"
             wrapClassName="full-modal">
      <template #footer>
        <a-button type="link"
                  ghost
                  @click="handleOk">
          <FullscreenExitOutlined />
        </a-button>
      </template>

      <p>
        <span style="bottom:110%;font-size:28px;">{{ content }}——《{{ msg.title }}》</span>
        <span style="left:67%;bottom:80%;font-size:18px;">{{ msg.dynasty }}</span>
        <span style="left:70%;bottom:80%;font-size:18px;">{{ msg.author }}</span>
        <FlipClock></FlipClock>
        <a-button @click="loadSentence"
                  type="link"
                  style="position:absolute;
                         display:flex;
                         align-items:center;
                         justify-content:center;
                         color:#fff">
          <RedoOutlined />
        </a-button>
      </p>
    </a-modal>

  </div>
</template>
<script>
import { defineComponent, ref, } from 'vue';
import { FullscreenOutlined, FullscreenExitOutlined, RedoOutlined } from '@ant-design/icons-vue';
import FlipClock from './FlipClock.vue';

export default defineComponent({
  data () {
    return {
      msg: [],
      content: [],
      count: 0
    }
  },
  methods: {
    // 获取古诗词
    loadSentence: function () {
      const jinrishici = require('jinrishici');
      jinrishici.load(result => {
        this.msg = result.data.origin
        this.content = result.data.content
      }, err => {
        console.log(err);
      })
    },


    clearTimer () {
      clearInterval(window.myTimer)
      window.myTimer = null
    },
    setTimer () {
      this.count = 0
      if (!window.myTimer) {
        window.myTimer = window.setInterval(this.noAction, 1000)
      }
    },
    noAction () {
      // 判断用户1分钟无操作就自动弹出待机页
      let outTime = 1
      this.count++
      if (this.count === outTime * 60) {
        this.showModal()
      }
    },
    closeModal(){
      document.getElementsByClassName('ant-modal-content').
    }
  },
  mounted: function () {

    this.loadSentence();

    // 监听鼠标
    document.onmousemove = (event) => {
      let x1 = event.clientX
      let y1 = event.clientY
      if (this.x !== x1 || this.y !== y1) {
        this.count = 0
      }
      this.x = x1
      this.y = y1
    }
    // 监听键盘
    document.onkeydown = () => {
      this.count = 0
    }
    // 监听Scroll
    document.onscroll = () => {
      this.count = 0
    }
    this.setTimer()
  },
  // 最后在beforeDestroy()生命周期内清除定时器：
  beforeUnmount () {
    this.clearTimer()
  },

  components: {
    FullscreenOutlined,
    FullscreenExitOutlined,
    FlipClock,
    RedoOutlined
  },

  setup () {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };

    return {
      visible,
      showModal,
      handleOk,
    };
  },
});
</script>

<style scpoed>
.main {
  position: relative;
  left: 430px;
  bottom: 100px;
}

.main .ant-btn-danger {
  background-color: #000;
  border: none;
}

.main .ant-btn-danger:hover,
.main .ant-btn-danger:focus {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh);
}
.full-modal .ant-modal-body {
  flex: 1;
  /* 渐变效果 */
  background-image: linear-gradient(125deg, #e4ffcd, #6dd5fa, #2980b9, #e4ffcd);
  background-size: 400%;
  animation: bganimation 15s infinite;
}

/* 渐变效果 */
@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.ant-modal-footer {
  /* 渐变效果 */
  background-image: linear-gradient(
    125deg,
    #e4ffcd,
    #6dd5fa,
    #2980b9,
    #e4ffcd
  ) !important;
  background-size: 400% !important;
  animation: bganimation 15s infinite !important;
  border-top: 0 !important;
}

p {
  position: relative;
  top: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

@font-face {
  font-family: pangmenFont;
  src: url("../../public/庞门正道粗书体6.0.ttf");
}

p > span {
  position: absolute;
  font-family: pangmenFont;
}
</style>