import Vue from 'vue'
import Course from '@/components/Course'
import { mount } from '@vue/test-utils'

describe('Course.vue', () => {
  it('should display the Enroll button when enrollmentStatus value is Fresh', () => {
    const wrapper = mount(Course)
    expect(wrapper.findAll('.enrollment-bar button').at(0).text()).to.equal('Enroll')
  })

  it('should display the Cancel button when enrollmentStatus value is Enrolled', () => {
    const wrapper = mount(Course, {
      data() {
        return { enrollmentStatus: 'Enrolled' };
      }
    })
    expect(wrapper.find('.enrollment-bar button').text()).to.equal('Cancel')
  })

  it('should display all the prerequisites of a given course', () => {
    const wrapper = mount(Course)
    expect(wrapper.findAll('ul.prerequisite-list li').length).to.equal(3)
  })

  it('should have the class enroll-hover in Enroll button when mouse is hovered on the whole course section', () => {
    const wrapper = mount(Course, {
      data() {
        return { mouseOnCourse: true };
      }
    })
    expect(wrapper.find('.enrollment-bar button.enroll').classes()).to.contain('enroll-hover')
  })

  it('should not have the class enroll-hover in Enroll button when mouse is not hovered on the whole course section', () => {
    const wrapper = mount(Course, {
      data() {
        return { mouseOnCourse: false };
      }
    })
    expect(wrapper.find('.enrollment-bar button.enroll').classes()).to.not.contain('enroll-hover')
  })
})