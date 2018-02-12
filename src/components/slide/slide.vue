<template>
<div class="carousel-wrap mt13">
    <transition-group class='slide-ul' tag="ul" name="slide">
      <li v-for="(list,index) in slideLists" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="goto">
        <a :href="list.clickUrl">
          <img :src="list.image" :alt="list.desc">
        </a>
      </li>
    </transition-group>
    <div class="carousel-items">
      <span @mouseover="changeSlide(index)" v-for="(item,index) in slideLists.length" :key="index" :class="{'active':index === currentIndex}"></span>
    </div>
</div>
</template>

<script>
export default {
  name:'slide',
  props:['slideLists','model'],
  data(){
    return{
      currentIndex:0,
      timer:null
    }
  },
  created(){
    require(`./${this.model}.css`)
  },
  mounted(){
    this.timer=setInterval(()=>{
      this.autoPlay()
    },3000)
  },
  methods:{
     changeSlide(index){
      this.currentIndex = index
    },
    autoPlay(){
      this.currentIndex++
      if(this.currentIndex > this.slideLists.length-1){
        this.currentIndex = 0
      }
    },
    stop(){
      clearInterval(this.timer)
      this.timer=null
    },
    goto(){
      this.timer = setInterval(()=>{
        this.autoPlay()
      },3000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../modules/sass/variables.scss";
  //carousel
.carousel-wrap {
  position: relative;
  height: 453px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}

.slide-ul {
  width: 100%;
  height: 100%;
  li {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.carousel-items {
  position: absolute;
  z-index: 10;
  top: 380px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  span {
    display: inline-block;
    height: 6px;
    width: 30px;
    margin: 0 3px;
    background-color: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background-color: $btn-color;
  }
}

//carousel end
</style>