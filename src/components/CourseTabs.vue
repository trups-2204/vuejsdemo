<template>
  <div>
    <span class="tab"
      v-for="(tab, index) in tabs"
      :key="index" @click="selectTab(tab)"
      :class="{ activeTab: selectedTab === tab }">

      {{ tab }}
    </span>
    <hr class="tab-separator">

    <div class="reviews-section" v-show="selectedTab === 'Reviews'">
       <p v-if="!reviews.length">There are no reviews yet!</p>

    <ol v-else>

      <li v-for="review in reviews">

        {{ review.name }}: {{ review.message }} ({{ review.rating }}/5) </li> 
    </ol> 
    </div>

    <div v-show="selectedTab === 'Give review'">
      <course-review @message-submitted="addMessage"></course-review>
    </div>
  </div>
</template>

<script>
import CourseReview from './CourseReview'

export default {
  name: 'CourseTabs',
  components: { CourseReview },
  methods: {
    addMessage(courseReview) {
      this.reviews.push(courseReview);
      let sum_rating = 0;
      for(var i = 0;i < this.reviews.length;i++) {
        sum_rating += this.reviews[i].rating;
      }
      let avg_rating = sum_rating / this.reviews.length;
      this.$emit('get-avg-feedback', avg_rating);
    },
    selectTab(tab) {
      this.selectedTab = tab;
    }
  },
  data() {
    return {
      selectedTab: 'Reviews',
      reviews: [],
      tabs: ['Reviews', 'Give review']
    };
  }
}
</script>

<style>
.tab {
  padding: 5px;
  cursor: pointer;
  color: royalblue;
}

.tab-separator {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid blue;
  margin-top: 5px;
  padding: 0;
}

.reviews-section {
  padding: 0px 10px;
}

.activeTab {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #DDABEB;
  border-bottom: blue 2px solid;
  cursor: default;
  color: blue;
  font-weight: bold;
}

.tab-section {
  margin-top: 20px;
}
</style>