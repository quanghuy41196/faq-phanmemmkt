import { cn } from '@/helper/functions'
import { Button, ButtonProps } from 'flowbite-react'
import Link from 'next/link'
import { FC, ReactNode, memo } from 'react'
import { LoadingIcon } from './Icon'

export type ColorButton =
  | 'blue'
  | 'gray'
  | 'dark'
  | 'light'
  | 'success'
  | 'failure'
  | 'warning'
  | 'purple'
  | 'yellow'

type sizeButton = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const buttonVariantClasses: Record<sizeButton, number> = {
  xs: 15,
  sm: 20,
  md: 20,
  lg: 23,
  xl: 25
}

export interface ButtonFlowbiteProps
  extends Omit<ButtonProps, 'color' | 'gradientMonochrome' | 'size'> {
  color?: ColorButton
  gradientMonochrome?: ColorButton
  size?: sizeButton
  StartIcon?: (props?: any) => ReactNode
  EndIcon?: (props?: any) => ReactNode
  sizeIcon?: number
}

const ButtonFlowbite: FC<ButtonFlowbiteProps> = ({
  color,
  size,
  children,
  href,
  StartIcon,
  EndIcon,
  sizeIcon,
  ...rest
}) => {
  return (
    <Button
      as={href ? Link : null}
      href={href ? href : undefined}
      color={color}
      size={size}
      processingSpinner={<LoadingIcon isSpin />}
      aria-label={color}
      aria-current={rest?.outline}
      className={cn(color)}
      {...rest}
      type={rest?.type ?? 'button'}
    >
      {StartIcon && (
        <StartIcon
          className="mr-2"
          size={sizeIcon ? sizeIcon : buttonVariantClasses[size ?? 'sm']}
        />
      )}
      {children}
      {EndIcon && (
        <EndIcon className="ml-2" size={sizeIcon ? sizeIcon : buttonVariantClasses[size ?? 'sm']} />
      )}
    </Button>
  )
}

export default memo(ButtonFlowbite)
