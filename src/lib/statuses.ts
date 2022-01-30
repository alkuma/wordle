import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'partial'

// subset of https://unicode.org/charts/PDF/U0900.pdf that are used in Hindi
export type CharValue =
  | 'ँ'
  | 'ं'
  | 'ः'
  | 'अ'
  | 'आ'
  | 'इ'
  | 'ई'
  | 'उ'
  | 'ऊ'
  | 'ऋ'
  | 'ऍ'
  | 'ए'
  | 'ऐ'
  | 'ऑ'
  | 'ओ'
  | 'औ'
  | 'क'
  | 'ख'
  | 'ग'
  | 'घ'
  | 'ङ'
  | 'च'
  | 'छ'
  | 'ज'
  | 'झ'
  | 'ञ'
  | 'ट'
  | 'ठ'
  | 'ड'
  | 'ढ'
  | 'ण'
  | 'त'
  | 'थ'
  | 'द'
  | 'ध'
  | 'न'
  | 'प'
  | 'फ'
  | 'ब'
  | 'भ'
  | 'म'
  | 'य'
  | 'र'
  | 'ल'
  | 'व'
  | 'श'
  | 'ष'
  | 'स'
  | 'ह'
  | '़'
  | 'ा'
  | 'ि'
  | 'ी'
  | 'ु'
  | 'ू'
  | 'ृ'
  | 'ॅ'
  | 'े'
  | 'ै'
  | 'ॉ'
  | 'ो'
  | 'ौ'
  | '्'
  | 'क़'
  | 'ख़'
  | 'ग़'
  | 'ज़'
  | 'ड़'
  | 'ढ़'
  | 'फ़'
  | 'ॲ'

export  const consonantsNuktaNotAllowed =
  [ 'क़'
  , 'ख़'
  , 'ग़'
  , 'घ'
  , 'ङ'
  , 'च'
  , 'छ'
  , 'ज़'
  , 'झ'
  , 'ञ'
  , 'ट'
  , 'ठ'
  , 'ड़'
  , 'ढ़'
  , 'ण'
  , 'त'
  , 'थ'
  , 'द'
  , 'ध'
  , 'न'
  , 'प'
  , 'फ़'
  , 'ब'
  , 'भ'
  , 'म'
  , 'य'
  , 'र'
  , 'ल'
  , 'व'
  , 'श'
  , 'ष'
  , 'स'
  , 'ह'
    ]

export const consonantsNuktaAllowed =
  [ 'क'
  , 'ख'
  , 'ग'
  , 'ज'
  , 'ड'
  , 'ढ'
  , 'फ'
    ]

// must start with one of these or with one of the consonants
export const vowels =
  [ 'अ'
  , 'आ'
  , 'इ'
  , 'ई'
  , 'उ'
  , 'ऊ'
  , 'ऋ'
  , 'ऍ'
  , 'ए'
  , 'ऐ'
  , 'ऑ'
  , 'ओ'
  , 'औ'
  , 'ॲ'
    ]

// if vowel, can optionally end with one of the vowelModifiers
export const vowelModifiers =
  [ 'ँ'
  , 'ं'
  , 'ः'
    ]

// may occur after a consonant or after a nukta
export const consonantModifiers =
  [ 'ँ'
  , 'ं'
  , 'ः'
  , 'ा'
  , 'ि'
  , 'ी'
  , 'ु'
  , 'ू'
  , 'ृ'
  , 'ॅ'
  , 'े'
  , 'ै'
  , 'ॉ'
  , 'ो'
  , 'ौ'
  , '्'
    ]

export const CodePointType = {
  UNKNOWN: 0,
  VOWEL: 1,
  CONSONANT_NUKTA_ALLOWED: 2,
  CONSONANT_NUKTA_NOT_ALLOWED: 3,
  VOWEL_MODIFIER: 4,
  CONSONANT_MODIFIER: 5,
};
Object.freeze(CodePointType);

export const getCodePointType = (value: string) => {
  if(consonantsNuktaNotAllowed.includes(value)) {
    return CodePointType.CONSONANT_NUKTA_NOT_ALLOWED;
  }
  if(consonantsNuktaAllowed.includes(value)) {
    return CodePointType.CONSONANT_NUKTA_ALLOWED;
  }
  if(vowels.includes(value)) {
    return CodePointType.VOWEL;
  }
  if(vowelModifiers.includes(value)) {
    return CodePointType.VOWEL_MODIFIER;
  }
  if(consonantModifiers.includes(value)) {
    return CodePointType.CONSONANT_MODIFIER;
  }
  return CodePointType.UNKNOWN;
}

export const splitToGraphemes = (value: string) => {
  let graphemes = ["", "", "", "", "", ""]
  let currentGrapheme = 0;
  let previousCodePointType = CodePointType.UNKNOWN;
  let currentCodePointType = CodePointType.UNKNOWN;
  for(let i = 0; i < value.length; ++i) {
    let currentChar = value.charAt(i);
    // first character will always go to first grapheme, no surprises here
    if (i === 0) {
      graphemes[0] = currentChar
      previousCodePointType = getCodePointType(currentChar);
    } else {
      currentCodePointType = getCodePointType(currentChar);
      switch (previousCodePointType) {
        case CodePointType.VOWEL:
          switch (currentCodePointType) {
            case CodePointType.VOWEL_MODIFIER:
              graphemes[currentGrapheme] = `${graphemes[currentGrapheme]}${currentChar}`
              break;
            default:
              ++currentGrapheme
              graphemes[currentGrapheme] = currentChar
          }
          break;
        case CodePointType.CONSONANT_NUKTA_ALLOWED:
          switch(currentCodePointType) {
            case CodePointType.VOWEL_MODIFIER:
            case CodePointType.VOWEL:
            case CodePointType.CONSONANT_MODIFIER:
              graphemes[currentGrapheme] = `${graphemes[currentGrapheme]}${currentChar}`
              break;
            default:
              ++currentGrapheme
              switch(currentCodePointType) {
                case CodePointType.VOWEL:
                case CodePointType.CONSONANT_NUKTA_ALLOWED:
                case CodePointType.CONSONANT_NUKTA_NOT_ALLOWED:
                  graphemes[currentGrapheme] = currentChar
                  break;
              }
          }
          break;
        case CodePointType.CONSONANT_NUKTA_NOT_ALLOWED:
          switch(currentCodePointType) {
            case CodePointType.VOWEL_MODIFIER:
            case CodePointType.VOWEL:
            case CodePointType.CONSONANT_MODIFIER:
              if(currentChar !== "़") { // NUKTA not alllowed so ignore it
                graphemes[currentGrapheme] = `${graphemes[currentGrapheme]}${currentChar}`
              }
              break;
            default:
              ++currentGrapheme
              switch(currentCodePointType) {
                case CodePointType.VOWEL:
                case CodePointType.CONSONANT_NUKTA_ALLOWED:
                case CodePointType.CONSONANT_NUKTA_NOT_ALLOWED:
                  graphemes[currentGrapheme] = currentChar
                  break;
              }
          }
          break;
        case CodePointType.VOWEL_MODIFIER:
          graphemes[currentGrapheme] = `${graphemes[currentGrapheme]}${currentChar}`
          ++currentGrapheme
          break;
        case CodePointType.CONSONANT_MODIFIER:
          break;
      }
    }
  }

}

  export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
