import { useState, type FormEvent } from 'react';
import CloseButton from './CloseButton';
import LoadingCircle from './LoadingCircle';
import { login } from '@/modules/user';
import Error from './ErrorComponent';

type Props = {
  onSubmit?: () => void;
  onClose?: () => void;
  open?: boolean;
  className?: string;
};

export default function LoginForm({
  open,
  onClose,
  onSubmit,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const loginRes = await login({ email, password });
      if (!loginRes.success)
        setError(loginRes.error ?? 'Failed to login, please try again');
      onSubmit?.();
    } catch {
      setError('Unable to login, please try again');
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    onClose?.();
  };

  if (loading) return <LoadingCircle />;
  if (error) return <Error onClose={() => setError(null)} message={error} />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex flex-col gap-2 border-4 bg-medieval-stone p-4 ${className ?? ''}`}
    >
      <label className="font-bold text-medieval-parchment" htmlFor="email">
        Email
      </label>
      <input
        className="rounded bg-gray-200 p-2 text-medieval-dark"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="youremail@mail.com"
      />
      <label className="font-bold text-medieval-parchment" htmlFor="password">
        Password
      </label>
      <input
        className="rounded bg-gray-200 p-2 text-medieval-dark"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className={`mt-4 min-h-16 rounded bg-medieval-green-500 p-2 text-2xl font-bold text-medieval-parchment shadow-sm duration-200 hover:scale-105 hover:bg-medieval-green-600 hover:shadow-md active:scale-95`}
      >
        Login
      </button>
      {open !== undefined && <CloseButton onClose={handleClose} />}
    </form>
  );
}
