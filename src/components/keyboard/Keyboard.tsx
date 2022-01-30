import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)
  console.log(charStatuses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      console.log(value)
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length >= 1) {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="ऍ" onClick={onClick} status={charStatuses['ऍ']} />
        <Key value="ॅ" onClick={onClick} status={charStatuses['ॅ']} />
        <Key value="ः" onClick={onClick} status={charStatuses['ः']} />
        <Key value="ऋ" onClick={onClick} status={charStatuses['ऋ']} />
        <Key value="ृ" onClick={onClick} status={charStatuses['ृ']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="औ" onClick={onClick} status={charStatuses['औ']} />
        <Key value="ऐ" onClick={onClick} status={charStatuses['ऐ']} />
        <Key value="आ" onClick={onClick} status={charStatuses['आ']} />
        <Key value="ई" onClick={onClick} status={charStatuses['ई']} />
        <Key value="ऊ" onClick={onClick} status={charStatuses['ऊ']} />
        <Key value="भ" onClick={onClick} status={charStatuses['भ']} />
        <Key value="म" onClick={onClick} status={charStatuses['म']} />
        <Key value="घ" onClick={onClick} status={charStatuses['घ']} />
        <Key value="ध" onClick={onClick} status={charStatuses['ध']} />
        <Key value="झ" onClick={onClick} status={charStatuses['झ']} />
        <Key value="ढ" onClick={onClick} status={charStatuses['ढ']} />
        <Key value="ढ़" onClick={onClick} status={charStatuses['ढ़']} />
        <Key value="ञ" onClick={onClick} status={charStatuses['ञ']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="ौ" onClick={onClick} status={charStatuses['ौ']} />
        <Key value="ै" onClick={onClick} status={charStatuses['ै']} />
        <Key value="ा" onClick={onClick} status={charStatuses['ा']} />
        <Key value="ी" onClick={onClick} status={charStatuses['ी']} />
        <Key value="ू" onClick={onClick} status={charStatuses['ू']} />
        <Key value="ब" onClick={onClick} status={charStatuses['ब']} />
        <Key value="ह" onClick={onClick} status={charStatuses['ह']} />
        <Key value="ग" onClick={onClick} status={charStatuses['ग']} />
        <Key value="ग़" onClick={onClick} status={charStatuses['ग']} />
        <Key value="द" onClick={onClick} status={charStatuses['द']} />
        <Key value="ज" onClick={onClick} status={charStatuses['ज']} />
        <Key value="ज़" onClick={onClick} status={charStatuses['ज़']} />
        <Key value="ड" onClick={onClick} status={charStatuses['ड']} />
        <Key value="ड़" onClick={onClick} status={charStatuses['ड़']} />
        <Key value="़" onClick={onClick} status={charStatuses['़']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="ओ" onClick={onClick} status={charStatuses['ओ']} />
        <Key value="ए" onClick={onClick} status={charStatuses['ए']} />
        <Key value="अ" onClick={onClick} status={charStatuses['अ']} />
        <Key value="इ" onClick={onClick} status={charStatuses['इ']} />
        <Key value="उ" onClick={onClick} status={charStatuses['उ']} />
        <Key value="फ" onClick={onClick} status={charStatuses['फ']} />
        <Key value="फ़" onClick={onClick} status={charStatuses['फ़']} />
        <Key value="ख" onClick={onClick} status={charStatuses['ख']} />
        <Key value="ख़" onClick={onClick} status={charStatuses['ख़']} />
        <Key value="थ" onClick={onClick} status={charStatuses['थ']} />
        <Key value="छ" onClick={onClick} status={charStatuses['छ']} />
        <Key value="ठ" onClick={onClick} status={charStatuses['ठ']} />
        <Key value="ऑ" onClick={onClick} status={charStatuses['ऑ']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="ो" onClick={onClick} status={charStatuses['ो']} />
        <Key value="े" onClick={onClick} status={charStatuses['े']} />
        <Key value="्" onClick={onClick} status={charStatuses['्']} />
        <Key value="ि" onClick={onClick} status={charStatuses['ि']} />
        <Key value="ु" onClick={onClick} status={charStatuses['ु']} />
        <Key value="प" onClick={onClick} status={charStatuses['प']} />
        <Key value="र" onClick={onClick} status={charStatuses['र']} />
        <Key value="क" onClick={onClick} status={charStatuses['क']} />
        <Key value="क़" onClick={onClick} status={charStatuses['क़']} />
        <Key value="त" onClick={onClick} status={charStatuses['त']} />
        <Key value="च" onClick={onClick} status={charStatuses['च']} />
        <Key value="ट" onClick={onClick} status={charStatuses['ट']} />
        <Key value="ॉ" onClick={onClick} status={charStatuses['ॉ']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="ँ" onClick={onClick} status={charStatuses['ँ']} />
        <Key value="ण" onClick={onClick} status={charStatuses['ण']} />
        <Key value="श" onClick={onClick} status={charStatuses['श']} />
        <Key value="ष" onClick={onClick} status={charStatuses['ष']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        <Key value="ं" onClick={onClick} status={charStatuses['ं']} />
        <Key value="म" onClick={onClick} status={charStatuses['म']} />
        <Key value="न" onClick={onClick} status={charStatuses['न']} />
        <Key value="व" onClick={onClick} status={charStatuses['व']} />
        <Key value="ल" onClick={onClick} status={charStatuses['ल']} />
        <Key value="स" onClick={onClick} status={charStatuses['स']} />
        <Key value="य" onClick={onClick} status={charStatuses['य']} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
