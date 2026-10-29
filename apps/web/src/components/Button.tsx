import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors duration-150';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-background hover:bg-accent-hover',
  secondary: 'border border-border text-text hover:border-accent',
  ghost: 'text-muted hover:text-text',
};

const sizes: Record<Size, string> = {
  md: 'px-4 py-2 text-sm',
  sm: 'px-3 py-1.5 text-sm',
};

export const buttonClasses = (variant: Variant, size: Size = 'md'): string =>
  `${base} ${variants[variant]} ${sizes[size]}`;

type ButtonProps = {
  variant: Variant;
  size?: Size;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({
  variant,
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => (
  <button
    type="button"
    {...props}
    className={`${buttonClasses(variant, size)} ${className}`}
  />
);

type ButtonLinkProps = {
  variant: Variant;
  size?: Size;
} & ComponentPropsWithoutRef<'a'>;

export const ButtonLink = ({
  variant,
  size = 'md',
  className = '',
  ...props
}: ButtonLinkProps) => (
  <a {...props} className={`${buttonClasses(variant, size)} ${className}`} />
);
