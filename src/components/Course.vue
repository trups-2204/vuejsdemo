<template>
  <div class="course" @mouseover="highlight_enroll()" @mouseleave="dehighlight_enroll()">
    <div class="course-main">
      <div class="course-title" :title="description">{{ name }}</div>
      <div>
        <p class="prerequisites">Prerequisites</p>
        <ul class="prerequisite-list">
          <li v-for="prerequisite in prerequisites">{{ prerequisite }}</li>
        </ul>
      </div>
    </div>
    <div class="details">
      <div class="enrollment-bar">
        <div class="enrollment-info" title="Course Enrollments"> {{ enrollmentStats }} </div>
        <button class="action-button enroll" :class="{ 'enroll-hover': mouseOnCourse }" v-if="enrollmentStatus == 'Fresh'" v-on:click="enroll()">
          Enroll
        </button>
        <button class="action-button cancel" v-else-if="enrollmentStatus == 'Enrolled'" v-on:click="cancel()">
          Cancel
        </button>
      </div>
    </div>
    <hr>
    <p class="feedback-bar">
      <span title="Average Feedback">Feedback: {{ averageFeedback }}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span v-if="feedbackOpen" class="feedback-view" v-on:click="feedbackSection(false)">Hide Feedback</span>
      <span v-else class="feedback-view" v-on:click="feedbackSection(true)">View Feedback</span>
    </p>
    <div class="feedback-div" v-show="feedbackOpen">
      <CourseTabs @get-avg-feedback="getAvgFeedback"></CourseTabs>
    </div>
  </div>
</template>

<script>
import CourseTabs from './CourseTabs'

export default {
  name: 'Course',
  components: { CourseTabs },
  data() {
    return {
      id: 1,
      name: 'Vue JS',
      currentEnrollments: 0,
      description: 'A basic course to understand the concepts of Vue JS',
      enrollmentStatus: 'Fresh',
      prerequisites: ['HTML', 'CSS', 'JS'],
      mouseOnCourse: false,
      feedbackOpen: false,
      avgFeedback: 'NA'
    };
  },
  props: {
    limit: {
      type: Number,
      required: true,
      default: 20
    }
  },
  methods: {
    enroll() {
      this.enrollmentStatus = 'Enrolled';
      this.currentEnrollments += 1;
      this.$emit('enroll-course', this.id);
    },
    cancel() {
      this.enrollmentStatus = 'Fresh';
      this.currentEnrollments -= 1;
      this.$emit('cancel-course', this.id);
    },
    highlight_enroll() {
      this.mouseOnCourse = true;
    },
    dehighlight_enroll() {
      this.mouseOnCourse = false;
    },
    addMessage(courseReview) {
      this.reviews.push(courseReview);
    },
    feedbackSection(shouldOpen) {
      this.feedbackOpen = shouldOpen;
    },
    getAvgFeedback(avg_feedback) {
      this.avgFeedback = avg_feedback;
    }
  },
  computed: {
    enrollmentStats() {
      return (this.currentEnrollments + '/' + this.limit);
    },
    averageFeedback() {
      if(typeof(this.avgFeedback) == 'number') {
        return this.avgFeedback + "/5";
      } else {
        return this.avgFeedback;
      }
    }
  }
}
</script>

<style>
.course {
  display: inline-block;
  margin: 10px 20px;
  border: #5A0A70 1px solid;
  border-radius: 7px 0px;
}

.course-main {
  background: linear-gradient(to bottom right, #B582E8, #DDABEB);
  border-top-left-radius: 5px;
}

.course-title {
  padding: 15px 0px;
  text-align: center;
  font-size: 1.5em;
  font-family: serif;
}

.prerequisites {
  margin: 0px 0px 0px 3%;
}

.prerequisite-list {
  margin: 10px 0px 0px 0px;
  list-style-type: circle;
  padding-bottom: 10px;
}

.details {
  height: 25px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.enrollment-info {
  padding: 2px 0px 0px 10px;
  font-size: 1.2em;
  min-width: 100px;
}

.enrollment-bar {
  display: flex;
  flex-wrap: wrap;
}

.course-button {
  padding: 5.2%;
  text-align: right;
}

.action-button {
  border-color: transparent;
  border-radius: 2px;
  margin-left: auto;
  margin-right: 10px;
  height: 25px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.enroll {
  background: yellowgreen;
}

.cancel {
  background: tomato;
}

@keyframes highlightEnroll {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.enroll-hover {
  animation: 0.8s highlightEnroll;
}

.feedback-bar {
  margin: 10px;
}

.feedback-view {
  text-decoration: underline;
  cursor: pointer;
  color: dodgerblue;
}

.feedback-div {
  margin: 10px;
}
</style>
