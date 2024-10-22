import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: null, type:null})

  useEffect(() => {    
    phonebookService.
      getAll()
      .then(initialPersons => {
        setPersons(initialPersons)      
      })  
  }, [])  

  const handleFilterChange = e => {
    setNewFilter(e.target.value)
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = e => {
    setNewPhone(e.target.value)
  }

  const handleDelete = id => {
    const personToDelete = persons.find(item => item.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phonebookService
        .deleteEntry(id)
        .then(response => {
          const newPersons = persons.filter(person => person.id != id)
          setPersons(newPersons)
        })
        .catch(error => {
          setNotificationMessage(
            {
            message:`Information of ${personToDelete.name} has already been removed from server`,
            type: 'error'
            }
          )
          setTimeout( () => {
            setNotificationMessage({message: null, type:null})
          }, 5000)
        })
    }
    
    
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhone,
    }

    const personPresent = persons.some( person => person.name === newName)

    if (personPresent){
      if (window.confirm(
        `${newPerson.name} is already in the phonebook, replace the old number with a new one ?`
      )) {
        const existingPerson = persons.find(person => person.name === newName)
        const updatedPerson = {...existingPerson, number: newPhone}
        const existingId = existingPerson.id
        phonebookService
          .update(existingId, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => existingId === person.id ? returnedPerson : person))
            setNotificationMessage(
              {
                message:`Updated ${existingPerson.name}`, 
                type:'success'
              })
            setTimeout(() => {          
              setNotificationMessage({message: null, type: null})
            }, 5000)
          })
      }
      // alert(`${newName} is already added to numberbook`)
    } else{
      phonebookService
        .create(newPerson)
        .then(personReturned => {
          setPersons(persons.concat(personReturned))
            setNotificationMessage(
              {
                message:`Added ${personReturned.name}`, 
                type:'success'
              })
            setTimeout(() => {          
              setNotificationMessage({message: null, type: null})
            }, 5000)
          setNewName('')
          setNewPhone('')
        })
    }
  }

  

  const showPeople = persons.filter( person => {
    if (person.name){
      const name = person.name.toLowerCase()
      return name.includes(filter)
    }
    }
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationMessage.type} message={notificationMessage.message} />
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange} 
      />

      <h3>Add a new person</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName} handleNameChange={handleNameChange}
        newPhone={newPhone} handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      <Persons showPeople={showPeople} handleDelete={handleDelete} />
    </div>
  )
}

export default App