import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const userValue = formData.get('query') as string;

    if (userValue.trim() === '') {
      toast.error('Please enter your search query.');
    } else {
      onSubmit(userValue);
    }
  };

  return (
    <header className={styles.header}>
      <Toaster />
      <div className={styles.container}>
        <a
          className={styles.link}
          href='https://www.themoviedb.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by TMDB
        </a>
        <form
          action={handleSubmit}
          className={styles.form}
        >
          <input
            className={styles.input}
            type='text'
            name='query'
            autoComplete='off'
            placeholder='Search movies...'
            autoFocus
          />
          <button
            className={styles.button}
            type='submit'
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
