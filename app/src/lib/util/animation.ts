export const scrollSmoothlyTo = (
    container: HTMLElement,
    element: HTMLElement,
    seconds: number,
    easingFunction: (x: number) => number = x => x
): { stop(): void } => {
    const ms = seconds*1000
    const planetY = element.offsetTop
    const startY = container.scrollTop
    const diff = planetY-startY
    
    let start = 0
    let elapsedTime = 0

    let lastFrame = window.requestAnimationFrame(function step(timestamp) {
        if (!start) {
            start = timestamp
        }
        elapsedTime = timestamp-start

        const percent = Math.max(0, Math.min(elapsedTime/ms, 1))
        container.scrollTo(0, startY+diff*easingFunction(percent))

        if (elapsedTime < ms) {
            lastFrame = window.requestAnimationFrame(step);
        }
    })

    return {
        stop() {
            elapsedTime = ms;
            window.cancelAnimationFrame(lastFrame)
        }
    }
}