<template>
  <div id="app">
    <div class="course-container">
      <div class="header">
        <span class="brand">Classroom Buddy</span>
        <div class="total-enrollments" title="Your enrollments"> {{ currentEnrollments.length }} </div>
      </div>
      <Course :limit="enrollmentsLimit" @enroll-course="enroll" @cancel-course="cancel"/>
    </div>
  </div>
</template>

<script>
import Course from './components/Course'

export default {
  name: 'App',
  components: { Course },
  data() {
    return {
      enrollmentsLimit: 50,
      currentEnrollments: []
    };
  },
  methods: {
    enroll(courseId) {
      this.currentEnrollments.push(courseId);
    },
    cancel(courseId) {
      var el_i = this.currentEnrollments.indexOf(courseId);
      if(el_i > -1) {
        this.currentEnrollments.splice(el_i, 1);
      }
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}

.header {
  background: linear-gradient(to right, #9ED6E8 , #AEE7E8);
  padding: 10px;
  margin-bottom: 15px;
}

.brand {
  font-weight: bold;
  font-size: 1.5em;
}

.total-enrollments {
  width: 25%;
  float: right;
  text-align: right;
  padding-right: 2%;
  padding-top: 0.2%;
}
</style>
