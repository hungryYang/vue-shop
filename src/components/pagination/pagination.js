import './pagination.scss'
export default {
  props: {
    total: {
      type: Number,
      require: true
    },
    display: {
      type: Number,
      default: 3
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      curPage:this.pageNum,
      goPage:''
    }
  },
  computed: {
    totalPages() {
      let total = this.total
      let pageSize = this.pageSize
      if(total % pageSize ==0){
        return total/pageSize
      }else{
        return parseInt(total/pageSize) + 1
      }
    },
    curPagesList() {
      let arr = []
      let display = this.display
      let curInt = 0
      if(this.curPage > display){
        if(this.curPage % display == 0){
          curInt = this.curPage / display - 1
        }else {
          curInt = parseInt(this.curPage / display)
        }
      }
      let start = curInt * display + 1
      let end = (curInt + 1) * display
      if(end > this.totalPages) {
        end = this.totalPages
      }
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    selectPage(page) {
      this.curPage = page
    },
    prevPage() {
      if(this.curPage === 1){
        return
      }
      this.curPage--
    },
    nextPage() {
      if(this.curPage === this.totalPages){
        return
      }
      this.curPage++
    },
    goToPage() {
      if(this.goPage < 1 || this.goPage > this.totalPages){
        return
      }
      this.curPage = this.goPage
    }
  },
  watch: {
    curPage() {
      this.$emit('change',this.curPage)
    }
  }
}
