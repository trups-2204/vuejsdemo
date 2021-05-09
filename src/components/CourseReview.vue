<template>
  <form @submit.prevent="onSubmit" class="review-form">
    <div class='error-section' v-show="errorState">
      <p>There were a few errors while submitting...</p>
      <ul class="error-list">
        <li v-show="name == null">Please provide a name</li>
        <li v-show="message == null">Please provide your feedback message</li>
        <li v-show="rating == null || rating == 0">Please choose a rating</li>
      </ul>
    </div>

    <div class="review-div">
      <label for="name">Name:</label>
      <br>
      <input class="review-input" v-model="name" id="name" placeholder="Your name please..."></input>
    </div>

    <div class="review-div">
      <label for="message">Feedback:</label>
      <br>
      <textarea class="review-input message-area" v-model="message" id="message" placeholder="Your feedback please..."></textarea>
    </div>

    <div class="review-div">
      <label for="rating">Rating:</label>
      <br>
      <select class="review-select review-input" id="rating" v-model.number="rating">
        <option value='0' disabled selected>Please rate...</option>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>

    <div class="review-div">
      <input class="review-submit" type="submit"></input>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CourseReview',
  data() {
    return {
      name: null,
      message: null,
      rating: 0,
      errorState: false
    };
  },
  methods: {
    onSubmit() {
      this.errorState = (this.name == null) || (this.message == null) || (this.rating == null) || (this.rating == 0);
      if(!this.errorState) {
        let courseReview = {
          name: this.name,
          message: this.message,
          rating: this.rating
        };
        this.$emit('message-submitted', courseReview)
        this.name = null;
        this.message = null;
        this.rating = 0;
      }
    }
  }
}
</script>

<style>
.review-form {
  padding: 0px 10px;
}

.review-div {
  padding: 5px 0px;
}

.review-input {
  width: 225px;
  height: 30px;
  border-radius: 5px;
}

.review-select {
  background: white;
}

.review-submit {
  margin-left: 80px;
}

.message-area {
  vertical-align: middle;
}

.error-section {
  border: red 1px solid;
  border-radius: 8px;
  padding: 0px 10px 17px 10px;
  background: rgba(255, 0, 0, 0.19);
  width: 203px;
}

.error-list {
  margin: 0px;
  padding-left: 20px;
}
</style>