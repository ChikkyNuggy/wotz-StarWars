import { describe, it, expect, vi } from 'vitest'
import { useImagePerspective } from '@/composables/useImagePerspective'

describe('useImagePerspective', () => {
  it('should apply the correct transform style on applyTransform', () => {
    const { applyTransform } = useImagePerspective(1000, 1.1)
    const element = document.createElement('div')

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    const event = new MouseEvent('mousemove', { clientX: 100, clientY: 50 })
    Object.defineProperty(event, 'currentTarget', { value: element })

    applyTransform(event)

    expect(element.style.transform).toContain('perspective(1000px)')
    expect(element.style.transform).toContain('rotateX')
    expect(element.style.transform).toContain('rotateY')
    expect(element.style.transform).toContain('scale(1.1)')
  })

  it('should reset transform style on resetTransform', () => {
    const { resetTransform } = useImagePerspective(1000, 1.1)
    const element = document.createElement('div')
    const event = new MouseEvent('mouseleave')
    Object.defineProperty(event, 'currentTarget', { value: element })

    resetTransform(event)

    expect(element.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')
  })
})
