import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

// Renders a dialog in a portal on <body>, so it is never clipped or re-layered by an
// animated/transformed ancestor (those turn `position: fixed` into "fixed to the container").
export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose && onClose()
    document.addEventListener('keydown', onKey)
    // keep the page behind from scrolling while the dialog is open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [])

  return createPortal(
    // backdrop click closes; clicks inside the card don't bubble to the backdrop
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>,
    document.body
  )
}
