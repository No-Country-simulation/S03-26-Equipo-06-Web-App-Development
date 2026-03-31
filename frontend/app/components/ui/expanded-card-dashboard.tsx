'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ExpandableTextDashboard({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (textRef.current) {
      setMaxHeight(textRef.current.scrollHeight)
    }
  }, [content, expanded])

  return (
    <div className='relative w-full'>
      <div className='overflow-hidden transition-all duration-500 ease-in-out' style={{ maxHeight: expanded ? maxHeight : 20 }}>
        <p ref={textRef} className={`text-sm ${expanded ? 'text-gray-900' : 'text-gray-500'}`}>
          {content}
        </p>
      </div>

      <button onClick={() => setExpanded(!expanded)} className='mt-1 cursor-pointer flex items-center gap-1 text-xs text-blue-600 hover:underline'>
        {expanded ? (
          <>
            <ChevronUp className='h-4 w-4' />
            <span>Leer menos</span>
          </>
        ) : (
          <>
            <ChevronDown className='h-4 w-4' />
            <span>Leer más</span>
          </>
        )}
      </button>
    </div>
  )
}
