'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import { projectsData } from '@/utlits/fackData/projectData'
import { notFound } from 'next/navigation'

const SingleProject = ({ params }) => {
    const project = projectsData.find(p => p.id === parseInt(params.id))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (!project) {
        return notFound()
    }

    const openModal = (index) => {
        setCurrentImageIndex(index)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length)
    }

    const prevImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)
    }

    return (
        <div className="single-project-page-design">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center pb-30">
                        <p>{project.category.toUpperCase()} - {project.client.toUpperCase()}</p>
                        <h1>{project.headerTitle}</h1>
                    </div>
                </div>
            </div>

            {/* Live Website Preview Iframe */}
            <div className="container pb-30">
                <div className="single-project-iframe-container" style={{ width: '100%', height: '80vh', overflow: 'hidden', border: '1px solid #ddd', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <iframe
                        src={project.link}
                        title={`${project.title} live website`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                    />
                </div>
            </div>

            {/* Device Mockups Placeholders */}
            <div className="container pt-30 pb-30">
                <div className="row text-center mb-4">
                    <h3>Responsive Views</h3>
                </div>
                <div className="row align-items-end justify-content-center">
                    {/* Desktop */}
                    <div className="col-lg-6 col-md-12 mb-4">
                        <div className="device-mockup desktop" style={{ border: '16px solid #333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <Image width={1024} height={640} sizes='100vw' style={{ width: "100%", height: "auto", objectFit: 'cover' }} src={project.desktopImg} alt="Desktop View" />
                        </div>
                        <p className="mt-3 text-center" style={{ fontWeight: 600 }}>Desktop</p>
                    </div>
                    {/* Tablet */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="device-mockup tablet" style={{ border: '12px solid #333', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <Image width={768} height={1024} sizes='100vw' style={{ width: "100%", height: "auto", objectFit: 'cover', minHeight: '400px' }} src={project.tabletImg} alt="Tablet View" />
                        </div>
                        <p className="mt-3 text-center" style={{ fontWeight: 600 }}>Tablet</p>
                    </div>
                    {/* Mobile */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <div className="device-mockup mobile" style={{ border: '10px solid #333', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <Image width={375} height={812} sizes='100vw' style={{ width: "100%", height: "auto", objectFit: 'cover', minHeight: '350px' }} src={project.mobileImg} alt="Mobile View" />
                        </div>
                        <p className="mt-3 text-center" style={{ fontWeight: 600 }}>Mobile</p>
                    </div>
                </div>
            </div>

            <div className="container pt-30">
                <div className="row">
                    <div className="col-lg-4">
                        {/* <!-- START SINGLE LEFT DESIGN AREA --> */}
                        <div className="single-project-page-left wow fadeInUp delay-0-2s">
                            <div className="single-info">
                                <p>Year</p>
                                <h3>{project.year}</h3>
                            </div>
                            <div className="single-info">
                                <p>Client</p>
                                <h3>{project.client}</h3>
                            </div>
                            <div className="single-info">
                                <p>Services</p>
                                <h3>{project.services}</h3>
                            </div>
                            <div className="single-info">
                                <p>Project</p>
                                <h3>{project.project}</h3>
                            </div>
                            <div className="single-info">
                                <p>Web Link</p>
                                <h3><a href={project.link} target="_blank" rel="noreferrer">Live Preview</a></h3>
                            </div>
                        </div>
                        {/* <!-- / END SINGLE LEFT DESIGN AREA --> */}
                    </div>
                    {/* <!-- START SINGLE RIGHT DESIGN AREA --> */}
                    <div className="col-lg-8">
                        <div className="single-project-page-right wow fadeInUp delay-0-4s">
                            <h2>
                                Description
                            </h2>
                            <p>{project.desc1}</p>
                            <p>{project.desc2}</p>
                        </div>
                    </div>
                    {/* <!-- / END SINGLE RIGHT DESIGN AREA --> */}
                </div>

                {/* <!-- START SINGLE PAGE GALLERY DESIGN AREA --> */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="row pt-60 pb-30">
                        <div className="col-lg-12 text-center mb-4">
                            <h2>Project Gallery</h2>
                            <p>Click any image to expand.</p>
                        </div>
                        {project.gallery.map((img, idx) => (
                            <div className="col-lg-6" key={idx}>
                                <div className="single-image wow fadeInUp delay-0-2s" style={{ cursor: 'pointer' }} onClick={() => openModal(idx)}>
                                    <Image width={633} height={679} sizes='100vw' style={{ width: "100%", height: "auto", transition: "transform 0.3s ease", borderRadius: "8px" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} src={img} alt={`Gallery ${idx + 1}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* <!--  / END SINGLE PAGE GALLERY DESIGN AREA --> */}
            </div>

            {/* LIGHTBOX MODAL */}
            {isModalOpen && (
                <div
                    className="lightbox-overlay"
                    onClick={closeModal}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.92)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span
                        className="lightbox-close"
                        onClick={closeModal}
                        style={{ position: 'absolute', top: '20px', right: '40px', color: '#fff', fontSize: '40px', cursor: 'pointer', zIndex: 100000 }}
                    >
                        &times;
                    </span>
                    <span
                        className="lightbox-prev"
                        onClick={prevImage}
                        style={{ position: 'absolute', left: '20px', color: '#fff', fontSize: '60px', cursor: 'pointer', userSelect: 'none', zIndex: 100000, padding: '20px' }}
                    >
                        &#10094;
                    </span>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={project.gallery[currentImageIndex]}
                            alt={`Zoomed Content`}
                            width={1200}
                            height={800}
                            style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                        />
                    </div>
                    <span
                        className="lightbox-next"
                        onClick={nextImage}
                        style={{ position: 'absolute', right: '20px', color: '#fff', fontSize: '60px', cursor: 'pointer', userSelect: 'none', zIndex: 100000, padding: '20px' }}
                    >
                        &#10095;
                    </span>
                </div>
            )}

        </div>
    )
}

export default SingleProject
