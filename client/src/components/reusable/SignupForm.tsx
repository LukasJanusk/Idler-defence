import { useState, type FormEvent } from 'react';
import CloseButton from './CloseButton';
import LoadingCircle from './LoadingCircle';
import Error from './ErrorComponent';

type Props = {
  onSubmit: () => void;
  onClose?: () => void;
  open?: boolean;
  className?: string;
};

export default function SingupForm({
  open,
  onClose,
  onSubmit,
  className,
}: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    onSubmit();
  };
  const handleClose = () => {
    onClose?.();
  };
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  if (loading) return <LoadingCircle />;
  if (error) return <Error onClose={() => setError(null)} message={error} />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex flex-col gap-2 border-4 bg-medieval-stone p-4 ${className ?? ''}`}
    >
      <label className="font-bold text-medieval-parchment" htmlFor="name">
        Username
      </label>
      <input
        className="rounded bg-gray-200 p-2"
        type="username"
        id="username"
        name="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="font-bold text-medieval-parchment" htmlFor="email">
        Email
      </label>
      <input
        className="rounded bg-gray-200 p-2"
        type="email"
        id="email"
        name="email"
        placeholder="youremail@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="font-bold text-medieval-parchment" htmlFor="password">
        Password
      </label>
      <input
        className="rounded bg-gray-200 p-2"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className={`mt-4 min-h-16 rounded bg-medieval-green-500 p-2 text-xl font-bold text-medieval-parchment shadow-sm duration-200 hover:scale-105 hover:bg-medieval-green-600 hover:shadow-md active:scale-95`}
      >
        Sign Up
      </button>
      {open !== undefined && <CloseButton onClose={handleClose} />}
    </form>
  );
}
