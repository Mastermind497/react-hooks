// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({
  name,
  onNameChange,
}: {
  name: string
  onNameChange: (newName: string) => void
}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => onNameChange(event.currentTarget.value)}
      />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({
  animal,
  onAnimalChange,
}: {
  animal: string
  onAnimalChange: (newAnimal: string) => void
}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.currentTarget.value)}
      />
    </div>
  )
}

function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name name={name} onNameChange={setName} />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
