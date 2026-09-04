'use client'

import React, { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null
  fallbackSrc?: string
}

export default function SafeImage({ src, fallbackSrc = '/images/about_company.png', alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [src])

  const effectiveSrc = (src && !error) ? src : fallbackSrc
  const isSvg = typeof effectiveSrc === 'string' && effectiveSrc.endsWith('.svg')

  return (
    <Image
      src={effectiveSrc}
      alt={alt || 'Image'}
      onError={() => {
        if (!isSvg) setError(true)
      }}
      unoptimized={isSvg || props.unoptimized}
      {...props}
    />
  )
}
