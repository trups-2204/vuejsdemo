import Vue from 'vue'
import CourseReview from '@/components/CourseReview'
import { mount } from '@vue/test-utils'

describe('CourseReview.vue', () => {
  it('should display error messages for every model field validation failure', () => {
    const wrapper = mount(CourseReview)
    expect(wrapper.findAll('ul.error-list li').length).to.equal(3)
  })
})