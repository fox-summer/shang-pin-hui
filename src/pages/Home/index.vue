<template>
  <div class="">
    <type-nav></type-nav>
    <list-container></list-container>
    <today-recommend></today-recommend>
    <rank></rank>
    <like></like>
    <floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></floor>
    <!-- <floor></floor> -->
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: { ListContainer, TodayRecommend, Rank, Like, Floor },

  computed: {
    ...mapState(["count"]),
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    this.$store.dispatch("userInfo");
  },

  methods: {
    add() {
      this.$store.dispatch("add");
    },
  },
};
</script>

<style lang="less" scoped></style>
