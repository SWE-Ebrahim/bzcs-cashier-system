import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../../store/auth.store';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  role?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  paddingLeft: 48,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 16,
  background: '#ffffff',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#c6c6cd',
  borderRadius: '0.5rem',
  fontSize: 16,
  lineHeight: 1.5,
  color: '#0b1c30',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  color: '#45464d',
  marginBottom: 4,
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading } = useAuthStore();
  const [error, setError] = React.useState('');
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      await login(data);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Login failed. Please try again.');
    }
  };

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field
      ? { borderColor: '#006c49', boxShadow: '0 0 0 3px rgba(0,108,73,0.15)' }
      : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg" style={{ background: '#ffdad6', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(186,26,26,0.2)', padding: '12px 16px', color: '#93000a' }}>
          <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: 20, color: '#ba1a1a' }}>error</span>
          <span style={{ fontSize: 14 }}>{error}</span>
        </div>
      )}

      {/* Employee ID */}
      <div>
        <label style={labelStyle}>Employee ID</label>
        <div className="relative">
          <span
            className="material-symbols-outlined absolute"
            style={{ left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20, color: focusedField === 'username' ? '#006c49' : '#76777d', pointerEvents: 'none', transition: 'color 0.2s' }}
          >
            person
          </span>
          <input
            {...register('username')}
            type="text"
            autoComplete="username"
            placeholder="Enter ID number"
            style={{ ...inputStyle, ...getFocusStyle('username') }}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        {errors.username && (
          <p className="flex items-center gap-1 mt-1" style={{ fontSize: 14, color: '#ba1a1a' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Security PIN */}
      <div>
        <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Security PIN</label>
          <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#006c49', textDecoration: 'none' }}>Forgot PIN?</a>
        </div>
        <div className="relative">
          <span
            className="material-symbols-outlined absolute"
            style={{ left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20, color: focusedField === 'password' ? '#006c49' : '#76777d', pointerEvents: 'none', transition: 'color 0.2s', fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
          <input
            {...register('password')}
            type="password"
            autoComplete="current-password"
            placeholder="••••••"
            style={{ ...inputStyle, ...getFocusStyle('password'), letterSpacing: '0.2em' }}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        {errors.password && (
          <p className="flex items-center gap-1 mt-1" style={{ fontSize: 14, color: '#ba1a1a' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 rounded-lg font-semibold active:scale-[0.98] transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: '#006c49', color: '#ffffff', padding: '16px 24px', fontSize: 16, boxShadow: '0 4px 6px rgba(0,108,73,0.1)', borderWidth: 0, borderStyle: 'none', borderColor: 'transparent', cursor: 'pointer' }}
      >
        {isLoading ? (
          <>
            <span className="material-symbols-outlined animate-spin" style={{ fontSize: 20 }}>sync</span>
            Logging in...
          </>
        ) : (
          <>
            Initialize Terminal
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;