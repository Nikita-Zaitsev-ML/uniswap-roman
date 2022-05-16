import { useAppDispatch } from 'src/app/hooks';
import { select } from 'src/services/theme';

const ThemeChecker = () => {
  const dispatch = useAppDispatch();

  const handleInputChange = (event) => {
    const { currentTarget } = event;
    const newMode = currentTarget.checked ? 'dark' : 'light';

    dispatch(
      select({
        currentMode: newMode,
      })
    );
  };

  return (
    <label>
      переключение темы
      <input type="checkbox" onChange={handleInputChange} />
    </label>
  );
};

export { ThemeChecker };
