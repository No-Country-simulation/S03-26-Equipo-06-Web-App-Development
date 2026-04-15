'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ExpandableText({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const textRef = useRef<HTMLParagraphElement>(null)
  


  useEffect(() => {
    if (textRef.current) {
      setMaxHeight(textRef.current.scrollHeight)
    }
  }, [content])

  return (
    <div className='relative w-full'>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out`} style={{ maxHeight: expanded ? maxHeight : 60 }}>
        <p ref={textRef} className='text-sm text-gray-800 md:text-white'>
          {content}
        </p>
      </div>

      {content.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='mt-1 flex cursor-pointer items-center gap-1 text-xs text-blue-600 hover:underline'
          aria-label={expanded ? 'Leer menos del testimonio' : 'Leer más del testimonio'}
        >
          {expanded ? (
            <>
              <ChevronUp className='relative top-2 h-4 w-4' />
            </>
          ) : (
            <>
              <ChevronDown className='relative top-2 h-4 w-4' />
            </>
          )}
        </button>
      )}
    </div>
  )
}
