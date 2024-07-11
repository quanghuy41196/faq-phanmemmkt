import { useEffect, useState } from 'react'
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'

const ButtonGotoTop = (): JSX.Element => {
  const [showTopButton, setShowTopButton] = useState(false)

  const onScrollHandler = (): void => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setShowTopButton(true)
    } else {
      setShowTopButton(false)
    }
  }

  const goToTop = (): void => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler)

    return () => {
      window.removeEventListener('onscroll', onScrollHandler)
    }
  }, [])

  return (
    <>
      {showTopButton && (
        <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
          <button
            type="button"
            className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
            onClick={goToTop}
          >
            <HiOutlineArrowNarrowUp size={16} />
          </button>
        </div>
      )}
    </>
  )
}

export default ButtonGotoTop
