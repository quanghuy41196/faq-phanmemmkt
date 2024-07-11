"use client";
import Tippy, { TippyProps } from '@tippyjs/react';
import { FC, ReactNode, useId, useRef } from 'react';
import 'tippy.js/dist/tippy.css';

interface DropdownCustomProps extends TippyProps {
  button?: ReactNode
}

const DropdownCustom: FC<DropdownCustomProps> = ({ button, children, ...rest }) => {
  const id = useId()
  const instanceRef = useRef<any>(null)

  return (
    <Tippy
      theme="drop-down"
      className="!bg-transparent !text-inherit !border-r-0 [&>*]:!p-0"
      appendTo={document.body}
      arrow={false}
      placement="auto"
      interactive
      allowHTML
      content={children}
      {...rest}
    >
      <div
        id={`div-${id}`}
        onClick={(): void => {
          instanceRef?.current?.show()
        }}
      >
        {button}
      </div>
    </Tippy>
  )
}

export default DropdownCustom
