import React, { Suspense } from 'react'
import ContactOption from '../../components/sections/contact/contactOption'
import ContactForm from '../../components/sections/contact/contactForm'

const Contact = () => {
  return (
    <section id="contact" className="contact-area innerpage-single-area">
      <div className="container">
        <div className="container-inner">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-center wow fadeInUp delay-0-2s">
                <p>contact</p>
                <h2>Get in Touch with Me!</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <ContactOption />
            <Suspense fallback={<div className="col-lg-8"><p>Loading form...</p></div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact