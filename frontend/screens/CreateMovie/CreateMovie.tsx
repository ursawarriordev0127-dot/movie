'use client';

import { DownloadIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/src/providers';
import { moviesApi } from '@/src/features/movies';

export const CreateMovie = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [publishingYear, setPublishingYear] = useState('');
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !publishingYear) {
      setError('Please fill in all required fields');
      return;
    }

    const year = parseInt(publishingYear);
    if (isNaN(year) || year < 1800 || year > new Date().getFullYear() + 10) {
      setError('Please enter a valid year');
      return;
    }

    setLoading(true);

    try {
      await moviesApi.create(
        {
          title,
          publishing_year: year,
        },
        posterFile || undefined,
      );

      // Navigate and refresh to show the new movie
      router.push('/movies');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#093545] w-full min-h-screen relative">
      <img
        className="absolute bottom-0 left-0 w-full h-[111px]"
        alt="Vectors"
        src="/vectors.png"
      />

      <main className="relative z-10 px-[120px] py-[120px]">
        <h1 className="font-h2 font-[number:var(--h2-font-weight)] text-white text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] mb-[120px] [font-style:var(--h2-font-style)]">
          Create a new movie
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-[127px]">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-[473px] h-[504px] flex items-center justify-center bg-input-color rounded-[10px] border-2 border-dashed border-white cursor-pointer relative overflow-hidden"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <label className="flex flex-col items-center gap-2 cursor-pointer">
                  <DownloadIcon className="w-6 h-6 text-white" />
                  <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-sm text-center tracking-[0] leading-6 whitespace-nowrap">
                    Drop an image here
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
              {previewUrl && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>

            <div className="flex flex-col gap-[24px]">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-[362px] h-[45px] bg-input-color rounded-[10px] border-0 text-white placeholder:text-white placeholder:font-body-small placeholder:font-[number:var(--body-small-font-weight)] placeholder:text-[length:var(--body-small-font-size)] placeholder:tracking-[var(--body-small-letter-spacing)] placeholder:leading-[var(--body-small-line-height)] placeholder:[font-style:var(--body-small-font-style)] px-4"
              />

              <Input
                placeholder="Publishing year"
                type="number"
                value={publishingYear}
                onChange={(e) => setPublishingYear(e.target.value)}
                required
                className="w-[216px] h-[45px] bg-input-color rounded-[10px] border-0 text-white placeholder:text-white placeholder:font-body-small placeholder:font-[number:var(--body-small-font-weight)] placeholder:text-[length:var(--body-small-font-size)] placeholder:tracking-[var(--body-small-letter-spacing)] placeholder:leading-[var(--body-small-line-height)] placeholder:[font-style:var(--body-small-font-style)] px-4"
              />

              {error && (
                <p className="text-[#EB5757] text-sm">{error}</p>
              )}

              <div className="flex gap-[16px] mt-[40px]">
                <Button
                  type="button"
                  onClick={() => router.push('/movies')}
                  variant="outline"
                  className="w-[167px] h-[56px] rounded-[10px] border border-solid border-white bg-transparent hover:bg-white/10 [font-family:'Montserrat',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-[179px] h-[56px] rounded-[10px] bg-[#2bd17e] hover:bg-[#2bd17e]/90 [font-family:'Montserrat',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-6"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

