export function useImagePerspective(perspective = 1000, scaleOnHover = 1.1) {
  const applyTransform = (event: MouseEvent) => {
    const element = event.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const rotateX = (y / rect.height) * -20
    const rotateY = (x / rect.width) * 20

    element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`
  }

  const resetTransform = (event: MouseEvent) => {
    const element = event.currentTarget as HTMLElement
    element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
  }

  return {
    applyTransform,
    resetTransform,
  }
}
