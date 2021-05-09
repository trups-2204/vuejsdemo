import Vue from 'vue'
import CourseTabs from '@/components/CourseTabs'
import { mount } from '@vue/test-utils'

describe('CourseTabs.vue', () => {
  it('should display no reviews when there are no reviews', () => {
    const wrapper = mount(CourseTabs)
    expect(wrapper.find('.reviews-section p').text()).to.equal('There are no reviews yet!')
  })

  it('should display all reviews by users on a course', () => {
    const wrapper = mount(CourseTabs, {
      data() {
        return {
          reviews: [{
            name: 'User 1',
            message: 'Message 1',
            rating: 3
          }, {
            name: 'User 2',
            message: 'Message 2',
            rating: 4
          }, {
            name: 'User 3',
            message: 'Message 3',
            rating: 5
          }]
        };
      }
    })
    expect(wrapper.findAll('.reviews-section ol li').length).to.equal(3)
  })
})