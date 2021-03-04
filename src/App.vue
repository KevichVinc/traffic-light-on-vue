<template>
  <div id="app">
    <div id="traffic-light">
      <div class="light red" :class="{active: current=='red'}"><span>{{ currentTime }}</span></div>
      <div class="light yellow" :class="{active: current=='yellow'}"></div>
      <div class="light green" :class="{active: current=='green'}"><span>{{ currentTime }}</span></div>
   </div>
  </div>
</template>

<script>

class State {
  constructor(name, dur, next){
    this.name = name;
    this.dur = dur;
    this.next = next;
  }
}

class Constroller {
  trigger(state, callback){
    callback(state);
    setTimeout(()=>{
      this.trigger(state.next, callback);
    }, state.dur * 1000)
  }
}

export default {
  data: function () {
    return {
      current: 'red',
      currentTime: 2,
      timer: null
    }

  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    },
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer()
      }
    }
  },
  mounted(){
    const constroller = new Constroller();
    
    const red = new State('red', 15);
    const yellowR = new State('yellow', 2);
    const yellowG = new State('yellow', 2);
    const green = new State('green', 8);
    
    red.next = yellowR;
    yellowR.next = green;
    green.next = yellowG;
    yellowG.next = red;

    constroller.trigger(red, (state)=>{
      this.startTimer();
      this.currentTime = state.dur;
      this.current = state.name;
    });
    
  }
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