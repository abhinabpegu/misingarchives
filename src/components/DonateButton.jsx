import React, { useEffect, useRef } from 'react'

const RAZORPAY_PAYMENT_BUTTON_ID = 'pl_T8BCDbnyoQOfMM'

export default function DonateButton() {
  const formRef = useRef(null)

  useEffect(() => {
    if (!formRef.current) return
    if (formRef.current.querySelector('script')) return

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
    script.dataset.payment_button_id = RAZORPAY_PAYMENT_BUTTON_ID
    script.async = true

    formRef.current.appendChild(script)
  }, [])

  return <form ref={formRef} />
}