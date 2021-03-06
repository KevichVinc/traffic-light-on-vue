<template>
  <div id="app">
    <div id="traffic-light">
      <div class="light red" :class="{active: $route.name === COLORS.RED}"><span>{{ currentTime }}</span></div>
      <div class="light yellow" :class="{active: $route.name === COLORS.ORANGE}"><span>{{ currentTime }}</span></div>
      <div class="light green" :class="{active: $route.name === COLORS.GREEN}"><span>{{ currentTime }}</span></div>
      <button @click="start" v-if="$route.name ==='home'">Старт</button>
      <button @click="stop">Стоп</button>
      <button @click="go">Продолжить</button>
   </div>
  </div>
</template>

<script>

import { COLORS, TIMER, COLORS_NAVIGATOR } from './constants/StopLightConfig'

export default {
  data: function () {
    return {
      currentTime: 0,
      currentTimer: null,
      COLORS,
    };
  },
  methods: {
    start() {
      this.$router.push('/red')
    },
    stop() {
      clearInterval(this.currentTimer)
    },
    go() {
      this.switchToColor(this.$route.name, this.currentTime)
    },
    switchToColor(colorName, currentTime = 0) {
      this.currentTime = currentTime || TIMER[colorName]
      this.currentTimer = setInterval(() => {
        this.currentTime = this.currentTime - 1

        if (this.currentTime === 0) {
          this.$router.push(`/${this.getNextColor(colorName)}`)
          clearInterval(this.currentTimer)
        }

      }, 1000)
    },
    getNextColor(currentColor) {
      const currentIndex =  COLORS_NAVIGATOR.findIndex(color => color === currentColor)
      const nextIndex = currentIndex + 1

      if (nextIndex > COLORS_NAVIGATOR.length - 1) {
        return COLORS_NAVIGATOR[0]
      }

      return COLORS_NAVIGATOR[currentIndex + 1]
    }
  },

  watch: {
    $route(to) {
      if (to.name !== 'home') {
        this.currentTime = 0
        this.switchToColor(to.name)
      }
    }
  },
}
</script>

<style lang="scss">

body {
  background: linear-gradient(rgb(52, 166, 255), rgb(71, 124, 255));
  height: 100vh;
}

#traffic-light {
  width: 70px;
  height: 240px;
  background: #222;
  border-radius: 8px;
  margin: auto;
  padding: 15px;
  position: relative;
}
#traffic-light::after {
    content: "";
    width: 17px;
    height: 100%;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -100%;
    background-color: #222;
    margin: 0 auto;
}
.light {
  display: inline-block;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
  opacity: 0.2;
  transition: opacity 0.2s;
  position: relative;
}
.light span {
    transition: opacity 0.2s;
    color: #fff;
    font-size: 33px;
    position: absolute;
    right: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    opacity: 0;
    visibility: hidden;
}
.light.active span {
  opacity: 1;
  visibility: visible;
}
.active {
  opacity: 1;
}

.red {
  background: red;
}
.yellow {
  background: yellow;
}
.green {
  background: green;
}


</style>