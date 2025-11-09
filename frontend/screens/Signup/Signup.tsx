'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/src/providers';

export const Signup = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      setSuccess(true);
      // Redirect after a brief success message
      setTimeout(() => {
        router.push('/movies');
      }, 1000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to sign up';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#093545] w-full min-h-screen flex items-center justify-center relative overflow-hidden">
      <img
        className="absolute bottom-0 left-0 w-full h-auto object-cover"
        alt="Vectors"
        src="/vectors.png"
      />

      <div className="relative z-10 w-full max-w-[300px] px-4">
        <h1 className="font-h2 font-[number:var(--h2-font-weight)] text-white text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] text-center mb-[40px] [font-style:var(--h2-font-style)]">
          Sign up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-[45px] bg-input-color rounded-[10px] border-0 text-white placeholder:text-white placeholder:font-body-small placeholder:font-[number:var(--body-small-font-weight)] placeholder:text-[length:var(--body-small-font-size)] placeholder:tracking-[var(--body-small-letter-spacing)] placeholder:leading-[var(--body-small-line-height)] placeholder:[font-style:var(--body-small-font-style)] px-4"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full h-[45px] bg-input-color rounded-[10px] border-0 text-white placeholder:text-white placeholder:font-body-small placeholder:font-[number:var(--body-small-font-weight)] placeholder:text-[length:var(--body-small-font-size)] placeholder:tracking-[var(--body-small-letter-spacing)] placeholder:leading-[var(--body-small-line-height)] placeholder:[font-style:var(--body-small-font-style)] px-4"
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full h-[45px] bg-input-color rounded-[10px] border-0 text-white placeholder:text-white placeholder:font-body-small placeholder:font-[number:var(--body-small-font-weight)] placeholder:text-[length:var(--body-small-font-size)] placeholder:tracking-[var(--body-small-letter-spacing)] placeholder:leading-[var(--body-small-line-height)] placeholder:[font-style:var(--body-small-font-style)] px-4"
          />

          {error && (
            <p className="text-[#EB5757] text-sm text-center">{error}</p>
          )}

          {success && (
            <p className="text-[#2bd17e] text-sm text-center">
              ✓ Account created successfully! Redirecting...
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-[54px] rounded-[10px] bg-[#2bd17e] hover:bg-[#2bd17e]/90 [font-family:'Montserrat',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6 mt-[16px]"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-white text-sm">
              Already have an account?{' '}
              <Link href="/" className="text-[#2bd17e] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

