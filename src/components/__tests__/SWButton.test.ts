import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SWButton from '@/components/atoms/SWButton.vue'

describe('SWButton', () => {
  it('renders correctly with slot content', () => {
    const wrapper = mount(SWButton, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('emits a click event when clicked', async () => {
    const wrapper = mount(SWButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
