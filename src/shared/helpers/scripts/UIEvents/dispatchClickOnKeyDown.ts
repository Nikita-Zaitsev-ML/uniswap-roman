const dispatchClickOnKeyDown = <
  TKeyboardEvent extends Pick<
    globalThis.KeyboardEvent,
    'currentTarget' | 'repeat' | 'code'
  >
>(
  event: TKeyboardEvent
) => {
  const { currentTarget } = event;
  const shouldClick = !event.repeat && event.code === 'Enter';

  if (currentTarget instanceof HTMLElement && shouldClick) {
    currentTarget.click();
  }
};

export { dispatchClickOnKeyDown };
