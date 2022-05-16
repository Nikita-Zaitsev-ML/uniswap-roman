const isUnderlyingElement = (elements: HTMLElement[], current: HTMLElement) =>
  !(current && elements.indexOf(current) === -1 && current != null);

const elementsFromPoint = (x: number, y: number) => {
  const elements: HTMLElement[] = [];
  const previousPointerEvents = [];
  let current = document.elementFromPoint(x, y) as HTMLElement;

  while (!isUnderlyingElement(elements, current)) {
    elements.push(current);
    previousPointerEvents.push({
      value: current.style.getPropertyValue('pointer-events'),
      priority: current.style.getPropertyPriority('pointer-events'),
    });
    current.style.setProperty('pointer-events', 'none', 'important');
    current = document.elementFromPoint(x, y) as HTMLElement;
  }

  previousPointerEvents.reverse().forEach((pointerEvent, index) => {
    elements[elements.length - index - 1].style.setProperty(
      'pointer-events',
      pointerEvent.value ? pointerEvent.value : '',
      pointerEvent.priority
    );
  });

  return elements;
};

export { elementsFromPoint };
